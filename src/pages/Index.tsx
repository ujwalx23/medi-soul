import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Activity, Sparkles, Shield, Globe2, Bot, Zap, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const t: Record<string, Record<string, string>> = {
  en: {
    badge: "🤖 AI-Powered Health Assistant",
    heroTitle1: "Your Personal",
    heroTitle2: "Medical Companion",
    heroDesc: "Get instant AI-powered health insights in your preferred language. Track your medical history, find nearby pharmacies, and book appointments - all in one place.",
    getStarted: "Get Started Free",
    tryDemo: "Try Demo",
    startChat: "Start Chatting",
    languages: "6", langLabel: "Languages",
    available: "24/7", availLabel: "Available",
    aiLabel: "Powered",
    features: "Powerful Features",
    symptom: "AI Symptom Analysis", symptomDesc: "Advanced AI analyzes symptoms and provides instant insights",
    multiLang: "6 Languages", multiLangDesc: "Hindi, Marathi, English, Spanish, Urdu, French support",
    history: "Medical History", historyDesc: "Track and access your complete medical records",
    appointments: "Smart Appointments", appointmentsDesc: "Book specialist appointments based on AI recommendations",
    whyTitle: "Why Choose MediAgent?",
    advancedAI: "Advanced AI Technology", advancedAIDesc: "Powered by latest AI models for accurate health insights",
    secure: "Secure & Private", secureDesc: "Your health data is encrypted and stored securely",
    multiSupport: "Multilingual Support", multiSupportDesc: "Communicate in your preferred language",
    trusted: "Trusted by thousands", join: "Join our growing community",
    howTitle: "How It Works",
    step1: "Describe Symptoms", step1Desc: "Tell our AI about your health concerns in any language",
    step2: "Get AI Analysis", step2Desc: "Receive instant insights based on trusted medical sources",
    step3: "Take Action", step3Desc: "Find pharmacies, track records, or consult specialists",
  },
  hi: {
    badge: "🤖 AI-संचालित स्वास्थ्य सहायक",
    heroTitle1: "आपका व्यक्तिगत",
    heroTitle2: "मेडिकल साथी",
    heroDesc: "अपनी पसंदीदा भाषा में तुरंत AI-संचालित स्वास्थ्य जानकारी प्राप्त करें। अपना चिकित्सा इतिहास ट्रैक करें, नजदीकी फार्मेसियां खोजें और अपॉइंटमेंट बुक करें।",
    getStarted: "मुफ्त शुरू करें", tryDemo: "डेमो आज़माएँ", startChat: "चैट शुरू करें",
    languages: "6", langLabel: "भाषाएं", available: "24/7", availLabel: "उपलब्ध", aiLabel: "संचालित",
    features: "शक्तिशाली सुविधाएं",
    symptom: "AI लक्षण विश्लेषण", symptomDesc: "उन्नत AI लक्षणों का विश्लेषण करता है",
    multiLang: "6 भाषाएं", multiLangDesc: "हिंदी, मराठी, अंग्रेजी, स्पेनिश, उर्दू, फ्रेंच समर्थन",
    history: "चिकित्सा इतिहास", historyDesc: "अपने पूर्ण चिकित्सा रिकॉर्ड ट्रैक करें",
    appointments: "स्मार्ट अपॉइंटमेंट", appointmentsDesc: "AI सिफारिशों के आधार पर विशेषज्ञ बुकिंग",
    whyTitle: "MediAgent क्यों चुनें?",
    advancedAI: "उन्नत AI तकनीक", advancedAIDesc: "सटीक स्वास्थ्य जानकारी के लिए नवीनतम AI मॉडल",
    secure: "सुरक्षित और निजी", secureDesc: "आपका स्वास्थ्य डेटा एन्क्रिप्टेड और सुरक्षित",
    multiSupport: "बहुभाषी समर्थन", multiSupportDesc: "अपनी पसंदीदा भाषा में संवाद करें",
    trusted: "हजारों द्वारा विश्वसनीय", join: "हमारे बढ़ते समुदाय से जुड़ें",
    howTitle: "यह कैसे काम करता है",
    step1: "लक्षण बताएं", step1Desc: "किसी भी भाषा में AI को अपनी स्वास्थ्य चिंताओं के बारे में बताएं",
    step2: "AI विश्लेषण प्राप्त करें", step2Desc: "विश्वसनीय चिकित्सा स्रोतों के आधार पर तत्काल जानकारी",
    step3: "कार्रवाई करें", step3Desc: "फार्मेसी खोजें, रिकॉर्ड ट्रैक करें, या विशेषज्ञों से परामर्श करें",
  },
  mr: {
    badge: "🤖 AI-शक्तीयुक्त आरोग्य सहाय्यक",
    heroTitle1: "तुमचा वैयक्तिक",
    heroTitle2: "वैद्यकीय साथीदार",
    heroDesc: "तुमच्या पसंतीच्या भाषेत AI-शक्तीयुक्त आरोग्य माहिती मिळवा. तुमचा वैद्यकीय इतिहास ट्रॅक करा, जवळपासची फार्मसी शोधा.",
    getStarted: "विनामूल्य सुरू करा", tryDemo: "डेमो वापरा", startChat: "चॅट सुरू करा",
    languages: "6", langLabel: "भाषा", available: "24/7", availLabel: "उपलब्ध", aiLabel: "शक्तीयुक्त",
    features: "शक्तिशाली वैशिष्ट्ये",
    symptom: "AI लक्षण विश्लेषण", symptomDesc: "प्रगत AI लक्षणांचे विश्लेषण करते",
    multiLang: "6 भाषा", multiLangDesc: "हिंदी, मराठी, इंग्रजी, स्पॅनिश, उर्दू, फ्रेंच समर्थन",
    history: "वैद्यकीय इतिहास", historyDesc: "तुमचे संपूर्ण वैद्यकीय रेकॉर्ड ट्रॅक करा",
    appointments: "स्मार्ट भेटी", appointmentsDesc: "AI शिफारशींवर आधारित तज्ञ बुकिंग",
    whyTitle: "MediAgent का निवडावे?",
    advancedAI: "प्रगत AI तंत्रज्ञान", advancedAIDesc: "अचूक आरोग्य माहितीसाठी नवीनतम AI मॉडेल",
    secure: "सुरक्षित आणि खाजगी", secureDesc: "तुमचा आरोग्य डेटा एन्क्रिप्ट केलेला आहे",
    multiSupport: "बहुभाषिक समर्थन", multiSupportDesc: "तुमच्या पसंतीच्या भाषेत संवाद साधा",
    trusted: "हजारो द्वारे विश्वासार्ह", join: "आमच्या वाढत्या समुदायात सामील व्हा",
    howTitle: "हे कसे कार्य करते",
    step1: "लक्षणे सांगा", step1Desc: "कोणत्याही भाषेत AI ला तुमच्या आरोग्य चिंतांबद्दल सांगा",
    step2: "AI विश्लेषण मिळवा", step2Desc: "विश्वसनीय स्रोतांवर आधारित त्वरित माहिती",
    step3: "कृती करा", step3Desc: "फार्मसी शोधा, रेकॉर्ड ट्रॅक करा, किंवा तज्ञांशी सल्लामसलत करा",
  },
  es: {
    badge: "🤖 Asistente de Salud con IA",
    heroTitle1: "Tu Compañero",
    heroTitle2: "Médico Personal",
    heroDesc: "Obtén información de salud instantánea con IA en tu idioma preferido. Rastrea tu historial médico, encuentra farmacias cercanas y reserva citas.",
    getStarted: "Empezar Gratis", tryDemo: "Probar Demo", startChat: "Empezar a Chatear",
    languages: "6", langLabel: "Idiomas", available: "24/7", availLabel: "Disponible", aiLabel: "Potenciado",
    features: "Características Poderosas",
    symptom: "Análisis AI de Síntomas", symptomDesc: "IA avanzada analiza los síntomas",
    multiLang: "6 Idiomas", multiLangDesc: "Hindi, marathi, inglés, español, urdu, francés",
    history: "Historial Médico", historyDesc: "Rastrea tu historial médico completo",
    appointments: "Citas Inteligentes", appointmentsDesc: "Reserva citas con especialistas",
    whyTitle: "¿Por qué elegir MediAgent?",
    advancedAI: "Tecnología AI Avanzada", advancedAIDesc: "Impulsado por los últimos modelos de IA",
    secure: "Seguro y Privado", secureDesc: "Tus datos de salud están encriptados",
    multiSupport: "Soporte Multilingüe", multiSupportDesc: "Comunícate en tu idioma preferido",
    trusted: "Confiado por miles", join: "Únete a nuestra comunidad",
    howTitle: "Cómo Funciona",
    step1: "Describe Síntomas", step1Desc: "Cuéntale a la IA sobre tus preocupaciones de salud",
    step2: "Obtén Análisis IA", step2Desc: "Información instantánea de fuentes médicas confiables",
    step3: "Toma Acción", step3Desc: "Encuentra farmacias, registra datos o consulta especialistas",
  },
  ur: {
    badge: "🤖 AI سے چلنے والا صحت معاون",
    heroTitle1: "آپ کا ذاتی",
    heroTitle2: "طبی ساتھی",
    heroDesc: "اپنی پسندیدہ زبان میں فوری AI صحت بصیرت حاصل کریں۔ اپنی طبی تاریخ ٹریک کریں، قریبی فارمیسیاں تلاش کریں۔",
    getStarted: "مفت شروع کریں", tryDemo: "ڈیمو آزمائیں", startChat: "چیٹ شروع کریں",
    languages: "6", langLabel: "زبانیں", available: "24/7", availLabel: "دستیاب", aiLabel: "طاقتور",
    features: "طاقتور خصوصیات",
    symptom: "AI علامات تجزیہ", symptomDesc: "ایڈوانسڈ AI علامات کا تجزیہ کرتا ہے",
    multiLang: "6 زبانیں", multiLangDesc: "ہندی، مراٹھی، انگریزی، ہسپانوی، اردو، فرانسیسی",
    history: "طبی تاریخ", historyDesc: "اپنے مکمل طبی ریکارڈز ٹریک کریں",
    appointments: "سمارٹ اپائنٹمنٹس", appointmentsDesc: "AI سفارشات کی بنیاد پر ماہرین سے ملیں",
    whyTitle: "MediAgent کیوں چنیں؟",
    advancedAI: "ایڈوانسڈ AI ٹیکنالوجی", advancedAIDesc: "درست صحت بصیرت کے لیے جدید AI ماڈلز",
    secure: "محفوظ اور نجی", secureDesc: "آپ کا صحت ڈیٹا انکرپٹڈ اور محفوظ ہے",
    multiSupport: "کثیر لسانی معاونت", multiSupportDesc: "اپنی پسندیدہ زبان میں بات چیت کریں",
    trusted: "ہزاروں کا اعتماد", join: "ہماری بڑھتی کمیونٹی میں شامل ہوں",
    howTitle: "یہ کیسے کام کرتا ہے",
    step1: "علامات بتائیں", step1Desc: "کسی بھی زبان میں AI کو اپنی صحت کے بارے میں بتائیں",
    step2: "AI تجزیہ حاصل کریں", step2Desc: "قابل اعتماد طبی ذرائع سے فوری معلومات",
    step3: "عمل کریں", step3Desc: "فارمیسیاں تلاش کریں، ریکارڈز ٹریک کریں",
  },
  fr: {
    badge: "🤖 Assistant Santé IA",
    heroTitle1: "Votre Compagnon",
    heroTitle2: "Médical Personnel",
    heroDesc: "Obtenez des informations de santé instantanées par IA dans votre langue préférée. Suivez votre historique médical, trouvez des pharmacies proches.",
    getStarted: "Commencer Gratuitement", tryDemo: "Essayer la Démo", startChat: "Commencer à Chatter",
    languages: "6", langLabel: "Langues", available: "24/7", availLabel: "Disponible", aiLabel: "Puissant",
    features: "Fonctionnalités Puissantes",
    symptom: "Analyse IA des Symptômes", symptomDesc: "IA avancée analyse les symptômes",
    multiLang: "6 Langues", multiLangDesc: "Hindi, marathi, anglais, espagnol, ourdou, français",
    history: "Historique Médical", historyDesc: "Suivez vos dossiers médicaux complets",
    appointments: "Rendez-vous Intelligents", appointmentsDesc: "Réservez des spécialistes via IA",
    whyTitle: "Pourquoi choisir MediAgent?",
    advancedAI: "Technologie IA Avancée", advancedAIDesc: "Modèles IA les plus récents",
    secure: "Sécurisé et Privé", secureDesc: "Vos données de santé sont chiffrées",
    multiSupport: "Support Multilingue", multiSupportDesc: "Communiquez dans votre langue",
    trusted: "Approuvé par des milliers", join: "Rejoignez notre communauté",
    howTitle: "Comment ça Marche",
    step1: "Décrivez les Symptômes", step1Desc: "Dites à l'IA vos préoccupations de santé",
    step2: "Obtenez l'Analyse IA", step2Desc: "Informations instantanées de sources médicales fiables",
    step3: "Passez à l'Action", step3Desc: "Trouvez des pharmacies, suivez vos dossiers",
  },
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const tr = t[language] || t.en;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block glass px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">{tr.badge}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {tr.heroTitle1}
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow mt-2">
                  {tr.heroTitle2}
                </span>
              </h1>
            
              <p className="text-xl text-muted-foreground leading-relaxed">{tr.heroDesc}</p>
              
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate("/auth")} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-full glow-primary transition-all hover:scale-105">
                    <Sparkles className="mr-2 h-5 w-5" />{tr.getStarted}
                  </Button>
                  <Button onClick={() => navigate("/chat")} size="lg" variant="outline" className="glass border-border/20 text-lg px-8 py-6 rounded-full">
                    {tr.tryDemo}
                  </Button>
                </div>
              ) : (
                <Button onClick={() => navigate("/chat")} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-full glow-primary transition-all hover:scale-105">
                  <Sparkles className="mr-2 h-5 w-5" />{tr.startChat}
                </Button>
              )}

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{tr.languages}</div>
                  <div className="text-sm text-muted-foreground">{tr.langLabel}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{tr.available}</div>
                  <div className="text-sm text-muted-foreground">{tr.availLabel}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">AI</div>
                  <div className="text-sm text-muted-foreground">{tr.aiLabel}</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
              </div>
              <div className="relative z-10 glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in">
                  <Bot className="h-12 w-12 text-primary" />
                  <div><div className="font-semibold">AI Health Analysis</div><div className="text-sm text-muted-foreground">Instant symptom checking</div></div>
                </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Zap className="h-12 w-12 text-accent" />
                  <div><div className="font-semibold">Quick Appointments</div><div className="text-sm text-muted-foreground">Book specialists instantly</div></div>
                </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <Heart className="h-12 w-12 text-secondary" />
                  <div><div className="font-semibold">Health Tracking</div><div className="text-sm text-muted-foreground">Complete medical history</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{tr.features}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-primary"><Activity className="h-7 w-7 text-primary" /></div>
              <h3 className="text-lg font-semibold mb-2">{tr.symptom}</h3>
              <p className="text-sm text-muted-foreground">{tr.symptomDesc}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-secondary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-secondary"><Globe2 className="h-7 w-7 text-secondary" /></div>
              <h3 className="text-lg font-semibold mb-2">{tr.multiLang}</h3>
              <p className="text-sm text-muted-foreground">{tr.multiLangDesc}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-accent/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center"><Shield className="h-7 w-7 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">{tr.history}</h3>
              <p className="text-sm text-muted-foreground">{tr.historyDesc}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-primary"><Sparkles className="h-7 w-7 text-primary" /></div>
              <h3 className="text-lg font-semibold mb-2">{tr.appointments}</h3>
              <p className="text-sm text-muted-foreground">{tr.appointmentsDesc}</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{tr.whyTitle}</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1"><TrendingUp className="h-4 w-4 text-primary" /></div>
                      <div><h3 className="font-semibold mb-1">{tr.advancedAI}</h3><p className="text-sm text-muted-foreground">{tr.advancedAIDesc}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1"><Shield className="h-4 w-4 text-secondary" /></div>
                      <div><h3 className="font-semibold mb-1">{tr.secure}</h3><p className="text-sm text-muted-foreground">{tr.secureDesc}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1"><Globe2 className="h-4 w-4 text-accent" /></div>
                      <div><h3 className="font-semibold mb-1">{tr.multiSupport}</h3><p className="text-sm text-muted-foreground">{tr.multiSupportDesc}</p></div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="glass rounded-2xl p-6 space-y-4">
                    <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-xl flex items-center justify-center">
                      <Activity className="h-24 w-24 text-primary animate-glow" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg">{tr.trusted}</p>
                      <p className="text-sm text-muted-foreground">{tr.join}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{tr.howTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">1</div>
              <h3 className="font-semibold mb-2">{tr.step1}</h3>
              <p className="text-sm text-muted-foreground">{tr.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center text-accent-foreground font-bold">2</div>
              <h3 className="font-semibold mb-2">{tr.step2}</h3>
              <p className="text-sm text-muted-foreground">{tr.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-secondary-foreground font-bold">3</div>
              <h3 className="font-semibold mb-2">{tr.step3}</h3>
              <p className="text-sm text-muted-foreground">{tr.step3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
