import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonner } from "sonner";
import {
  Users, Plus, Trash2, Phone, Heart, Pill, AlertCircle, Star, UserPlus, Share2,
  Loader2, AlertTriangle, ShieldCheck, Activity, Dna, History as HistoryIcon
} from "lucide-react";

type FamilyMember = {
  id: string;
  full_name: string;
  relationship: string;
  age: number | null;
  gender: string | null;
  blood_group: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  notes: string | null;
};

type EmergencyContact = {
  id: string;
  name: string;
  relationship: string | null;
  phone: string;
  email: string | null;
  is_primary: boolean;
};

type RiskLevel = "low" | "moderate" | "high";
interface Result {
  overallRisk: RiskLevel;
  summary: string;
  risks: { condition: string; level: RiskLevel; reason: string; prevention: string }[];
  recommendations: string[];
  disclaimer: string;
}

const FamilyHealth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Profiles
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [memberDialog, setMemberDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [memberForm, setMemberForm] = useState<Partial<FamilyMember>>({});
  const [contactForm, setContactForm] = useState<Partial<EmergencyContact>>({});

  // Risk
  const [history, setHistory] = useState({ father: "", mother: "", grandparents: "", siblings: "", other: "" });
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
    if (user) loadAll();
  }, [user, loading]);

  const loadAll = async () => {
    const [m, c, h] = await Promise.all([
      supabase.from("family_members").select("*").order("created_at", { ascending: true }),
      supabase.from("emergency_contacts").select("*").order("is_primary", { ascending: false }),
      supabase.from("family_history" as any).select("*").order("created_at", { ascending: false }).limit(10),
    ]);
    if (m.data) setMembers(m.data as FamilyMember[]);
    if (c.data) setContacts(c.data as EmergencyContact[]);
    if (h.data) setSaved(h.data as any);
  };

  // ---- Member helpers ----
  const saveMember = async () => {
    if (!memberForm.full_name || !memberForm.relationship) {
      toast({ title: "Missing info", description: "Name and relationship are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("family_members").insert({
      user_id: user!.id,
      full_name: memberForm.full_name!,
      relationship: memberForm.relationship!,
      age: memberForm.age ? Number(memberForm.age) : null,
      gender: memberForm.gender || null,
      blood_group: memberForm.blood_group || null,
      allergies: memberForm.allergies || null,
      conditions: memberForm.conditions || null,
      medications: memberForm.medications || null,
      notes: memberForm.notes || null,
    });
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Family member added" });
    setMemberForm({});
    setMemberDialog(false);
    loadAll();
  };

  const deleteMember = async (id: string) => {
    await supabase.from("family_members").delete().eq("id", id);
    toast({ title: "Removed" });
    loadAll();
  };

  // ---- Contact helpers ----
  const saveContact = async () => {
    if (!contactForm.name || !contactForm.phone) {
      toast({ title: "Missing info", description: "Name and phone are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("emergency_contacts").insert({
      user_id: user!.id,
      name: contactForm.name!,
      phone: contactForm.phone!,
      relationship: contactForm.relationship || null,
      email: contactForm.email || null,
      is_primary: !!contactForm.is_primary,
    });
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Emergency contact added" });
    setContactForm({});
    setContactDialog(false);
    loadAll();
  };

  const deleteContact = async (id: string) => {
    await supabase.from("emergency_contacts").delete().eq("id", id);
    toast({ title: "Removed" });
    loadAll();
  };

  const shareProfile = async (m: FamilyMember) => {
    const text = `🩺 ${m.full_name} (${m.relationship})\nAge: ${m.age ?? "—"} | Blood: ${m.blood_group ?? "—"}\nConditions: ${m.conditions ?? "None"}\nAllergies: ${m.allergies ?? "None"}\nMedications: ${m.medications ?? "None"}`;
    if (navigator.share) {
      try { await navigator.share({ title: `${m.full_name}'s Health Profile`, text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Profile copied to clipboard" });
    }
  };

  // ---- Auto-fill risk fields from saved members ----
  const autofillFromMembers = () => {
    const buckets: any = { father: [], mother: [], grandparents: [], siblings: [], other: [] };
    members.forEach((m) => {
      const cond = [m.conditions, m.allergies].filter(Boolean).join(", ");
      if (!cond) return;
      const rel = m.relationship.toLowerCase();
      if (rel.includes("father") || rel.includes("dad")) buckets.father.push(`${m.full_name}: ${cond}`);
      else if (rel.includes("mother") || rel.includes("mom")) buckets.mother.push(`${m.full_name}: ${cond}`);
      else if (rel.includes("grand")) buckets.grandparents.push(`${m.full_name}: ${cond}`);
      else if (rel.includes("brother") || rel.includes("sister") || rel.includes("sibling")) buckets.siblings.push(`${m.full_name}: ${cond}`);
      else buckets.other.push(`${m.full_name} (${m.relationship}): ${cond}`);
    });
    setHistory({
      father: buckets.father.join("; "),
      mother: buckets.mother.join("; "),
      grandparents: buckets.grandparents.join("; "),
      siblings: buckets.siblings.join("; "),
      other: buckets.other.join("; "),
    });
    sonner.success("Filled from your family profiles");
  };

  // ---- Analyze ----
  const handleAnalyze = async () => {
    if (!Object.values(history).some((v) => v.trim())) {
      sonner.error("Please fill at least one field or add family members.");
      return;
    }
    setAnalyzing(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("family-risk-analysis", {
        body: { history, language },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);

      if (user) {
        const { error: insErr } = await supabase.from("family_history" as any).insert({
          user_id: user.id,
          father: history.father || null,
          mother: history.mother || null,
          grandparents: history.grandparents || null,
          siblings: history.siblings || null,
          other_relatives: history.other || null,
          analysis_result: data,
          overall_risk: data?.overallRisk || null,
        });
        if (insErr) sonner.error("Analyzed — couldn't save to your account.");
        else { sonner.success("Analysis saved"); loadAll(); }
      }
    } catch (e: any) {
      sonner.error(e.message || "Failed to analyze");
    } finally {
      setAnalyzing(false);
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from("family_history" as any).delete().eq("id", id);
    sonner.success("Deleted");
    loadAll();
  };

  const riskBadge = (level: RiskLevel) => {
    const map = {
      low: { label: "✅ Low risk", cls: "bg-green-500/15 text-green-500 border-green-500/30", Icon: ShieldCheck },
      moderate: { label: "⚠️ Moderate risk", cls: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30", Icon: AlertTriangle },
      high: { label: "🧬 May run in family", cls: "bg-red-500/15 text-red-500 border-red-500/30", Icon: Dna },
    };
    const m = map[level] || map.low;
    return <Badge variant="outline" className={`${m.cls} gap-1`}><m.Icon className="h-3 w-3" />{m.label}</Badge>;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="mb-8 text-center">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">👨‍👩‍👧 Family Health</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Family Health Hub
          </h1>
          <p className="text-muted-foreground">Manage profiles, emergency contacts, and check inherited disease risk — all in one place.</p>
        </div>

        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profiles"><Users className="h-4 w-4 mr-1" /> Profiles</TabsTrigger>
            <TabsTrigger value="contacts"><Phone className="h-4 w-4 mr-1" /> Emergency</TabsTrigger>
            <TabsTrigger value="risk"><Dna className="h-4 w-4 mr-1" /> Disease Risk</TabsTrigger>
          </TabsList>

          {/* Profiles */}
          <TabsContent value="profiles">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Family Members ({members.length})</h2>
              <Dialog open={memberDialog} onOpenChange={setMemberDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-accent"><Plus className="h-4 w-4 mr-1" /> Add Member</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>Add Family Member</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div><Label>Full Name *</Label><Input value={memberForm.full_name || ""} onChange={(e) => setMemberForm({ ...memberForm, full_name: e.target.value })} /></div>
                    <div><Label>Relationship *</Label><Input placeholder="e.g. Father, Mother, Son" value={memberForm.relationship || ""} onChange={(e) => setMemberForm({ ...memberForm, relationship: e.target.value })} /></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div><Label>Age</Label><Input type="number" value={memberForm.age ?? ""} onChange={(e) => setMemberForm({ ...memberForm, age: Number(e.target.value) })} /></div>
                      <div><Label>Gender</Label><Input value={memberForm.gender || ""} onChange={(e) => setMemberForm({ ...memberForm, gender: e.target.value })} /></div>
                      <div><Label>Blood</Label><Input placeholder="O+" value={memberForm.blood_group || ""} onChange={(e) => setMemberForm({ ...memberForm, blood_group: e.target.value })} /></div>
                    </div>
                    <div><Label>Allergies</Label><Textarea rows={2} value={memberForm.allergies || ""} onChange={(e) => setMemberForm({ ...memberForm, allergies: e.target.value })} /></div>
                    <div><Label>Existing Conditions</Label><Textarea rows={2} value={memberForm.conditions || ""} onChange={(e) => setMemberForm({ ...memberForm, conditions: e.target.value })} /></div>
                    <div><Label>Current Medications</Label><Textarea rows={2} value={memberForm.medications || ""} onChange={(e) => setMemberForm({ ...memberForm, medications: e.target.value })} /></div>
                    <div><Label>Notes</Label><Textarea rows={2} value={memberForm.notes || ""} onChange={(e) => setMemberForm({ ...memberForm, notes: e.target.value })} /></div>
                    <Button onClick={saveMember} className="w-full bg-gradient-to-r from-primary to-accent"><UserPlus className="h-4 w-4 mr-2" /> Save Member</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {members.length === 0 ? (
              <Card className="glass p-8 text-center">
                <Users className="h-10 w-10 text-primary/50 mx-auto mb-2" />
                <p className="text-muted-foreground">No family members added yet. Click "Add Member" to begin.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((m) => (
                  <Card key={m.id} className="glass p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{m.full_name}</h3>
                        <Badge variant="outline" className="text-xs">{m.relationship}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => shareProfile(m)}><Share2 className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteMember(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap text-xs text-muted-foreground mb-3">
                      {m.age && <span>🎂 {m.age}y</span>}
                      {m.gender && <span>• {m.gender}</span>}
                      {m.blood_group && <span>🩸 {m.blood_group}</span>}
                    </div>
                    <div className="space-y-2 text-sm">
                      {m.conditions && <div className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5" /><span>{m.conditions}</span></div>}
                      {m.allergies && <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" /><span>{m.allergies}</span></div>}
                      {m.medications && <div className="flex items-start gap-2"><Pill className="h-4 w-4 text-accent mt-0.5" /><span>{m.medications}</span></div>}
                      {m.notes && <p className="text-xs text-muted-foreground italic">{m.notes}</p>}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Emergency */}
          <TabsContent value="contacts">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Phone className="h-5 w-5 text-destructive" /> Emergency Contacts ({contacts.length})</h2>
              <Dialog open={contactDialog} onOpenChange={setContactDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="glass"><Plus className="h-4 w-4 mr-1" /> Add Contact</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Emergency Contact</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div><Label>Name *</Label><Input value={contactForm.name || ""} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} /></div>
                    <div><Label>Relationship</Label><Input value={contactForm.relationship || ""} onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })} /></div>
                    <div><Label>Phone *</Label><Input value={contactForm.phone || ""} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} /></div>
                    <div><Label>Email</Label><Input value={contactForm.email || ""} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} /></div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!contactForm.is_primary} onChange={(e) => setContactForm({ ...contactForm, is_primary: e.target.checked })} />
                      Mark as primary contact
                    </label>
                    <Button onClick={saveContact} className="w-full bg-gradient-to-r from-primary to-accent">Save Contact</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {contacts.length === 0 ? (
              <Card className="glass p-8 text-center">
                <Phone className="h-10 w-10 text-destructive/50 mx-auto mb-2" />
                <p className="text-muted-foreground">No emergency contacts yet.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contacts.map((c) => (
                  <Card key={c.id} className="glass p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{c.name}</h4>
                        {c.is_primary && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </div>
                      {c.relationship && <p className="text-xs text-muted-foreground">{c.relationship}</p>}
                      <a href={`tel:${c.phone}`} className="text-sm text-primary font-medium">{c.phone}</a>
                      {c.email && <p className="text-xs text-muted-foreground">{c.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${c.phone}`}><Button size="sm" className="bg-gradient-to-r from-primary to-accent"><Phone className="h-4 w-4" /></Button></a>
                      <Button size="icon" variant="ghost" onClick={() => deleteContact(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Risk */}
          <TabsContent value="risk">
            <Card className="glass border-border/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Family Medical History</span>
                  {members.length > 0 && (
                    <Button size="sm" variant="outline" onClick={autofillFromMembers}>
                      <Users className="h-4 w-4 mr-1" /> Auto-fill from profiles
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["father", "mother", "grandparents", "siblings", "other"] as const).map((k) => (
                  <div key={k}>
                    <Label className="mb-1 block capitalize">{k === "other" ? "Other relatives" : k}</Label>
                    <Textarea
                      placeholder="e.g., Diabetes, High BP, Heart disease..."
                      value={history[k]}
                      onChange={(e) => setHistory({ ...history, [k]: e.target.value })}
                      className="min-h-[60px]"
                    />
                  </div>
                ))}
                <Button onClick={handleAnalyze} disabled={analyzing} className="w-full bg-gradient-to-r from-primary to-accent" size="lg">
                  {analyzing ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Analyzing...</> : "🧬 Check My Risk"}
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="glass border-border/30 animate-in fade-in slide-in-from-bottom-4 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                    <span>Overall Risk</span>
                    {riskBadge(result.overallRisk)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-muted-foreground">{result.summary}</p>
                  </div>

                  {result.risks?.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Identified Risks</h3>
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
                      <h3 className="font-semibold mb-2">Recommendations</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm">
                    ⚠️ {result.disclaimer || "This is not a diagnosis. Always consult a qualified doctor."}
                  </div>
                </CardContent>
              </Card>
            )}

            {saved.length > 0 && (
              <Card className="glass border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HistoryIcon className="h-5 w-5 text-primary" /> Saved Risk Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {saved.map((s) => (
                    <div key={s.id} className="p-3 rounded-lg border border-border/30 bg-muted/20">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</span>
                        <div className="flex items-center gap-2">
                          {s.overall_risk && riskBadge(s.overall_risk)}
                          <Button size="icon" variant="ghost" onClick={() => deleteEntry(s.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{s.analysis_result?.summary || "—"}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default FamilyHealth;
