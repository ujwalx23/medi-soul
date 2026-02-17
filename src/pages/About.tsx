import { Navbar } from "@/components/Navbar";
import { Heart, Users, Target, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "About MediSoul",
      missionTitle: "Our Mission",
      missionText: "MediSoul is dedicated to making healthcare accessible to everyone through AI-powered technology. We believe that everyone deserves instant access to reliable health information in their native language. Our platform bridges the gap between patients and healthcare by providing 24/7 AI-powered medical assistance.",
      whatWeDoTitle: "What We Do",
      whatWeDoText: "Medi Soul leverages cutting-edge AI trained on data from world-trusted medical sources including Drugs.com, NHS.uk, and WHO guidelines. Our AI has been trained on thousands of doctor-approved prescriptions and medical protocols to provide reliable health insights for common and basic medical conditions.",
      feature1: "Instant symptom analysis and health insights",
      feature2: "Multilingual support in English, Hindi, Marathi, and Spanish",
      feature3: "Personal health tracking and medical history management",
      feature4: "Verified medical information from trusted sources like Drugs.com, NHS.uk, and WHO",
      feature5: "AI trained on doctor-approved prescriptions and medical protocols",
      feature6: "Pharmacy locator and health information services",
      valuesTitle: "Our Values",
      accessibilityTitle: "Accessibility",
      accessibilityText: "Healthcare information should be available to everyone, regardless of language or location.",
      privacyTitle: "Privacy",
      privacyText: "Your health data is encrypted and secure. We never share your information without consent.",
      accuracyTitle: "Accuracy",
      accuracyText: "Our AI is trained on verified data from Drugs.com, NHS.uk, WHO, and thousands of doctor-approved prescriptions for reliable health insights.",
      innovationTitle: "Innovation",
      innovationText: "We constantly improve our technology to serve you better.",
      whyTrustTitle: "Why Trust Us",
      whyTrustText: "Medi Soul is built on cutting-edge AI technology trained on authoritative medical data from Drugs.com, NHS.uk, WHO, and thousands of doctor-approved medical prescriptions. Our AI provides evidence-based health insights for common and basic medical conditions. While our AI is highly accurate for general health guidance, we always recommend consulting with healthcare professionals for serious medical concerns. We serve as your first point of contact for health questions, helping you make informed decisions about when to seek professional medical care.",
    },
    hi: {
      title: "मेडी सोल के बारे में",
      missionTitle: "हमारा मिशन",
      missionText: "मेडी सोल AI-संचालित तकनीक के माध्यम से सभी के लिए स्वास्थ्य सेवा को सुलभ बनाने के लिए समर्पित है। हम मानते हैं कि हर किसी को अपनी मातृभाषा में विश्वसनीय स्वास्थ्य जानकारी तक तत्काल पहुंच का अधिकार है।",
      whatWeDoTitle: "हम क्या करते हैं",
      whatWeDoText: "मेडी सोल Drugs.com, NHS.uk और WHO दिशानिर्देशों सहित विश्व-विश्वसनीय चिकित्सा स्रोतों से डेटा पर प्रशिक्षित अत्याधुनिक AI का लाभ उठाता है। हमारा AI सामान्य और बुनियादी चिकित्सा स्थितियों के लिए विश्वसनीय स्वास्थ्य अंतर्दृष्टि प्रदान करने के लिए हजारों डॉक्टर-अनुमोदित प्रिस्क्रिप्शन पर प्रशिक्षित है।",
      feature1: "तत्काल लक्षण विश्लेषण और स्वास्थ्य अंतर्दृष्टि",
      feature2: "अंग्रेजी, हिंदी, मराठी और स्पेनिश में बहुभाषी समर्थन",
      feature3: "व्यक्तिगत स्वास्थ्य ट्रैकिंग और चिकित्सा इतिहास प्रबंधन",
      feature4: "Drugs.com, NHS.uk और WHO जैसे विश्वसनीय स्रोतों से सत्यापित चिकित्सा जानकारी",
      feature5: "डॉक्टर-अनुमोदित प्रिस्क्रिप्शन पर प्रशिक्षित AI",
      feature6: "फार्मेसी लोकेटर और स्वास्थ्य जानकारी सेवाएं",
      valuesTitle: "हमारे मूल्य",
      accessibilityTitle: "सुलभता",
      accessibilityText: "स्वास्थ्य जानकारी सभी के लिए उपलब्ध होनी चाहिए।",
      privacyTitle: "गोपनीयता",
      privacyText: "आपका स्वास्थ्य डेटा एन्क्रिप्टेड और सुरक्षित है।",
      accuracyTitle: "सटीकता",
      accuracyText: "हमारा AI सत्यापित डेटा पर प्रशिक्षित है।",
      innovationTitle: "नवाचार",
      innovationText: "हम आपकी बेहतर सेवा के लिए लगातार सुधार करते हैं।",
      whyTrustTitle: "हम पर भरोसा क्यों करें",
      whyTrustText: "मेडी सोल Drugs.com, NHS.uk, WHO से आधिकारिक चिकित्सा डेटा पर प्रशिक्षित अत्याधुनिक AI तकनीक पर बनाया गया है। हमारा AI सामान्य चिकित्सा स्थितियों के लिए साक्ष्य-आधारित स्वास्थ्य अंतर्दृष्टि प्रदान करता है।",
    },
    mr: {
      title: "मेडी सोल बद्दल",
      missionTitle: "आमचे ध्येय",
      missionText: "मेडी सोल AI-संचालित तंत्रज्ञानाद्वारे प्रत्येकासाठी आरोग्य सेवा सुलभ करण्यासाठी समर्पित आहे। आम्ही विश्वास ठेवतो की प्रत्येकाला त्यांच्या मातृभाषेत विश्वासार्ह आरोग्य माहितीचा त्वरित प्रवेश मिळायला हवा.",
      whatWeDoTitle: "आम्ही काय करतो",
      whatWeDoText: "मेडी सोल Drugs.com, NHS.uk आणि WHO मार्गदर्शकांसह जागतिक-विश्वसनीय वैद्यकीय स्रोतांकडून डेटावर प्रशिक्षित अत्याधुनिक AI चा लाभ घेते. आमचा AI सामान्य आणि मूलभूत वैद्यकीय परिस्थितींसाठी विश्वासार्ह आरोग्य अंतर्दृष्टी प्रदान करण्यासाठी हजारो डॉक्टर-मान्य प्रिस्क्रिप्शनवर प्रशिक्षित आहे.",
      feature1: "त्वरित लक्षण विश्लेषण आणि आरोग्य अंतर्दृष्टी",
      feature2: "इंग्रजी, हिंदी, मराठी आणि स्पॅनिशमध्ये बहुभाषिक समर्थन",
      feature3: "वैयक्तिक आरोग्य ट्रॅकिंग आणि वैद्यकीय इतिहास व्यवस्थापन",
      feature4: "Drugs.com, NHS.uk आणि WHO सारख्या विश्वसनीय स्रोतांकडून सत्यापित वैद्यकीय माहिती",
      feature5: "डॉक्टर-मान्य प्रिस्क्रिप्शनवर प्रशिक्षित AI",
      feature6: "फार्मसी लोकेटर आणि आरोग्य माहिती सेवा",
      valuesTitle: "आमची मूल्ये",
      accessibilityTitle: "सुलभता",
      accessibilityText: "आरोग्य माहिती सर्वांसाठी उपलब्ध असावी.",
      privacyTitle: "गोपनीयता",
      privacyText: "तुमचा आरोग्य डेटा एन्क्रिप्ट केलेला आणि सुरक्षित आहे.",
      accuracyTitle: "अचूकता",
      accuracyText: "आमचा AI सत्यापित डेटावर प्रशिक्षित आहे.",
      innovationTitle: "नाविन्य",
      innovationText: "आम्ही तुमची चांगली सेवा करण्यासाठी सतत सुधारणा करत आहोत.",
      whyTrustTitle: "आमच्यावर विश्वास का ठेवावा",
      whyTrustText: "मेडी सोल Drugs.com, NHS.uk, WHO कडून अधिकृत वैद्यकीय डेटावर प्रशिक्षित अत्याधुनिक AI तंत्रज्ञानावर तयार केले आहे. आमचा AI सामान्य वैद्यकीय परिस्थितींसाठी पुरावा-आधारित आरोग्य अंतर्दृष्टी प्रदान करतो.",
    },
    es: {
      title: "Acerca de Medi Soul",
      missionTitle: "Nuestra Misión",
      missionText: "Medi Soul se dedica a hacer que la atención médica sea accesible para todos a través de tecnología impulsada por IA. Creemos que todos merecen acceso instantáneo a información de salud confiable en su idioma nativo.",
      whatWeDoTitle: "Lo Que Hacemos",
      whatWeDoText: "Medi Soul aprovecha la IA de vanguardia entrenada con datos de fuentes médicas de confianza mundial que incluyen Drugs.com, NHS.uk y directrices de la OMS. Nuestra IA ha sido entrenada en miles de recetas aprobadas por médicos para proporcionar información de salud confiable para condiciones médicas comunes y básicas.",
      feature1: "Análisis instantáneo de síntomas y perspectivas de salud",
      feature2: "Soporte multilingüe en inglés, hindi, marathi y español",
      feature3: "Seguimiento personal de salud y gestión de historial médico",
      feature4: "Información médica verificada de fuentes confiables como Drugs.com, NHS.uk y OMS",
      feature5: "IA entrenada en recetas aprobadas por médicos",
      feature6: "Localizador de farmacias y servicios de información de salud",
      valuesTitle: "Nuestros Valores",
      accessibilityTitle: "Accesibilidad",
      accessibilityText: "La información de salud debe estar disponible para todos.",
      privacyTitle: "Privacidad",
      privacyText: "Sus datos de salud están encriptados y seguros.",
      accuracyTitle: "Precisión",
      accuracyText: "Nuestra IA está entrenada con datos verificados.",
      innovationTitle: "Innovación",
      innovationText: "Mejoramos constantemente nuestra tecnología para servirle mejor.",
      whyTrustTitle: "Por Qué Confiar en Nosotros",
      whyTrustText: "Medi Soul está construido sobre tecnología de IA de vanguardia entrenada con datos médicos autorizados de Drugs.com, NHS.uk, OMS. Nuestra IA proporciona información de salud basada en evidencia para condiciones médicas comunes.",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                {t.missionTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.missionText}
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="h-6 w-6 text-accent" />
                {t.whatWeDoTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.whatWeDoText}
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature5}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{t.feature6}</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-secondary" />
                {t.valuesTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t.accessibilityTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.accessibilityText}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">{t.privacyTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.privacyText}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-2">{t.accuracyTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.accuracyText}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t.innovationTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.innovationText}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                {t.whyTrustTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.whyTrustText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
