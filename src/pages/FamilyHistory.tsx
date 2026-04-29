import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Users, Loader2, AlertTriangle, ShieldCheck, Activity, Dna } from "lucide-react";

const T = {
  en: {
    title: "Family Medical History",
    subtitle: "Identify possible genetic risks based on your family's health background.",
    father: "Father", mother: "Mother", grandparents: "Grandparents", siblings: "Siblings", other: "Other relatives",
    placeholder: "e.g., Diabetes, High BP, Heart disease...",
    check: "Check My Risk", analyzing: "Analyzing...",
    overall: "Overall Risk", summary: "Summary", risks: "Identified Risks", recommendations: "Recommendations",
    low: "Low risk", moderate: "Moderate risk", high: "May run in family",
    empty: "Please fill at least one field.",
    disclaimer: "This is not a diagnosis. Always consult a qualified doctor.",
  },
  hi: {
    title: "पारिवारिक चिकित्सा इतिहास",
    subtitle: "अपने परिवार के स्वास्थ्य इतिहास के आधार पर संभावित आनुवंशिक जोखिमों की पहचान करें।",
    father: "पिता", mother: "माता", grandparents: "दादा-दादी", siblings: "भाई-बहन", other: "अन्य रिश्तेदार",
    placeholder: "जैसे, मधुमेह, उच्च रक्तचाप, हृदय रोग...",
    check: "मेरा जोखिम जांचें", analyzing: "विश्लेषण हो रहा है...",
    overall: "कुल जोखिम", summary: "सारांश", risks: "पहचाने गए जोखिम", recommendations: "सिफारिशें",
    low: "कम जोखिम", moderate: "मध्यम जोखिम", high: "परिवार में हो सकता है",
    empty: "कृपया कम से कम एक फ़ील्ड भरें।",
    disclaimer: "यह निदान नहीं है। हमेशा योग्य डॉक्टर से सलाह लें।",
  },
  mr: {
    title: "कौटुंबिक वैद्यकीय इतिहास",
    subtitle: "आपल्या कुटुंबाच्या आरोग्याच्या आधारे संभाव्य अनुवांशिक धोके ओळखा.",
    father: "वडील", mother: "आई", grandparents: "आजी-आजोबा", siblings: "भावंडे", other: "इतर नातेवाईक",
    placeholder: "उदा., मधुमेह, उच्च रक्तदाब, हृदयरोग...",
    check: "माझा धोका तपासा", analyzing: "विश्लेषण होत आहे...",
    overall: "एकूण धोका", summary: "सारांश", risks: "ओळखलेले धोके", recommendations: "शिफारसी",
    low: "कमी धोका", moderate: "मध्यम धोका", high: "कुटुंबात असू शकतो",
    empty: "कृपया किमान एक फील्ड भरा.",
    disclaimer: "हे निदान नाही. नेहमी पात्र डॉक्टरांचा सल्ला घ्या.",
  },
  es: {
    title: "Historial Médico Familiar",
    subtitle: "Identifica posibles riesgos genéticos según el historial de salud de tu familia.",
    father: "Padre", mother: "Madre", grandparents: "Abuelos", siblings: "Hermanos", other: "Otros familiares",
    placeholder: "Ej., Diabetes, Presión alta, Enfermedad cardíaca...",
    check: "Verificar mi riesgo", analyzing: "Analizando...",
    overall: "Riesgo general", summary: "Resumen", risks: "Riesgos identificados", recommendations: "Recomendaciones",
    low: "Bajo riesgo", moderate: "Riesgo moderado", high: "Puede ser hereditario",
    empty: "Por favor complete al menos un campo.",
    disclaimer: "Esto no es un diagnóstico. Consulte siempre a un médico calificado.",
  },
};

type RiskLevel = "low" | "moderate" | "high";
interface Result {
  overallRisk: RiskLevel;
  summary: string;
  risks: { condition: string; level: RiskLevel; reason: string; prevention: string }[];
  recommendations: string[];
  disclaimer: string;
}

const FamilyHistory = () => {
  const { language } = useLanguage();
  const t = T[language as keyof typeof T] || T.en;

  const [history, setHistory] = useState({ father: "", mother: "", grandparents: "", siblings: "", other: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleAnalyze = async () => {
    if (!Object.values(history).some((v) => v.trim())) {
      toast.error(t.empty);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("family-risk-analysis", {
        body: { history, language },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      toast.error(e.message || "Failed to analyze");
    } finally {
      setLoading(false);
    }
  };

  const riskBadge = (level: RiskLevel) => {
    const map = {
      low: { label: `✅ ${t.low}`, cls: "bg-green-500/15 text-green-500 border-green-500/30", Icon: ShieldCheck },
      moderate: { label: `⚠️ ${t.moderate}`, cls: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30", Icon: AlertTriangle },
      high: { label: `🧬 ${t.high}`, cls: "bg-red-500/15 text-red-500 border-red-500/30", Icon: Dna },
    };
    const m = map[level] || map.low;
    return <Badge variant="outline" className={`${m.cls} gap-1`}><m.Icon className="h-3 w-3" />{m.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="glass border-border/30 mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />👨‍👩‍👧 {t.title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {(["father", "mother", "grandparents", "siblings", "other"] as const).map((k) => (
              <div key={k}>
                <Label className="mb-1 block">{t[k]}</Label>
                <Textarea
                  placeholder={t.placeholder}
                  value={history[k]}
                  onChange={(e) => setHistory({ ...history, [k]: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>
            ))}
            <Button onClick={handleAnalyze} disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent" size="lg">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />{t.analyzing}</> : t.check}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="glass border-border/30 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span>{t.overall}</span>
                {riskBadge(result.overallRisk)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{t.summary}</h3>
                <p className="text-muted-foreground">{result.summary}</p>
              </div>

              {result.risks?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">{t.risks}</h3>
                  <div className="space-y-3">
                    {result.risks.map((r, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/30 bg-muted/20">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <h4 className="font-medium">{r.condition}</h4>
                          {riskBadge(r.level)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2"><strong>Why:</strong> {r.reason}</p>
                        <p className="text-sm text-muted-foreground"><strong>Prevention:</strong> {r.prevention}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.recommendations?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">{t.recommendations}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm">
                ⚠️ {result.disclaimer || t.disclaimer}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FamilyHistory;
