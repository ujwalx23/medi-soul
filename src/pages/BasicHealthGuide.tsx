import { Navbar } from "@/components/Navbar";
import { Heart, Activity, Apple, Moon, Droplet, Brain, Thermometer, Shield, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const BasicHealthGuide = () => {
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Basic Health Guide",
      subtitle: "Essential evidence-based health information compiled from trusted medical sources including Drugs.com, NHS.uk, and WHO guidelines",
      downloadPdf: "Download PDF",
      heartHealth: "Heart Health",
      heartDesc: "Maintain a healthy heart through regular exercise, balanced diet, and stress management",
      physicalActivity: "Physical Activity",
      physicalDesc: "Regular physical activity is crucial for overall health and disease prevention",
      nutrition: "Nutrition",
      nutritionDesc: "Balanced nutrition forms the foundation of good health",
      sleepHealth: "Sleep Health",
      sleepDesc: "Quality sleep is essential for physical and mental health",
      comprehensiveTopics: "Comprehensive Health Topics",
      emergencyWarning: "Emergency Warning Signs",
      emergencyDesc: "Call emergency services immediately if you experience:",
      disclaimer: "This health guide is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for diagnosis and treatment."
    },
    hi: {
      title: "बुनियादी स्वास्थ्य गाइड",
      subtitle: "Drugs.com, NHS.uk और WHO दिशानिर्देशों सहित विश्वसनीय चिकित्सा स्रोतों से संकलित आवश्यक साक्ष्य-आधारित स्वास्थ्य जानकारी",
      downloadPdf: "पीडीएफ डाउनलोड करें",
      heartHealth: "हृदय स्वास्थ्य",
      heartDesc: "नियमित व्यायाम, संतुलित आहार और तनाव प्रबंधन के माध्यम से स्वस्थ हृदय बनाए रखें",
      physicalActivity: "शारीरिक गतिविधि",
      physicalDesc: "नियमित शारीरिक गतिविधि समग्र स्वास्थ्य और रोग की रोकथाम के लिए महत्वपूर्ण है",
      nutrition: "पोषण",
      nutritionDesc: "संतुलित पोषण अच्छे स्वास्थ्य की नींव है",
      sleepHealth: "नींद स्वास्थ्य",
      sleepDesc: "शारीरिक और मानसिक स्वास्थ्य के लिए गुणवत्तापूर्ण नींद आवश्यक है",
      comprehensiveTopics: "व्यापक स्वास्थ्य विषय",
      emergencyWarning: "आपातकालीन चेतावनी संकेत",
      emergencyDesc: "यदि आपको अनुभव हो तो तुरंत आपातकालीन सेवाओं को कॉल करें:",
      disclaimer: "यह स्वास्थ्य गाइड केवल सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह की जगह नहीं लेनी चाहिए। निदान और उपचार के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाताओं से परामर्श करें।"
    },
    mr: {
      title: "मूलभूत आरोग्य मार्गदर्शक",
      subtitle: "Drugs.com, NHS.uk आणि WHO मार्गदर्शक तत्त्वांसह विश्वसनीय वैद्यकीय स्रोतांमधून संकलित आवश्यक पुरावा-आधारित आरोग्य माहिती",
      downloadPdf: "पीडीएफ डाउनलोड करा",
      heartHealth: "हृदय आरोग्य",
      heartDesc: "नियमित व्यायाम, संतुलित आहार आणि तणाव व्यवस्थापनाद्वारे निरोगी हृदय राखा",
      physicalActivity: "शारीरिक क्रियाकलाप",
      physicalDesc: "नियमित शारीरिक क्रियाकलाप एकूण आरोग्य आणि रोग प्रतिबंधासाठी महत्त्वपूर्ण आहे",
      nutrition: "पोषण",
      nutritionDesc: "संतुलित पोषण चांगल्या आरोग्याचा पाया आहे",
      sleepHealth: "झोप आरोग्य",
      sleepDesc: "शारीरिक आणि मानसिक आरोग्यासाठी दर्जेदार झोप आवश्यक आहे",
      comprehensiveTopics: "सर्वसमावेशक आरोग्य विषय",
      emergencyWarning: "आणीबाणी चेतावणी चिन्हे",
      emergencyDesc: "तुम्हाला अनुभव आल्यास त्वरित आणीबाणी सेवांना कॉल करा:",
      disclaimer: "हे आरोग्य मार्गदर्शक केवळ माहितीच्या उद्देशाने आहे आणि व्यावसायिक वैद्यकीय सल्ल्याची जागा घेऊ नये. निदान आणि उपचारासाठी नेहमी पात्र आरोग्य सेवा प्रदात्यांशी सल्लामसलत करा।"
    },
    es: {
      title: "Guía Básica de Salud",
      subtitle: "Información esencial de salud basada en evidencia compilada de fuentes médicas confiables incluyendo Drugs.com, NHS.uk y directrices de la OMS",
      downloadPdf: "Descargar PDF",
      heartHealth: "Salud del Corazón",
      heartDesc: "Mantén un corazón saludable a través de ejercicio regular, dieta equilibrada y manejo del estrés",
      physicalActivity: "Actividad Física",
      physicalDesc: "La actividad física regular es crucial para la salud general y la prevención de enfermedades",
      nutrition: "Nutrición",
      nutritionDesc: "La nutrición equilibrada forma la base de una buena salud",
      sleepHealth: "Salud del Sueño",
      sleepDesc: "El sueño de calidad es esencial para la salud física y mental",
      comprehensiveTopics: "Temas de Salud Integrales",
      emergencyWarning: "Señales de Advertencia de Emergencia",
      emergencyDesc: "Llame a los servicios de emergencia inmediatamente si experimenta:",
      disclaimer: "Esta guía de salud es solo para fines informativos y no debe reemplazar el consejo médico profesional. Siempre consulte con proveedores de atención médica calificados para diagnóstico y tratamiento."
    }
  };

  const t = translations[language as keyof typeof translations];

  const generatePDF = () => {
    toast({
      title: "PDF Download",
      description: "Generating your health guide PDF...",
    });
    // TODO: Implement actual PDF generation
    setTimeout(() => {
      toast({
        title: "Coming Soon!",
        description: "PDF download feature will be available soon.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t.subtitle}
              </p>
            </div>
            <Button onClick={generatePDF} className="bg-gradient-to-r from-primary to-accent flex-shrink-0">
              <Download className="h-4 w-4 mr-2" />
              {t.downloadPdf}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <Heart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.heartHealth}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.heartDesc}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Aim for 150 minutes of moderate exercise weekly</li>
                <li>• Limit sodium intake to less than 2,300mg daily</li>
                <li>• Monitor blood pressure regularly</li>
                <li>• Avoid smoking and excessive alcohol</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <Activity className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.physicalActivity}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.physicalDesc}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 150 minutes moderate or 75 minutes vigorous activity weekly</li>
                <li>• Include strength training 2+ days per week</li>
                <li>• Break up sitting time every 30 minutes</li>
                <li>• Start slow and gradually increase intensity</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <Apple className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.nutrition}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.nutritionDesc}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 5+ servings of fruits and vegetables daily</li>
                <li>• Choose whole grains over refined grains</li>
                <li>• Limit added sugars and saturated fats</li>
                <li>• Stay hydrated with 8-10 glasses of water</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <Moon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.sleepHealth}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.sleepDesc}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Adults need 7-9 hours of sleep nightly</li>
                <li>• Maintain consistent sleep schedule</li>
                <li>• Create a dark, quiet sleeping environment</li>
                <li>• Avoid screens 1 hour before bedtime</li>
              </ul>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{t.comprehensiveTopics}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="fever" className="glass rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <span>Managing Fever</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-3 mt-4">
                    <p className="font-semibold text-foreground">Normal body temperature: 98.6°F (37°C)</p>
                    <p className="font-semibold text-foreground">Home care:</p>
                    <ul className="space-y-2">
                      <li>• Rest and stay hydrated with water, clear broths, or electrolyte drinks</li>
                      <li>• Take acetaminophen (500mg every 4-6 hours) or ibuprofen (200-400mg every 4-6 hours)</li>
                      <li>• Use cool compresses on forehead if needed</li>
                      <li>• Wear light, breathable clothing</li>
                      <li>• Keep room temperature comfortable</li>
                    </ul>
                    <p className="font-semibold text-red-500 mt-4">Seek immediate medical attention if:</p>
                    <ul className="space-y-1">
                      <li>• Fever exceeds 103°F (39.4°C)</li>
                      <li>• Fever lasts more than 3 days</li>
                      <li>• Severe headache, stiff neck, or rash present</li>
                      <li>• Difficulty breathing or chest pain</li>
                      <li>• Persistent vomiting or diarrhea</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="hydration" className="glass rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-accent" />
                    <span>Staying Hydrated</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-3 mt-4">
                    <p className="font-semibold text-foreground">Daily water intake recommendations:</p>
                    <ul className="space-y-2">
                      <li>• Men: 15.5 cups (3.7 liters) daily</li>
                      <li>• Women: 11.5 cups (2.7 liters) daily</li>
                      <li>• Increase during exercise or hot weather</li>
                      <li>• About 20% comes from food</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">Signs of proper hydration:</p>
                    <ul className="space-y-1">
                      <li>• Light yellow urine color (like lemonade)</li>
                      <li>• Urinating every 2-4 hours</li>
                      <li>• No persistent thirst</li>
                      <li>• Moist lips and mouth</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">Dehydration warning signs:</p>
                    <ul className="space-y-1">
                      <li>• Dark yellow or amber urine</li>
                      <li>• Dry mouth and lips</li>
                      <li>• Headache and dizziness</li>
                      <li>• Fatigue and confusion</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mental" className="glass rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-secondary" />
                    <span>Mental Health & Wellbeing</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-3 mt-4">
                    <p className="font-semibold text-foreground">Daily mental health practices:</p>
                    <ul className="space-y-2">
                      <li>• Practice mindfulness or meditation (10-15 minutes daily)</li>
                      <li>• Maintain regular sleep schedule</li>
                      <li>• Exercise regularly (releases endorphins)</li>
                      <li>• Stay connected with friends and family</li>
                      <li>• Limit social media and screen time</li>
                      <li>• Engage in hobbies and activities you enjoy</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">Stress management techniques:</p>
                    <ul className="space-y-1">
                      <li>• Deep breathing exercises</li>
                      <li>• Progressive muscle relaxation</li>
                      <li>• Journaling thoughts and feelings</li>
                      <li>• Setting realistic goals and boundaries</li>
                      <li>• Taking regular breaks during work</li>
                    </ul>
                    <p className="font-semibold text-red-500 mt-4">Seek professional help if experiencing:</p>
                    <ul className="space-y-1">
                      <li>• Persistent sadness or hopelessness (2+ weeks)</li>
                      <li>• Loss of interest in activities</li>
                      <li>• Significant changes in sleep or appetite</li>
                      <li>• Difficulty concentrating or making decisions</li>
                      <li>• Thoughts of self-harm</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prevention" className="glass rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Disease Prevention & Hygiene</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-3 mt-4">
                    <p className="font-semibold text-foreground">Hand washing guidelines:</p>
                    <ul className="space-y-2">
                      <li>• Wash for at least 20 seconds with soap and water</li>
                      <li>• Before eating or preparing food</li>
                      <li>• After using the bathroom</li>
                      <li>• After coughing, sneezing, or blowing nose</li>
                      <li>• After touching animals or handling waste</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">Vaccination recommendations:</p>
                    <ul className="space-y-1">
                      <li>• Stay up-to-date with routine vaccinations</li>
                      <li>• Annual flu vaccine (especially for high-risk groups)</li>
                      <li>• COVID-19 vaccinations and boosters as recommended</li>
                      <li>• Tetanus booster every 10 years</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">General prevention tips:</p>
                    <ul className="space-y-1">
                      <li>• Avoid close contact with sick individuals</li>
                      <li>• Cover coughs and sneezes with elbow or tissue</li>
                      <li>• Don't touch face with unwashed hands</li>
                      <li>• Clean and disinfect frequently touched surfaces</li>
                      <li>• Maintain good ventilation indoors</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="chronic" className="glass rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-accent" />
                    <span>Managing Chronic Conditions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-3 mt-4">
                    <p className="font-semibold text-foreground">Key principles for chronic disease management:</p>
                    <ul className="space-y-2">
                      <li>• Take medications exactly as prescribed</li>
                      <li>• Attend all scheduled medical appointments</li>
                      <li>• Monitor symptoms and track changes</li>
                      <li>• Maintain healthy lifestyle habits</li>
                      <li>• Communicate openly with healthcare team</li>
                      <li>• Join support groups if available</li>
                    </ul>
                    <p className="font-semibold text-foreground mt-4">Common chronic conditions:</p>
                    <ul className="space-y-2">
                      <li>• Diabetes: Monitor blood sugar, eat balanced diet, exercise regularly</li>
                      <li>• Hypertension: Limit sodium, manage stress, take prescribed medications</li>
                      <li>• Asthma: Avoid triggers, use inhaler as prescribed, monitor peak flow</li>
                      <li>• Arthritis: Stay active, maintain healthy weight, use prescribed treatments</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-500" />
              {t.emergencyWarning}
            </h2>
            <p className="text-muted-foreground mb-4">{t.emergencyDesc}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Chest pain</strong> - especially with shortness of breath, nausea, or radiating pain</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Stroke symptoms</strong> - sudden weakness, numbness, confusion, or vision changes</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Severe bleeding</strong> - that won't stop with direct pressure</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Difficulty breathing</strong> - severe or worsening shortness of breath</span>
                </p>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>High fever</strong> - 103°F (39.4°C) or higher not responding to medication</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Severe abdominal pain</strong> - especially with fever or vomiting</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Head injury</strong> - with loss of consciousness or confusion</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">⚠️</span>
                  <span><strong>Severe allergic reaction</strong> - with swelling, hives, or breathing difficulty</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 glass rounded-2xl p-6 bg-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Medical Disclaimer:</strong> This guide provides general health information based on trusted medical sources including Drugs.com, NHS.uk, and WHO. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for personalized medical guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHealthGuide;
