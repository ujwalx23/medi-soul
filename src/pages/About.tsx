import { Navbar } from "@/components/Navbar";
import { Heart, Users, Target, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();

  const translations: Record<string, Record<string, string>> = {
    en: {
      title: "About MediSoul",
      missionTitle: "Our Mission", missionText: "MediSoul is dedicated to making healthcare accessible to everyone through AI-powered technology. We believe that everyone deserves instant access to reliable health information in their native language. Our platform bridges the gap between patients and healthcare by providing 24/7 AI-powered medical assistance.",
      whatWeDoTitle: "What We Do", whatWeDoText: "Medi Soul leverages cutting-edge AI trained on data from world-trusted medical sources including Drugs.com, NHS.uk, and WHO guidelines. Our AI has been trained on thousands of doctor-approved prescriptions and medical protocols to provide reliable health insights for common and basic medical conditions.",
      feature1: "Instant symptom analysis and health insights", feature2: "Multilingual support in 6 languages", feature3: "Personal health tracking and medical history management",
      feature4: "Verified medical information from trusted sources", feature5: "AI trained on doctor-approved prescriptions", feature6: "Pharmacy locator and health information services",
      valuesTitle: "Our Values", accessibilityTitle: "Accessibility", accessibilityText: "Healthcare information should be available to everyone, regardless of language or location.",
      privacyTitle: "Privacy", privacyText: "Your health data is encrypted and secure. We never share your information without consent.",
      accuracyTitle: "Accuracy", accuracyText: "Our AI is trained on verified data from Drugs.com, NHS.uk, WHO, and thousands of doctor-approved prescriptions.",
      innovationTitle: "Innovation", innovationText: "We constantly improve our technology to serve you better.",
      whyTrustTitle: "Why Trust Us", whyTrustText: "Medi Soul is built on cutting-edge AI technology trained on authoritative medical data. Our AI provides evidence-based health insights for common conditions. We always recommend consulting with healthcare professionals for serious medical concerns.",
    },
    hi: {
      title: "मेडी सोल के बारे में", missionTitle: "हमारा मिशन", missionText: "मेडी सोल AI-संचालित तकनीक के माध्यम से सभी के लिए स्वास्थ्य सेवा को सुलभ बनाने के लिए समर्पित है।",
      whatWeDoTitle: "हम क्या करते हैं", whatWeDoText: "मेडी सोल Drugs.com, NHS.uk और WHO से डेटा पर प्रशिक्षित AI का उपयोग करता है।",
      feature1: "तत्काल लक्षण विश्लेषण", feature2: "6 भाषाओं में समर्थन", feature3: "व्यक्तिगत स्वास्थ्य ट्रैकिंग",
      feature4: "सत्यापित चिकित्सा जानकारी", feature5: "डॉक्टर-अनुमोदित प्रिस्क्रिप्शन पर प्रशिक्षित AI", feature6: "फार्मेसी लोकेटर",
      valuesTitle: "हमारे मूल्य", accessibilityTitle: "सुलभता", accessibilityText: "स्वास्थ्य जानकारी सभी के लिए उपलब्ध होनी चाहिए।",
      privacyTitle: "गोपनीयता", privacyText: "आपका डेटा एन्क्रिप्टेड और सुरक्षित है।",
      accuracyTitle: "सटीकता", accuracyText: "हमारा AI सत्यापित डेटा पर प्रशिक्षित है।",
      innovationTitle: "नवाचार", innovationText: "हम लगातार सुधार करते हैं।",
      whyTrustTitle: "हम पर भरोसा क्यों करें", whyTrustText: "मेडी सोल अत्याधुनिक AI तकनीक पर बनाया गया है।",
    },
    mr: {
      title: "मेडी सोल बद्दल", missionTitle: "आमचे ध्येय", missionText: "मेडी सोल AI-संचालित तंत्रज्ञानाद्वारे प्रत्येकासाठी आरोग्य सेवा सुलभ करण्यासाठी समर्पित आहे.",
      whatWeDoTitle: "आम्ही काय करतो", whatWeDoText: "मेडी सोल Drugs.com, NHS.uk आणि WHO वरून डेटावर प्रशिक्षित AI वापरते.",
      feature1: "त्वरित लक्षण विश्लेषण", feature2: "6 भाषांमध्ये समर्थन", feature3: "वैयक्तिक आरोग्य ट्रॅकिंग",
      feature4: "सत्यापित वैद्यकीय माहिती", feature5: "डॉक्टर-मान्य प्रिस्क्रिप्शनवर प्रशिक्षित AI", feature6: "फार्मसी लोकेटर",
      valuesTitle: "आमची मूल्ये", accessibilityTitle: "सुलभता", accessibilityText: "आरोग्य माहिती सर्वांसाठी उपलब्ध असावी.",
      privacyTitle: "गोपनीयता", privacyText: "तुमचा डेटा एन्क्रिप्ट केलेला आहे.",
      accuracyTitle: "अचूकता", accuracyText: "आमचा AI सत्यापित डेटावर प्रशिक्षित आहे.",
      innovationTitle: "नाविन्य", innovationText: "आम्ही सतत सुधारणा करत आहोत.",
      whyTrustTitle: "आमच्यावर विश्वास का ठेवावा", whyTrustText: "मेडी सोल अत्याधुनिक AI तंत्रज्ञानावर तयार केले आहे.",
    },
    es: {
      title: "Acerca de Medi Soul", missionTitle: "Nuestra Misión", missionText: "Medi Soul se dedica a hacer que la atención médica sea accesible para todos a través de IA.",
      whatWeDoTitle: "Lo Que Hacemos", whatWeDoText: "Medi Soul aprovecha IA entrenada con datos de Drugs.com, NHS.uk y OMS.",
      feature1: "Análisis instantáneo de síntomas", feature2: "Soporte en 6 idiomas", feature3: "Seguimiento personal de salud",
      feature4: "Información médica verificada", feature5: "IA entrenada en recetas aprobadas", feature6: "Localizador de farmacias",
      valuesTitle: "Nuestros Valores", accessibilityTitle: "Accesibilidad", accessibilityText: "La información de salud debe estar disponible para todos.",
      privacyTitle: "Privacidad", privacyText: "Sus datos están encriptados y seguros.",
      accuracyTitle: "Precisión", accuracyText: "Nuestra IA está entrenada con datos verificados.",
      innovationTitle: "Innovación", innovationText: "Mejoramos constantemente.",
      whyTrustTitle: "Por Qué Confiar en Nosotros", whyTrustText: "Medi Soul está construido sobre tecnología IA de vanguardia.",
    },
    ur: {
      title: "میڈی سول کے بارے میں", missionTitle: "ہمارا مشن", missionText: "میڈی سول AI ٹیکنالوجی کے ذریعے صحت کی دیکھ بھال کو سب کے لیے قابل رسائی بنانے کے لیے وقف ہے۔",
      whatWeDoTitle: "ہم کیا کرتے ہیں", whatWeDoText: "میڈی سول Drugs.com، NHS.uk اور WHO کے ڈیٹا پر تربیت یافتہ AI استعمال کرتا ہے۔",
      feature1: "فوری علامات تجزیہ", feature2: "6 زبانوں میں معاونت", feature3: "ذاتی صحت ٹریکنگ",
      feature4: "تصدیق شدہ طبی معلومات", feature5: "ڈاکٹر منظور شدہ نسخوں پر تربیت یافتہ AI", feature6: "فارمیسی لوکیٹر",
      valuesTitle: "ہماری اقدار", accessibilityTitle: "رسائی", accessibilityText: "صحت کی معلومات سب کے لیے دستیاب ہونی چاہئیں۔",
      privacyTitle: "رازداری", privacyText: "آپ کا ڈیٹا انکرپٹڈ اور محفوظ ہے۔",
      accuracyTitle: "درستگی", accuracyText: "ہمارا AI تصدیق شدہ ڈیٹا پر تربیت یافتہ ہے۔",
      innovationTitle: "اختراع", innovationText: "ہم مسلسل بہتری لاتے ہیں۔",
      whyTrustTitle: "ہم پر اعتماد کیوں کریں", whyTrustText: "میڈی سول جدید AI ٹیکنالوجی پر بنایا گیا ہے۔",
    },
    fr: {
      title: "À Propos de MediSoul", missionTitle: "Notre Mission", missionText: "MediSoul se consacre à rendre les soins de santé accessibles à tous grâce à l'IA.",
      whatWeDoTitle: "Ce Que Nous Faisons", whatWeDoText: "MediSoul utilise une IA entraînée sur les données de Drugs.com, NHS.uk et l'OMS.",
      feature1: "Analyse instantanée des symptômes", feature2: "Support en 6 langues", feature3: "Suivi de santé personnel",
      feature4: "Informations médicales vérifiées", feature5: "IA entraînée sur des ordonnances approuvées", feature6: "Localisateur de pharmacies",
      valuesTitle: "Nos Valeurs", accessibilityTitle: "Accessibilité", accessibilityText: "L'information santé doit être accessible à tous.",
      privacyTitle: "Confidentialité", privacyText: "Vos données sont chiffrées et sécurisées.",
      accuracyTitle: "Précision", accuracyText: "Notre IA est entraînée sur des données vérifiées.",
      innovationTitle: "Innovation", innovationText: "Nous nous améliorons constamment.",
      whyTrustTitle: "Pourquoi Nous Faire Confiance", whyTrustText: "MediSoul est construit sur une technologie IA de pointe.",
    },
  };

  const t = translations[language] || translations.en;

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
