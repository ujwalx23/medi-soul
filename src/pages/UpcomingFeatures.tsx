import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Watch, Brain, Calendar, FileText, Camera, TrendingUp, Users, Shield, Video, Pill } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const UpcomingFeatures = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      badge: "Coming Soon",
      title: "Upcoming Features",
      subtitle: "We're constantly innovating to bring you the most advanced AI-powered healthcare experience. Here's what we're working on to make your health journey even better.",
      suggestTitle: "Want to Suggest a Feature?",
      suggestDesc: "We'd love to hear your ideas! Help us shape the future of MediSoul by sharing your feature requests.",
      contactBtn: "Contact Us"
    },
    hi: {
      badge: "जल्द आ रहा है",
      title: "आगामी विशेषताएं",
      subtitle: "हम आपके लिए सबसे उन्नत AI-संचालित स्वास्थ्य सेवा अनुभव लाने के लिए लगातार नवाचार कर रहे हैं। यहां बताया गया है कि हम आपकी स्वास्थ्य यात्रा को और बेहतर बनाने के लिए क्या काम कर रहे हैं।",
      suggestTitle: "एक सुविधा का सुझाव देना चाहते हैं?",
      suggestDesc: "हम आपके विचार सुनना पसंद करेंगे! अपने फीचर अनुरोध साझा करके MediSoul के भविष्य को आकार देने में हमारी मदद करें।",
      contactBtn: "हमसे संपर्क करें"
    },
    mr: {
      badge: "लवकरच येत आहे",
      title: "आगामी वैशिष्ट्ये",
      subtitle: "तुम्हाला सर्वात प्रगत AI-संचालित आरोग्यसेवा अनुभव आणण्यासाठी आम्ही सतत नवनवीन प्रयोग करत आहोत. तुमचा आरोग्य प्रवास अधिक चांगला करण्यासाठी आम्ही काय करत आहोत ते येथे आहे.",
      suggestTitle: "वैशिष्ट्य सुचवायचे आहे?",
      suggestDesc: "आम्हाला तुमच्या कल्पना ऐकायला आवडतील! तुमच्या फीचर विनंत्या शेअर करून MediSoul च्या भविष्याला आकार देण्यास आम्हाला मदत करा.",
      contactBtn: "आमच्याशी संपर्क साधा"
    },
    es: {
      badge: "Próximamente",
      title: "Próximas Funciones",
      subtitle: "Innovamos constantemente para ofrecerte la experiencia de salud más avanzada con IA. Esto es en lo que estamos trabajando para mejorar tu viaje de salud.",
      suggestTitle: "¿Quieres Sugerir una Función?",
      suggestDesc: "¡Nos encantaría escuchar tus ideas! Ayúdanos a dar forma al futuro de MediSoul compartiendo tus solicitudes de funciones.",
      contactBtn: "Contáctanos"
    }
  };

  const t = translations[language as keyof typeof translations];
  const upcomingFeatures = [
    {
      icon: Watch,
      title: "Smart Health Monitoring",
      description: "Real-time health tracking with wearable device integration including smartwatches, fitness trackers, and health monitoring devices.",
      features: ["Heart Rate Monitoring", "Sleep Pattern Analysis", "Blood Oxygen Tracking", "Activity Metrics"],
      eta: "Q2 2025"
    },
    {
      icon: Brain,
      title: "Advanced AI Diagnostics",
      description: "Enhanced AI algorithms for more accurate symptom analysis and disease prediction with machine learning capabilities.",
      features: ["Predictive Health Analytics", "Pattern Recognition", "Risk Assessment", "Personalized Insights"],
      eta: "Q3 2025"
    },
    {
      icon: Video,
      title: "Telemedicine Integration",
      description: "Direct video consultations with healthcare professionals and specialists through our platform.",
      features: ["Video Consultations", "Screen Sharing", "Prescription Management", "Follow-up Scheduling"],
      eta: "Q3 2025"
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Comprehensive electronic health record system with secure cloud storage and easy sharing with healthcare providers.",
      features: ["Medical History", "Lab Results", "Imaging Reports", "Vaccination Records"],
      eta: "Q2 2025"
    },
    {
      icon: Camera,
      title: "Visual Symptom Analysis",
      description: "AI-powered image analysis for skin conditions, rashes, and visible symptoms using your device camera.",
      features: ["Skin Condition Detection", "Wound Tracking", "Mole Analysis", "Visual Diagnostics"],
      eta: "Q4 2025"
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Smart medication reminders, drug interaction checks, and refill notifications.",
      features: ["Medication Reminders", "Drug Interactions", "Refill Alerts", "Dosage Tracking"],
      eta: "Q2 2025"
    },
    {
      icon: TrendingUp,
      title: "Health Trends Dashboard",
      description: "Comprehensive visualization of your health metrics over time with predictive analytics.",
      features: ["Interactive Charts", "Trend Analysis", "Health Score", "Goal Tracking"],
      eta: "Q3 2025"
    },
    {
      icon: Users,
      title: "Family Health Profiles",
      description: "Manage health information for multiple family members from a single account.",
      features: ["Multiple Profiles", "Shared Access", "Family History", "Emergency Contacts"],
      eta: "Q4 2025"
    },
    {
      icon: Shield,
      title: "Insurance Integration",
      description: "Direct integration with health insurance providers for claims and coverage information.",
      features: ["Coverage Verification", "Claim Submission", "Cost Estimates", "Provider Network"],
      eta: "Q4 2025"
    },
    {
      icon: Calendar,
      title: "Appointment Booking System",
      description: "Book appointments with specialists, clinics, and diagnostic centers directly through the app.",
      features: ["Specialist Booking", "Lab Tests", "Diagnostic Centers", "Automated Reminders"],
      eta: "Q1 2026"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20">
              🚀 {t.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="glass p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {feature.eta}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-primary">Key Features:</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {feature.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 glass rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t.suggestTitle}</h2>
            <p className="text-muted-foreground mb-6">
              {t.suggestDesc}
            </p>
            <a href="/contact" className="inline-block">
              <button className="bg-gradient-to-r from-primary to-accent px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all hover:scale-105">
                {t.contactBtn}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingFeatures;
