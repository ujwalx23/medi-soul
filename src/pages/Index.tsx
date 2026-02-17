import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Activity, Sparkles, Shield, Globe2, Bot, Zap, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block glass px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">🤖 AI-Powered Health Assistant</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your Personal
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow mt-2">
                  Medical Companion
                </span>
              </h1>
            
              <p className="text-xl text-muted-foreground leading-relaxed">
                {language === 'en' && "Get instant AI-powered health insights in your preferred language. Track your medical history, find nearby pharmacies, and book appointments - all in one place."}
                {language === 'hi' && "अपनी पसंदीदा भाषा में तुरंत AI-संचालित स्वास्थ्य जानकारी प्राप्त करें। अपना चिकित्सा इतिहास ट्रैक करें, नजदीकी फार्मेसियां खोजें और अपॉइंटमेंट बुक करें।"}
                {language === 'mr' && "तुमच्या पसंतीच्या भाषेत झटपट AI-शक्तीयुक्त आरोग्य माहिती मिळवा. तुमचा वैद्यकीय इतिहास ट्रॅक करा, जवळपासची फार्मसी शोधा आणि भेटी बुक करा."}
                {language === 'es' && "Obtén información de salud instantánea con IA en tu idioma preferido. Rastrea tu historial médico, encuentra farmacias cercanas y reserva citas."}
              </p>
              
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate("/auth")} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-full glow-primary transition-all hover:scale-105">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {language === 'en' && "Get Started Free"}{language === 'hi' && "मुफ्त शुरू करें"}{language === 'mr' && "विनामूल्य सुरू करा"}{language === 'es' && "Empezar Gratis"}
                  </Button>
                  <Button onClick={() => navigate("/chat")} size="lg" variant="outline" className="glass border-white/20 text-lg px-8 py-6 rounded-full">
                    {language === 'en' && "Try Demo"}{language === 'hi' && "डेमो आज़माएँ"}{language === 'mr' && "डेमो वापरून पहा"}{language === 'es' && "Probar Demo"}
                  </Button>
                </div>
              ) : (
                <Button onClick={() => navigate("/chat")} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-full glow-primary transition-all hover:scale-105">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {language === 'en' && "Start Chatting"}{language === 'hi' && "चैट शुरू करें"}{language === 'mr' && "चॅट सुरू करा"}{language === 'es' && "Empezar a Chatear"}
                </Button>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' && "Languages"}{language === 'hi' && "भाषाएं"}{language === 'mr' && "भाषा"}{language === 'es' && "Idiomas"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' && "Available"}{language === 'hi' && "उपलब्ध"}{language === 'mr' && "उपलब्ध"}{language === 'es' && "Disponible"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">AI</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' && "Powered"}{language === 'hi' && "संचालित"}{language === 'mr' && "शक्तीयुक्त"}{language === 'es' && "Potenciado"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Decorative */}
            <div className="relative hidden lg:block">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
              </div>
              <div className="relative z-10 glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in">
                  <Bot className="h-12 w-12 text-primary" />
                  <div>
                    <div className="font-semibold">AI Health Analysis</div>
                    <div className="text-sm text-muted-foreground">Instant symptom checking</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Zap className="h-12 w-12 text-accent" />
                  <div>
                    <div className="font-semibold">Quick Appointments</div>
                    <div className="text-sm text-muted-foreground">Book specialists instantly</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <Heart className="h-12 w-12 text-secondary" />
                  <div>
                    <div className="font-semibold">Health Tracking</div>
                    <div className="text-sm text-muted-foreground">Complete medical history</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {language === 'en' && "Powerful Features"}{language === 'hi' && "शक्तिशाली सुविधाएं"}{language === 'mr' && "शक्तिशाली वैशिष्ट्ये"}{language === 'es' && "Características Poderosas"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-primary"><Activity className="h-7 w-7 text-primary" /></div>
              <h3 className="text-lg font-semibold mb-2">{language === 'en' && "AI Symptom Analysis"}{language === 'hi' && "AI लक्षण विश्लेषण"}{language === 'mr' && "AI लक्षण विश्लेषण"}{language === 'es' && "Análisis AI de Síntomas"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Advanced AI analyzes symptoms and provides instant insights"}{language === 'hi' && "उन्नत AI लक्षणों का विश्लेषण करता है"}{language === 'mr' && "प्रगत AI लक्षणांचे विश्लेषण करते"}{language === 'es' && "IA avanzada analiza los síntomas"}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-secondary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-secondary"><Globe2 className="h-7 w-7 text-secondary" /></div>
              <h3 className="text-lg font-semibold mb-2">{language === 'en' && "4 Languages"}{language === 'hi' && "4 भाषाएं"}{language === 'mr' && "4 भाषा"}{language === 'es' && "4 Idiomas"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Hindi, Marathi, English, Spanish support"}{language === 'hi' && "हिंदी, मराठी, अंग्रेजी, स्पेनिश समर्थन"}{language === 'mr' && "हिंदी, मराठी, इंग्रजी, स्पॅनिश समर्थन"}{language === 'es' && "Soporte en hindi, marathi, inglés, español"}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-accent/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center"><Shield className="h-7 w-7 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">{language === 'en' && "Medical History"}{language === 'hi' && "चिकित्सा इतिहास"}{language === 'mr' && "वैद्यकीय इतिहास"}{language === 'es' && "Historial Médico"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Track and access your complete medical records"}{language === 'hi' && "अपने पूर्ण चिकित्सा रिकॉर्ड ट्रैक करें"}{language === 'mr' && "तुमचे संपूर्ण वैद्यकीय रेकॉर्ड ट्रॅक करा"}{language === 'es' && "Rastrea tu historial médico completo"}</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full glass flex items-center justify-center glow-primary"><Sparkles className="h-7 w-7 text-primary" /></div>
              <h3 className="text-lg font-semibold mb-2">{language === 'en' && "Smart Appointments"}{language === 'hi' && "स्मार्ट अपॉइंटमेंट"}{language === 'mr' && "स्मार्ट भेटी"}{language === 'es' && "Citas Inteligentes"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Book specialist appointments based on AI recommendations"}{language === 'hi' && "AI सिफारिशों के आधार पर विशेषज्ञ बुकिंग"}{language === 'mr' && "AI शिफारशींवर आधारित तज्ञ बुकिंग"}{language === 'es' && "Reserva citas con especialistas"}</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {language === 'en' && "Why Choose MediAgent?"}{language === 'hi' && "MediAgent क्यों चुनें?"}{language === 'mr' && "MediAgent का निवडावे?"}{language === 'es' && "¿Por qué elegir MediAgent?"}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1"><TrendingUp className="h-4 w-4 text-primary" /></div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === 'en' && "Advanced AI Technology"}{language === 'hi' && "उन्नत AI तकनीक"}{language === 'mr' && "प्रगत AI तंत्रज्ञान"}{language === 'es' && "Tecnología AI Avanzada"}</h3>
                        <p className="text-sm text-muted-foreground">{language === 'en' && "Powered by latest AI models for accurate health insights"}{language === 'hi' && "सटीक स्वास्थ्य जानकारी के लिए नवीनतम AI मॉडल द्वारा संचालित"}{language === 'mr' && "अचूक आरोग्य माहितीसाठी नवीनतम AI मॉडेलद्वारे समर्थित"}{language === 'es' && "Impulsado por los últimos modelos de IA"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1"><Shield className="h-4 w-4 text-secondary" /></div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === 'en' && "Secure & Private"}{language === 'hi' && "सुरक्षित और निजी"}{language === 'mr' && "सुरक्षित आणि खाजगी"}{language === 'es' && "Seguro y Privado"}</h3>
                        <p className="text-sm text-muted-foreground">{language === 'en' && "Your health data is encrypted and stored securely"}{language === 'hi' && "आपका स्वास्थ्य डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है"}{language === 'mr' && "तुमचा आरोग्य डेटा एन्क्रिप्ट केलेला आणि सुरक्षितपणे संग्रहित आहे"}{language === 'es' && "Tus datos de salud están encriptados"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1"><Globe2 className="h-4 w-4 text-accent" /></div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === 'en' && "Multilingual Support"}{language === 'hi' && "बहुभाषी समर्थन"}{language === 'mr' && "बहुभाषिक समर्थन"}{language === 'es' && "Soporte Multilingüe"}</h3>
                        <p className="text-sm text-muted-foreground">{language === 'en' && "Communicate in your preferred language"}{language === 'hi' && "अपनी पसंदीदा भाषा में संवाद करें"}{language === 'mr' && "तुमच्या पसंतीच्या भाषेत संवाद साधा"}{language === 'es' && "Comunícate en tu idioma preferido"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="glass rounded-2xl p-6 space-y-4">
                    <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-xl flex items-center justify-center">
                      <Activity className="h-24 w-24 text-primary animate-glow" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg">{language === 'en' && "Trusted by thousands"}{language === 'hi' && "हजारों द्वारा विश्वसनीय"}{language === 'mr' && "हजारो द्वारे विश्वासार्ह"}{language === 'es' && "Confiado por miles"}</p>
                      <p className="text-sm text-muted-foreground">{language === 'en' && "Join our growing community"}{language === 'hi' && "हमारे बढ़ते समुदाय से जुड़ें"}{language === 'mr' && "आमच्या वाढत्या समुदायात सामील व्हा"}{language === 'es' && "Únete a nuestra comunidad"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === 'en' && "How It Works"}{language === 'hi' && "यह कैसे काम करता है"}{language === 'mr' && "हे कसे कार्य करते"}{language === 'es' && "Cómo Funciona"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">1</div>
              <h3 className="font-semibold mb-2">{language === 'en' && "Describe Symptoms"}{language === 'hi' && "लक्षण बताएं"}{language === 'mr' && "लक्षणे सांगा"}{language === 'es' && "Describe Síntomas"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Chat with our AI in your language"}{language === 'hi' && "अपनी भाषा में AI से बात करें"}{language === 'mr' && "तुमच्या भाषेत AI शी बोला"}{language === 'es' && "Chatea con nuestra IA"}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center text-white font-bold">2</div>
              <h3 className="font-semibold mb-2">{language === 'en' && "Get AI Analysis"}{language === 'hi' && "AI विश्लेषण प्राप्त करें"}{language === 'mr' && "AI विश्लेषण मिळवा"}{language === 'es' && "Obtén Análisis AI"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Receive instant health insights"}{language === 'hi' && "तुरंत स्वास्थ्य जानकारी प्राप्त करें"}{language === 'mr' && "झटपट आरोग्य माहिती मिळवा"}{language === 'es' && "Recibe información instantánea"}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold">3</div>
              <h3 className="font-semibold mb-2">{language === 'en' && "Take Action"}{language === 'hi' && "कार्रवाई करें"}{language === 'mr' && "कृती करा"}{language === 'es' && "Toma Acción"}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Book appointments or find pharmacies"}{language === 'hi' && "अपॉइंटमेंट बुक करें या फार्मेसी खोजें"}{language === 'mr' && "भेटी बुक करा किंवा फार्मसी शोधा"}{language === 'es' && "Reserva citas o encuentra farmacias"}</p>
            </div>
          </div>
        </div>

        {/* Trusted Data Sources */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === 'en' && "Trusted Data Sources"}{language === 'hi' && "विश्वसनीय डेटा स्रोत"}{language === 'mr' && "विश्वासार्ह डेटा स्रोत"}{language === 'es' && "Fuentes de Datos Confiables"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center hover:border-primary/50 transition-all">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-lg mb-2">NHS.uk</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "UK National Health Service trusted guidelines"}{language === 'hi' && "यूके राष्ट्रीय स्वास्थ्य सेवा विश्वसनीय दिशानिर्देश"}{language === 'mr' && "यूके राष्ट्रीय आरोग्य सेवा विश्वासार्ह मार्गदर्शक तत्त्वे"}{language === 'es' && "Pautas del Servicio Nacional de Salud del Reino Unido"}</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover:border-accent/50 transition-all">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-bold text-lg mb-2">Drugs.com</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "Comprehensive medication database"}{language === 'hi' && "व्यापक दवा डेटाबेस"}{language === 'mr' && "सर्वसमावेशक औषध डेटाबेस"}{language === 'es' && "Base de datos completa de medicamentos"}</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover:border-secondary/50 transition-all">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-lg mb-2">WHO</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' && "World Health Organization standards"}{language === 'hi' && "विश्व स्वास्थ्य संगठन मानक"}{language === 'mr' && "जागतिक आरोग्य संघटना मानके"}{language === 'es' && "Estándares de la Organización Mundial de la Salud"}</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
            {language === 'en' && "Our AI is trained on thousands of doctor-approved prescriptions and medical guidelines from these authoritative sources, ensuring accurate and reliable health information for basic medical conditions."}
            {language === 'hi' && "हमारा AI इन आधिकारिक स्रोतों से हजारों डॉक्टर-अनुमोदित नुस्खे और चिकित्सा दिशानिर्देशों पर प्रशिक्षित है, जो बुनियादी चिकित्सा स्थितियों के लिए सटीक और विश्वसनीय स्वास्थ्य जानकारी सुनिश्चित करता है।"}
            {language === 'mr' && "आमची AI या अधिकृत स्रोतांकडून हजारो डॉक्टर-मान्यताप्राप्त प्रिस्क्रिप्शन आणि वैद्यकीय मार्गदर्शक तत्त्वांवर प्रशिक्षित आहे, जी मूलभूत वैद्यकीय परिस्थितींसाठी अचूक आणि विश्वासार्ह आरोग्य माहिती सुनिश्चित करते।"}
            {language === 'es' && "Nuestra IA está entrenada con miles de recetas aprobadas por médicos y pautas médicas de estas fuentes autorizadas, garantizando información de salud precisa y confiable para condiciones médicas básicas."}
          </p>
        </div>

        {/* Interactive Stats */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary mb-2 animate-glow">1000+</div>
              <div className="text-sm text-muted-foreground">{language === 'en' && "Medical Guidelines"}{language === 'hi' && "चिकित्सा दिशानिर्देश"}{language === 'mr' && "वैद्यकीय मार्गदर्शक तत्त्वे"}{language === 'es' && "Pautas Médicas"}</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-accent mb-2">99%</div>
              <div className="text-sm text-muted-foreground">{language === 'en' && "Accuracy Rate"}{language === 'hi' && "सटीकता दर"}{language === 'mr' && "अचूकता दर"}{language === 'es' && "Tasa de Precisión"}</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{language === 'en' && "Availability"}{language === 'hi' && "उपलब्धता"}{language === 'mr' && "उपलब्धता"}{language === 'es' && "Disponibilidad"}</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">{language === 'en' && "Languages"}{language === 'hi' && "भाषाएं"}{language === 'mr' && "भाषा"}{language === 'es' && "Idiomas"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
