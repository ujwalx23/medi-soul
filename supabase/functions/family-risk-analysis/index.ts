import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { history, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const langName = ({ en: 'English', hi: 'Hindi', mr: 'Marathi', es: 'Spanish' } as any)[language] || 'English';

    const systemPrompt = `You are a friendly health-education assistant. Based on family medical history provided, identify possible genetic/hereditary disease risks. 
Respond ONLY in ${langName}.
Do NOT diagnose. Always remind the user to consult a qualified doctor.

Return STRICT JSON with this shape:
{
  "overallRisk": "low" | "moderate" | "high",
  "summary": "2-3 sentence plain-language summary",
  "risks": [
    { "condition": "string", "level": "low" | "moderate" | "high", "reason": "short why", "prevention": "simple prevention tips" }
  ],
  "recommendations": ["short actionable tips"],
  "disclaimer": "short disclaimer reminding to consult a doctor"
}
No markdown, no extra text — JSON only.`;

    const userContent = `Family medical history:
- Father: ${history.father || 'none reported'}
- Mother: ${history.mother || 'none reported'}
- Grandparents: ${history.grandparents || 'none reported'}
- Siblings: ${history.siblings || 'none reported'}
- Other relatives: ${history.other || 'none reported'}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      if (response.status === 402) return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds.' }), { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = { summary: raw, overallRisk: 'low', risks: [], recommendations: [], disclaimer: 'Consult a doctor.' }; }

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('family-risk-analysis error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
