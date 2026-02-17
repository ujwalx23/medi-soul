import { Navbar } from "@/components/Navbar";
import { MessageSquare, Sparkles, FileText, Activity, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "How Medi Soul Works",
      subtitle: "Medi Soul uses advanced AI trained on trusted medical sources (Drugs.com, NHS.uk, WHO) and thousands of doctor-approved prescriptions to provide accurate health insights in 3 simple steps",
      step1Title: "Describe Your Symptoms",
      step1Text: "Simply chat with our AI assistant in your preferred language (English, Hindi, Marathi, or Spanish). Describe your symptoms, concerns, or health questions. Our AI understands natural conversation and will ask relevant follow-up questions to better understand your situation.",
      step2Title: "Get AI-Powered Analysis",
      step2Text: "Our advanced AI analyzes your symptoms using medical knowledge trained on trusted sources like Drugs.com, NHS.uk, WHO, and thousands of doctor-approved prescriptions. Within seconds, you'll receive detailed insights about potential conditions, severity assessment, and recommended next steps. The AI considers your medical history and allergies (if provided) for personalized advice.",
      step3Title: "Take Action",
      step3Text: "Based on the analysis, you can find nearby pharmacies or track your symptoms over time. All conversations are saved in your history for future reference. For emergency situations, our AI will alert you to seek immediate medical attention.",
      additionalFeaturesTitle: "Additional Features",
      feature1Title: "Health Monitoring",
      feature1Text: "Connect smartwatches and track vital signs continuously",
      feature2Title: "24/7 Availability",
      feature2Text: "Get health advice anytime, anywhere, in your language",
      feature3Title: "Secure & Private",
      feature3Text: "Your health data is encrypted and never shared",
      disclaimer: "Medi Soul is an AI assistant designed to provide health information and guidance. It is not a replacement for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for serious medical concerns.",
    },
    hi: {
      title: "मेडी सोल कैसे काम करता है",
      subtitle: "मेडी सोल विश्वसनीय चिकित्सा स्रोतों (Drugs.com, NHS.uk, WHO) और हजारों डॉक्टर-अनुमोदित प्रिस्क्रिप्शन पर प्रशिक्षित उन्नत AI का उपयोग करता है",
      step1Title: "अपने लक्षण बताएं",
      step1Text: "अपनी पसंदीदा भाषा में हमारे AI सहायक के साथ चैट करें। अपने लक्षण, चिंताएं या स्वास्थ्य प्रश्न बताएं। हमारा AI प्राकृतिक बातचीत को समझता है और आपकी स्थिति को बेहतर ढंग से समझने के लिए प्रासंगिक अनुवर्ती प्रश्न पूछेगा।",
      step2Title: "AI-संचालित विश्लेषण प्राप्त करें",
      step2Text: "हमारा उन्नत AI Drugs.com, NHS.uk, WHO जैसे विश्वसनीय स्रोतों पर प्रशिक्षित चिकित्सा ज्ञान का उपयोग करके आपके लक्षणों का विश्लेषण करता है। सेकंडों में, आपको संभावित स्थितियों, गंभीरता मूल्यांकन और अनुशंसित अगले कदमों के बारे में विस्तृत जानकारी प्राप्त होगी।",
      step3Title: "कार्रवाई करें",
      step3Text: "विश्लेषण के आधार पर, आप निकटतम फार्मेसियों को ढूंढ सकते हैं या समय के साथ अपने लक्षणों को ट्रैक कर सकते हैं। आपातकालीन स्थितियों के लिए, हमारा AI आपको तत्काल चिकित्सा ध्यान लेने के लिए सचेत करेगा।",
      additionalFeaturesTitle: "अतिरिक्त सुविधाएँ",
      feature1Title: "स्वास्थ्य निगरानी",
      feature1Text: "स्मार्टवॉच कनेक्ट करें और लगातार महत्वपूर्ण संकेतों को ट्रैक करें",
      feature2Title: "24/7 उपलब्धता",
      feature2Text: "अपनी भाषा में कभी भी, कहीं भी स्वास्थ्य सलाह प्राप्त करें",
      feature3Title: "सुरक्षित और निजी",
      feature3Text: "आपका स्वास्थ्य डेटा एन्क्रिप्टेड है और कभी साझा नहीं किया जाता",
      disclaimer: "मेडी सोल एक AI सहायक है जो स्वास्थ्य जानकारी प्रदान करने के लिए डिज़ाइन किया गया है। यह पेशेवर चिकित्सा सलाह का प्रतिस्थापन नहीं है।",
    },
    mr: {
      title: "मेडी सोल कसे कार्य करते",
      subtitle: "मेडी सोल विश्वसनीय वैद्यकीय स्रोतांवर (Drugs.com, NHS.uk, WHO) प्रशिक्षित प्रगत AI वापरते",
      step1Title: "तुमची लक्षणे सांगा",
      step1Text: "तुमच्या पसंतीच्या भाषेत आमच्या AI सहाय्यकाशी चॅट करा. तुमची लक्षणे, चिंता किंवा आरोग्य प्रश्न सांगा. आमचा AI नैसर्गिक संभाषण समजतो.",
      step2Title: "AI-संचालित विश्लेषण मिळवा",
      step2Text: "आमचा प्रगत AI Drugs.com, NHS.uk, WHO सारख्या विश्वसनीय स्रोतांवर प्रशिक्षित वैद्यकीय ज्ञान वापरून तुमच्या लक्षणांचे विश्लेषण करतो.",
      step3Title: "कृती करा",
      step3Text: "विश्लेषणावर आधारित, तुम्ही जवळच्या फार्मसी शोधू शकता किंवा कालांतराने तुमच्या लक्षणांचा मागोवा घेऊ शकता.",
      additionalFeaturesTitle: "अतिरिक्त वैशिष्ट्ये",
      feature1Title: "आरोग्य निरीक्षण",
      feature1Text: "स्मार्टवॉच कनेक्ट करा आणि सतत महत्वाच्या चिन्हांचा मागोवा घ्या",
      feature2Title: "24/7 उपलब्धता",
      feature2Text: "तुमच्या भाषेत कधीही, कुठेही आरोग्य सल्ला मिळवा",
      feature3Title: "सुरक्षित आणि खाजगी",
      feature3Text: "तुमचा आरोग्य डेटा एन्क्रिप्ट केलेला आहे आणि कधीही शेअर केला जात नाही",
      disclaimer: "मेडी सोल एक AI सहाय्यक आहे जो आरोग्य माहिती प्रदान करण्यासाठी डिझाइन केला आहे. हे व्यावसायिक वैद्यकीय सल्ल्याचा पर्याय नाही.",
    },
    es: {
      title: "Cómo Funciona Medi Soul",
      subtitle: "Medi Soul utiliza IA avanzada entrenada en fuentes médicas confiables (Drugs.com, NHS.uk, OMS) y miles de recetas aprobadas por médicos",
      step1Title: "Describe Tus Síntomas",
      step1Text: "Simplemente chatea con nuestro asistente de IA en tu idioma preferido. Describe tus síntomas, preocupaciones o preguntas de salud. Nuestra IA comprende la conversación natural.",
      step2Title: "Obtén Análisis Impulsado por IA",
      step2Text: "Nuestra IA avanzada analiza tus síntomas utilizando conocimientos médicos entrenados en fuentes confiables como Drugs.com, NHS.uk, OMS.",
      step3Title: "Toma Acción",
      step3Text: "Basándose en el análisis, puedes encontrar farmacias cercanas o rastrear tus síntomas con el tiempo.",
      additionalFeaturesTitle: "Características Adicionales",
      feature1Title: "Monitoreo de Salud",
      feature1Text: "Conecta relojes inteligentes y rastrea signos vitales continuamente",
      feature2Title: "Disponibilidad 24/7",
      feature2Text: "Obtén consejos de salud en cualquier momento, en cualquier lugar, en tu idioma",
      feature3Title: "Seguro y Privado",
      feature3Text: "Tus datos de salud están encriptados y nunca se comparten",
      disclaimer: "Medi Soul es un asistente de IA diseñado para proporcionar información de salud. No es un reemplazo del consejo médico profesional.",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-16">
            {t.subtitle}
          </p>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold glow-primary">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    {t.step1Title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.step1Text}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-3xl font-bold glow-secondary">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-accent" />
                    {t.step2Title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.step2Text}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-3xl font-bold glow-primary">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-secondary" />
                    {t.step3Title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.step3Text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.additionalFeaturesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t.feature1Title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.feature1Text}
                </p>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t.feature2Title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.feature2Text}
                </p>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t.feature3Title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.feature3Text}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 glass rounded-2xl p-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              <strong className="text-foreground">{language === 'en' ? 'Important:' : language === 'hi' ? 'महत्वपूर्ण:' : language === 'mr' ? 'महत्त्वाचे:' : 'Importante:'}</strong> {t.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;