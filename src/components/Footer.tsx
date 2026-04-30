import { Link } from "react-router-dom";
import { Activity, Mail, Heart, Shield, Github, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();

  const t = {
    en: { tagline: "Your AI medical companion — anytime, anywhere.", explore: "Explore", resources: "Resources", legal: "Legal", contact: "Contact",
      home: "Home", chat: "Chat", imageAnalysis: "Image Analysis", trackRecords: "Track Records", pharmacies: "Pharmacies",
      healthGuide: "Health Guide", insurance: "Insurance", familyHealth: "Family Health", upcoming: "Upcoming Features",
      about: "About", contactUs: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service",
      rights: "All rights reserved.", made: "Made with care for better health" },
    hi: { tagline: "आपका AI मेडिकल साथी — कभी भी, कहीं भी।", explore: "एक्सप्लोर", resources: "संसाधन", legal: "कानूनी", contact: "संपर्क",
      home: "होम", chat: "चैट", imageAnalysis: "छवि विश्लेषण", trackRecords: "रिकॉर्ड", pharmacies: "फार्मेसी",
      healthGuide: "स्वास्थ्य गाइड", insurance: "बीमा", familyHealth: "पारिवारिक स्वास्थ्य", upcoming: "आगामी सुविधाएं",
      about: "हमारे बारे में", contactUs: "संपर्क करें", privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें",
      rights: "सर्वाधिकार सुरक्षित।", made: "बेहतर स्वास्थ्य के लिए बनाया गया" },
    mr: { tagline: "तुमचा AI वैद्यकीय साथी — कधीही, कुठेही.", explore: "एक्सप्लोर", resources: "संसाधने", legal: "कायदेशीर", contact: "संपर्क",
      home: "मुख्यपृष्ठ", chat: "चॅट", imageAnalysis: "प्रतिमा विश्लेषण", trackRecords: "रेकॉर्ड", pharmacies: "फार्मसी",
      healthGuide: "आरोग्य मार्गदर्शक", insurance: "विमा", familyHealth: "कौटुंबिक आरोग्य", upcoming: "आगामी वैशिष्ट्ये",
      about: "आमच्याबद्दल", contactUs: "संपर्क", privacy: "गोपनीयता धोरण", terms: "सेवा अटी",
      rights: "सर्व हक्क राखीव.", made: "उत्तम आरोग्यासाठी बनवले" },
    es: { tagline: "Tu compañero médico con IA — en cualquier momento.", explore: "Explorar", resources: "Recursos", legal: "Legal", contact: "Contacto",
      home: "Inicio", chat: "Chat", imageAnalysis: "Análisis de Imagen", trackRecords: "Registros", pharmacies: "Farmacias",
      healthGuide: "Guía de Salud", insurance: "Seguros", familyHealth: "Salud Familiar", upcoming: "Próximas",
      about: "Acerca de", contactUs: "Contáctenos", privacy: "Política de Privacidad", terms: "Términos del Servicio",
      rights: "Todos los derechos reservados.", made: "Hecho con cuidado por una mejor salud" },
  }[language] || ({} as any);

  return (
    <footer className="mt-20 border-t border-border/30 glass">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Activity className="h-7 w-7 text-primary animate-glow" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MediSoul</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">{t.tagline}</p>
            <div className="flex gap-2">
              <a href="mailto:support@medisoul.app" className="p-2 rounded-lg glass hover:bg-primary/10 transition"><Mail className="h-4 w-4 text-primary" /></a>
              <a href="https://t.me/AIxmedicbot" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:bg-primary/10 transition"><Twitter className="h-4 w-4 text-primary" /></a>
              <a href="#" className="p-2 rounded-lg glass hover:bg-primary/10 transition"><Github className="h-4 w-4 text-primary" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm">{t.explore}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition">{t.home}</Link></li>
              <li><Link to="/chat" className="text-muted-foreground hover:text-primary transition">{t.chat}</Link></li>
              <li><Link to="/image-analysis" className="text-muted-foreground hover:text-primary transition">{t.imageAnalysis}</Link></li>
              <li><Link to="/track-records" className="text-muted-foreground hover:text-primary transition">{t.trackRecords}</Link></li>
              <li><Link to="/pharmacies" className="text-muted-foreground hover:text-primary transition">{t.pharmacies}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm">{t.resources}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/health-guide" className="text-muted-foreground hover:text-primary transition">{t.healthGuide}</Link></li>
              <li><Link to="/insurance" className="text-muted-foreground hover:text-primary transition">{t.insurance}</Link></li>
              <li><Link to="/family-profiles" className="text-muted-foreground hover:text-primary transition">{t.familyHealth}</Link></li>
              <li><Link to="/upcoming-features" className="text-muted-foreground hover:text-primary transition">{t.upcoming}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm">{t.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition">{t.about}</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition">{t.contactUs}</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{t.privacy}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{t.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">© {new Date().getFullYear()} MediSoul. {t.rights}</p>
          <p className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-500 fill-red-500" /> {t.made}</p>
          <p className="flex items-center gap-1"><Shield className="h-3 w-3 text-primary" /> HIPAA-aware design</p>
        </div>
      </div>
    </footer>
  );
};
