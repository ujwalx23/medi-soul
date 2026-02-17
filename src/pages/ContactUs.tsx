import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Mail, MessageSquare, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactUs = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const translations = {
    en: {
      title: "Contact Us",
      subtitle: "We're here to help. Reach out to us anytime!",
      sendMessageTitle: "Send us a Message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      subject: "Subject",
      subjectPlaceholder: "How can we help?",
      message: "Message",
      messagePlaceholder: "Tell us more about your inquiry...",
      sendButton: "Send Message",
      getInTouchTitle: "Get in Touch",
      emailLabel: "Email",
      liveChatLabel: "Live Chat",
      liveChatText: "Available 24/7 through our AI assistant",
      languagesLabel: "Languages",
      languagesText: "English, Hindi, Marathi, Spanish",
      responseTimeLabel: "Response Time",
      responseTimeText: "We typically respond within 24 hours",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "Q: Is my health data secure?",
      faq1A: "A: Yes! All your health data is encrypted and stored securely. We never share your information without your explicit consent.",
      faq2Q: "Q: Can I use Medi Soul in my language?",
      faq2A: "A: Absolutely! We support English, Hindi, Marathi, and Spanish with plans to add more languages soon.",
      faq3Q: "Q: Do you provide actual medical diagnoses?",
      faq3A: "A: No, our AI provides health insights and guidance based on your symptoms. We always recommend consulting healthcare professionals for official diagnoses and treatment.",
      faq4Q: "Q: Is the service available 24/7?",
      faq4A: "A: Yes! Our AI chatbot is available round the clock to answer your health questions anytime, anywhere.",
      faq5Q: "Q: How accurate is your AI?",
      faq5A: "A: Our AI is trained on data from trusted sources like Drugs.com, NHS.uk, WHO, and thousands of doctor-approved prescriptions for reliable insights on common conditions.",
      faq6Q: "Q: Can I track my medical history?",
      faq6A: "A: Yes! When you create an account, all your conversations and medical records are saved securely for future reference.",
      faq7Q: "Q: Do I need to create an account?",
      faq7A: "A: You can try our demo mode without an account, but creating an account unlocks features like chat history, profile management, and medicine tracking.",
      messageSent: "Message Sent!",
      messageSentDesc: "Thank you for contacting us. We'll get back to you soon.",
    },
    hi: {
      title: "संपर्क करें",
      subtitle: "हम मदद के लिए यहां हैं। किसी भी समय हमसे संपर्क करें!",
      sendMessageTitle: "हमें संदेश भेजें",
      name: "नाम",
      namePlaceholder: "आपका नाम",
      email: "ईमेल",
      emailPlaceholder: "your.email@example.com",
      subject: "विषय",
      subjectPlaceholder: "हम आपकी कैसे मदद कर सकते हैं?",
      message: "संदेश",
      messagePlaceholder: "अपनी पूछताछ के बारे में और बताएं...",
      sendButton: "संदेश भेजें",
      getInTouchTitle: "संपर्क में रहें",
      emailLabel: "ईमेल",
      liveChatLabel: "लाइव चैट",
      liveChatText: "हमारे AI सहायक के माध्यम से 24/7 उपलब्ध",
      languagesLabel: "भाषाएँ",
      languagesText: "अंग्रेज़ी, हिंदी, मराठी, स्पेनिश",
      responseTimeLabel: "प्रतिक्रिया समय",
      responseTimeText: "हम आमतौर पर 24 घंटों के भीतर जवाब देते हैं",
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
      faq1Q: "प्रश्न: क्या मेरा स्वास्थ्य डेटा सुरक्षित है?",
      faq1A: "उत्तर: हाँ! आपका सभी स्वास्थ्य डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है।",
      faq2Q: "प्रश्न: क्या मैं अपनी भाषा में मेडी सोल का उपयोग कर सकता हूं?",
      faq2A: "उत्तर: बिल्कुल! हम अंग्रेजी, हिंदी, मराठी और स्पेनिश का समर्थन करते हैं।",
      faq3Q: "प्रश्न: क्या आप वास्तविक चिकित्सा निदान प्रदान करते हैं?",
      faq3A: "उत्तर: नहीं, हमारा AI आपके लक्षणों के आधार पर स्वास्थ्य अंतर्दृष्टि प्रदान करता है।",
      faq4Q: "प्रश्न: क्या सेवा 24/7 उपलब्ध है?",
      faq4A: "उत्तर: हाँ! हमारा AI चैटबॉट किसी भी समय उपलब्ध है।",
      faq5Q: "प्रश्न: आपका AI कितना सटीक है?",
      faq5A: "उत्तर: हमारा AI Drugs.com, NHS.uk, WHO से विश्वसनीय डेटा पर प्रशिक्षित है।",
      faq6Q: "प्रश्न: क्या मैं अपना चिकित्सा इतिहास ट्रैक कर सकता हूं?",
      faq6A: "उत्तर: हाँ! जब आप एक खाता बनाते हैं, तो आपकी सभी बातचीत सुरक्षित रूप से सहेजी जाती है।",
      faq7Q: "प्रश्न: क्या मुझे एक खाता बनाने की आवश्यकता है?",
      faq7A: "उत्तर: आप बिना खाते के डेमो मोड का प्रयास कर सकते हैं।",
      messageSent: "संदेश भेजा गया!",
      messageSentDesc: "हमसे संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।",
    },
    mr: {
      title: "आमच्याशी संपर्क साधा",
      subtitle: "आम्ही मदत करण्यासाठी येथे आहोत. कधीही आमच्याशी संपर्क साधा!",
      sendMessageTitle: "आम्हाला संदेश पाठवा",
      name: "नाव",
      namePlaceholder: "तुमचे नाव",
      email: "ईमेल",
      emailPlaceholder: "your.email@example.com",
      subject: "विषय",
      subjectPlaceholder: "आम्ही तुम्हाला कशी मदत करू शकतो?",
      message: "संदेश",
      messagePlaceholder: "तुमच्या चौकशीबद्दल अधिक सांगा...",
      sendButton: "संदेश पाठवा",
      getInTouchTitle: "संपर्कात रहा",
      emailLabel: "ईमेल",
      liveChatLabel: "लाइव्ह चॅट",
      liveChatText: "आमच्या AI सहाय्यकाद्वारे 24/7 उपलब्ध",
      languagesLabel: "भाषा",
      languagesText: "इंग्रजी, हिंदी, मराठी, स्पॅनिश",
      responseTimeLabel: "प्रतिसाद वेळ",
      responseTimeText: "आम्ही सामान्यत: 24 तासांच्या आत प्रतिसाद देतो",
      faqTitle: "वारंवार विचारले जाणारे प्रश्न",
      faq1Q: "प्रश्न: माझा आरोग्य डेटा सुरक्षित आहे का?",
      faq1A: "उत्तर: होय! तुमचा सर्व आरोग्य डेटा एन्क्रिप्ट केलेला आणि सुरक्षितपणे संग्रहित आहे.",
      faq2Q: "प्रश्न: मी माझ्या भाषेत मेडी सोल वापरू शकतो का?",
      faq2A: "उत्तर: नक्कीच! आम्ही इंग्रजी, हिंदी, मराठी आणि स्पॅनिश समर्थन करतो.",
      faq3Q: "प्रश्न: तुम्ही वास्तविक वैद्यकीय निदान प्रदान करता का?",
      faq3A: "उत्तर: नाही, आमचा AI तुमच्या लक्षणांवर आधारित आरोग्य अंतर्दृष्टी प्रदान करतो.",
      faq4Q: "प्रश्न: सेवा 24/7 उपलब्ध आहे का?",
      faq4A: "उत्तर: होय! आमचा AI चॅटबॉट कधीही उपलब्ध आहे.",
      faq5Q: "प्रश्न: तुमचा AI किती अचूक आहे?",
      faq5A: "उत्तर: आमचा AI Drugs.com, NHS.uk, WHO वरून विश्वासार्ह डेटावर प्रशिक्षित आहे.",
      faq6Q: "प्रश्न: मी माझा वैद्यकीय इतिहास ट्रॅक करू शकतो का?",
      faq6A: "उत्तर: होय! जेव्हा तुम्ही खाते तयार करता, तेव्हा तुमचे सर्व संभाषण सुरक्षितपणे जतन केले जातात.",
      faq7Q: "प्रश्न: मला खाते तयार करणे आवश्यक आहे का?",
      faq7A: "उत्तर: तुम्ही खाते शिवाय डेमो मोड वापरू शकता.",
      messageSent: "संदेश पाठवला!",
      messageSentDesc: "आमच्याशी संपर्क साधल्याबद्दल धन्यवाद. आम्ही लवकरच तुमच्याशी संपर्क साधू.",
    },
    es: {
      title: "Contáctenos",
      subtitle: "Estamos aquí para ayudar. ¡Contáctenos en cualquier momento!",
      sendMessageTitle: "Envíenos un Mensaje",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu.email@ejemplo.com",
      subject: "Asunto",
      subjectPlaceholder: "¿Cómo podemos ayudar?",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos más sobre tu consulta...",
      sendButton: "Enviar Mensaje",
      getInTouchTitle: "Ponte en Contacto",
      emailLabel: "Correo electrónico",
      liveChatLabel: "Chat en Vivo",
      liveChatText: "Disponible 24/7 a través de nuestro asistente de IA",
      languagesLabel: "Idiomas",
      languagesText: "Inglés, Hindi, Marathi, Español",
      responseTimeLabel: "Tiempo de Respuesta",
      responseTimeText: "Normalmente respondemos en 24 horas",
      faqTitle: "Preguntas Frecuentes",
      faq1Q: "P: ¿Mis datos de salud están seguros?",
      faq1A: "R: ¡Sí! Todos sus datos de salud están encriptados y almacenados de forma segura.",
      faq2Q: "P: ¿Puedo usar Medi Soul en mi idioma?",
      faq2A: "R: ¡Absolutamente! Admitimos inglés, hindi, marathi y español.",
      faq3Q: "P: ¿Proporcionan diagnósticos médicos reales?",
      faq3A: "R: No, nuestra IA proporciona información de salud basada en sus síntomas.",
      faq4Q: "P: ¿El servicio está disponible 24/7?",
      faq4A: "R: ¡Sí! Nuestro chatbot de IA está disponible en cualquier momento.",
      faq5Q: "P: ¿Qué tan precisa es su IA?",
      faq5A: "R: Nuestra IA está entrenada con datos confiables de Drugs.com, NHS.uk, OMS.",
      faq6Q: "P: ¿Puedo rastrear mi historial médico?",
      faq6A: "R: ¡Sí! Cuando crea una cuenta, todas sus conversaciones se guardan de forma segura.",
      faq7Q: "P: ¿Necesito crear una cuenta?",
      faq7A: "R: Puede probar nuestro modo de demostración sin una cuenta.",
      messageSent: "¡Mensaje Enviado!",
      messageSentDesc: "Gracias por contactarnos. Nos pondremos en contacto pronto.",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.messageSent,
      description: t.messageSentDesc,
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            {t.subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">{t.sendMessageTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.name}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.email}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.subject}</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder={t.subjectPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.message}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder={t.messagePlaceholder}
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
                  {t.sendButton}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">{t.getInTouchTitle}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.emailLabel}</h3>
                      <p className="text-sm text-muted-foreground">aimedic23@gmail.com</p>
                      <p className="text-sm text-muted-foreground">teamsupport6811@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.liveChatLabel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.liveChatText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.languagesLabel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.languagesText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.responseTimeLabel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.responseTimeText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="font-bold mb-4">{t.faqTitle}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">{t.faq1Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq1A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq2Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq2A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq3Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq3A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq4Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq4A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq5Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq5A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq6Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq6A}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">{t.faq7Q}</p>
                  <p className="text-sm text-muted-foreground">{t.faq7A}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;