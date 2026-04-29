import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Users, Plus, Trash2, Phone, Heart, Pill, AlertCircle, Star, UserPlus, Share2 } from "lucide-react";

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

const FamilyProfiles = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [memberDialog, setMemberDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [memberForm, setMemberForm] = useState<Partial<FamilyMember>>({});
  const [contactForm, setContactForm] = useState<Partial<EmergencyContact>>({});

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
    if (user) loadAll();
  }, [user, loading]);

  const loadAll = async () => {
    const [m, c] = await Promise.all([
      supabase.from("family_members").select("*").order("created_at", { ascending: true }),
      supabase.from("emergency_contacts").select("*").order("is_primary", { ascending: false }),
    ]);
    if (m.data) setMembers(m.data as FamilyMember[]);
    if (c.data) setContacts(c.data as EmergencyContact[]);
  };

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
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
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
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">👨‍👩‍👧 Family Health</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Family Health Profiles
          </h1>
          <p className="text-muted-foreground">Manage health info for your loved ones in one place.</p>
        </div>

        {/* Members section */}
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
          <Card className="glass p-8 text-center mb-10">
            <Users className="h-10 w-10 text-primary/50 mx-auto mb-2" />
            <p className="text-muted-foreground">No family members added yet. Click "Add Member" to begin.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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

        {/* Emergency Contacts */}
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
      </div>
    </div>
  );
};

export default FamilyProfiles;
