import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Save, User, Mail, Calendar, AlertCircle, Activity, FileText } from "lucide-react";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    age: "",
    gender: "",
    allergies: [] as string[],
  });
  const [allergyInput, setAllergyInput] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);

  const translations = {
    en: {
      title: "My Profile",
      accountEmail: "Account Email",
      chatSessions: "Chat Sessions",
      medicineRecords: "Medicine Records",
      personalInfo: "Personal Information",
      personalDesc: "Keep your health profile up to date for personalized AI recommendations",
      fullName: "Full Name",
      age: "Age",
      gender: "Gender",
      allergies: "Known Allergies",
      allergiesDesc: "Add any medications, foods, or substances you're allergic to",
      addBtn: "Add",
      saveProfile: "Save Profile",
      saving: "Saving...",
      viewMedicine: "View Medicine Records",
      viewChat: "View Chat History",
      selectGender: "Select gender",
      male: "Male",
      female: "Female",
      other: "Other",
      preferNot: "Prefer not to say",
      noAllergies: "No allergies added yet"
    },
    hi: {
      title: "मेरी प्रोफ़ाइल",
      accountEmail: "खाता ईमेल",
      chatSessions: "चैट सत्र",
      medicineRecords: "दवा रिकॉर्ड",
      personalInfo: "व्यक्तिगत जानकारी",
      personalDesc: "व्यक्तिगत AI सिफारिशों के लिए अपनी स्वास्थ्य प्रोफ़ाइल को अपडेट रखें",
      fullName: "पूरा नाम",
      age: "आयु",
      gender: "लिंग",
      allergies: "ज्ञात एलर्जी",
      allergiesDesc: "कोई भी दवा, खाद्य पदार्थ या पदार्थ जोड़ें जिनसे आपको एलर्जी है",
      addBtn: "जोड़ें",
      saveProfile: "प्रोफ़ाइल सहेजें",
      saving: "सहेज रहा है...",
      viewMedicine: "दवा रिकॉर्ड देखें",
      viewChat: "चैट इतिहास देखें",
      selectGender: "लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      preferNot: "नहीं बताना चाहते",
      noAllergies: "अभी तक कोई एलर्जी नहीं जोड़ी गई"
    },
    mr: {
      title: "माझे प्रोफाइल",
      accountEmail: "खाते ईमेल",
      chatSessions: "चॅट सत्रे",
      medicineRecords: "औषध रेकॉर्ड",
      personalInfo: "वैयक्तिक माहिती",
      personalDesc: "वैयक्तिक AI शिफारशींसाठी तुमचे आरोग्य प्रोफाइल अद्ययावत ठेवा",
      fullName: "पूर्ण नाव",
      age: "वय",
      gender: "लिंग",
      allergies: "ज्ञात ऍलर्जी",
      allergiesDesc: "तुम्हाला ऍलर्जी असलेली कोणतीही औषधे, खाद्यपदार्थ किंवा पदार्थ जोडा",
      addBtn: "जोडा",
      saveProfile: "प्रोफाइल जतन करा",
      saving: "जतन करत आहे...",
      viewMedicine: "औषध रेकॉर्ड पहा",
      viewChat: "चॅट इतिहास पहा",
      selectGender: "लिंग निवडा",
      male: "पुरुष",
      female: "स्त्री",
      other: "इतर",
      preferNot: "सांगायचे नाही",
      noAllergies: "अद्याप कोणतीही ऍलर्जी जोडली नाही"
    },
    es: {
      title: "Mi Perfil",
      accountEmail: "Email de Cuenta",
      chatSessions: "Sesiones de Chat",
      medicineRecords: "Registros de Medicamentos",
      personalInfo: "Información Personal",
      personalDesc: "Mantén tu perfil de salud actualizado para recomendaciones personalizadas de IA",
      fullName: "Nombre Completo",
      age: "Edad",
      gender: "Género",
      allergies: "Alergias Conocidas",
      allergiesDesc: "Agrega cualquier medicamento, alimento o sustancia a la que seas alérgico",
      addBtn: "Agregar",
      saveProfile: "Guardar Perfil",
      saving: "Guardando...",
      viewMedicine: "Ver Registros de Medicamentos",
      viewChat: "Ver Historial de Chat",
      selectGender: "Seleccionar género",
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      preferNot: "Prefiero no decir",
      noAllergies: "Aún no se han agregado alergias"
    }
  };

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          age: data.age?.toString() || "",
          gender: data.gender || "",
          allergies: data.allergies || [],
        });
      }

      // Get chat history count
      const { count: chatHistoryCount } = await supabase
        .from('chat_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setChatCount(chatHistoryCount || 0);

      // Get medicine records count
      const { count: medicineRecordsCount } = await supabase
        .from('medicine_records')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setMedicineCount(medicineRecordsCount || 0);
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          age: profile.age ? parseInt(profile.age) : null,
          gender: profile.gender,
          allergies: profile.allergies,
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setProfile(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()]
      }));
      setAllergyInput("");
    }
  };

  const removeAllergy = (index: number) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.accountEmail}</p>
                    <p className="font-semibold truncate">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.chatSessions}</p>
                    <p className="font-semibold text-2xl">{chatCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Activity className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.medicineRecords}</p>
                    <p className="font-semibold text-2xl">{medicineCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t.personalInfo}
              </CardTitle>
              <CardDescription>
                {t.personalDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">{t.fullName}</Label>
                <Input
                  id="name"
                  value={profile.full_name}
                  onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                  className="glass border-white/20 mt-1"
                  placeholder={t.fullName}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">{t.age}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    className="glass border-white/20 mt-1"
                    placeholder={t.age}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">{t.gender}</Label>
                  <select
                    id="gender"
                    value={profile.gender}
                    onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full glass border-white/20 rounded-md p-2 mt-1 bg-background"
                  >
                    <option value="">{t.selectGender}</option>
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="other">{t.other}</option>
                    <option value="prefer_not_to_say">{t.preferNot}</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  {t.allergies}
                </Label>
                <p className="text-xs text-muted-foreground mb-2">
                  {t.allergiesDesc}
                </p>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                    placeholder="e.g., Penicillin, Peanuts, Latex"
                    className="glass border-white/20"
                  />
                  <Button onClick={addAllergy} type="button" className="bg-gradient-to-r from-primary to-accent">
                    {t.addBtn}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.allergies.map((allergy, index) => (
                    <div key={index} className="glass px-4 py-2 rounded-full flex items-center gap-2 border border-primary/20">
                      <AlertCircle className="h-3 w-3 text-primary" />
                      <span className="text-sm">{allergy}</span>
                      <button onClick={() => removeAllergy(index)} className="text-red-400 hover:text-red-600 ml-1">
                        ×
                      </button>
                    </div>
                  ))}
                  {profile.allergies.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">{t.noAllergies}</p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? t.saving : t.saveProfile}
              </Button>
            </CardContent>
          </Card>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate("/track-records")}
              variant="outline"
              className="glass border-white/20"
            >
              <Activity className="mr-2 h-4 w-4" />
              {t.viewMedicine}
            </Button>
            <Button
              onClick={() => navigate("/chat")}
              variant="outline"
              className="glass border-white/20"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t.viewChat}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
