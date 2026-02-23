import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Activity, Menu, X, User, MessageSquare, Sparkles, Mail, ScanLine, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations: Record<string, Record<string, string>> = {
    en: {
      home: "Home", chat: "Chat", about: "About", contact: "Contact",
      healthGuide: "Health Guide", pharmacies: "Pharmacies", trackRecords: "Track Records",
      imageAnalysis: "Image Analysis",
      profile: "Profile", upcomingFeatures: "Upcoming Features", login: "Login", logout: "Logout",
    },
    hi: {
      home: "होम", chat: "चैट", about: "हमारे बारे में", contact: "संपर्क करें",
      healthGuide: "स्वास्थ्य गाइड", pharmacies: "फार्मेसी", trackRecords: "रिकॉर्ड ट्रैक करें",
      imageAnalysis: "छवि विश्लेषण",
      profile: "प्रोफ़ाइल", upcomingFeatures: "आगामी सुविधाएं", login: "लॉगिन", logout: "लॉगआउट",
    },
    mr: {
      home: "मुख्यपृष्ठ", chat: "चॅट", about: "आमच्याबद्दल", contact: "संपर्क",
      healthGuide: "आरोग्य मार्गदर्शक", pharmacies: "फार्मसी", trackRecords: "रेकॉर्ड ट्रॅक करा",
      imageAnalysis: "प्रतिमा विश्लेषण",
      profile: "प्रोफाइल", upcomingFeatures: "आगामी वैशिष्ट्ये", login: "लॉगिन", logout: "लॉगआउट",
    },
    es: {
      home: "Inicio", chat: "Chat", about: "Acerca de", contact: "Contacto",
      healthGuide: "Guía de Salud", pharmacies: "Farmacias", trackRecords: "Seguimiento",
      imageAnalysis: "Análisis de Imagen",
      profile: "Perfil", upcomingFeatures: "Próximas Funciones", login: "Iniciar sesión", logout: "Cerrar sesión",
    },
    ur: {
      home: "ہوم", chat: "چیٹ", about: "ہمارے بارے میں", contact: "رابطہ کریں",
      healthGuide: "صحت گائیڈ", pharmacies: "فارمیسی", trackRecords: "ریکارڈ ٹریک کریں",
      imageAnalysis: "تصویر تجزیہ",
      profile: "پروفائل", upcomingFeatures: "آنے والی خصوصیات", login: "لاگ ان", logout: "لاگ آؤٹ",
    },
    fr: {
      home: "Accueil", chat: "Chat", about: "À propos", contact: "Contact",
      healthGuide: "Guide Santé", pharmacies: "Pharmacies", trackRecords: "Suivi",
      imageAnalysis: "Analyse d'Image",
      profile: "Profil", upcomingFeatures: "Fonctionnalités à venir", login: "Connexion", logout: "Déconnexion",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Activity className="h-8 w-8 text-primary animate-glow transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MediSoul
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.home}</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.about}</Link>
            <Link to="/health-guide" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.healthGuide}</Link>
            <Link to="/pharmacies" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.pharmacies}</Link>
            <Link to="/track-records" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.trackRecords}</Link>
            <Link to="/image-analysis" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5 flex items-center gap-1"><ScanLine className="h-4 w-4" />{t.imageAnalysis}</Link>
            
            {user && (
              <TooltipProvider>
                <div className="flex items-center gap-1 ml-2 border-l border-border/10 pl-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/upcoming-features" className="p-2 hover:bg-accent/10 rounded-lg transition-colors"><Sparkles className="h-5 w-5" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>{t.upcomingFeatures}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/contact" className="p-2 hover:bg-accent/10 rounded-lg transition-colors"><Mail className="h-5 w-5" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>{t.contact}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/profile" className="p-2 hover:bg-accent/10 rounded-lg transition-colors"><User className="h-5 w-5" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>{t.profile}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/chat" className="p-2 hover:bg-primary/20 bg-primary/10 rounded-lg transition-colors"><MessageSquare className="h-5 w-5 text-primary" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>{t.chat}</p></TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            )}

            {!user && (
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/5">{t.contact}</Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass border-border/20 hover:bg-accent/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            <LanguageSwitcher language={language} onLanguageChange={(lang) => setLanguage(lang as any)} />

            {user ? (
              <Button onClick={signOut} variant="outline" size="sm" className="glass border-border/20 ml-2">{t.logout}</Button>
            ) : (
              <Button onClick={() => navigate("/auth")} size="sm" className="bg-gradient-to-r from-primary to-accent ml-2">{t.login}</Button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg glass">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.home}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.about}</Link>
            <Link to="/health-guide" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.healthGuide}</Link>
            <Link to="/pharmacies" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.pharmacies}</Link>
            <Link to="/track-records" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.trackRecords}</Link>
            <Link to="/image-analysis" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.imageAnalysis}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.contact}</Link>
            {user && (
              <>
                <Link to="/upcoming-features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.upcomingFeatures}</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.profile}</Link>
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">{t.chat}</Link>
              </>
            )}
            <div className="px-2 py-2 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass border-border/20 hover:bg-accent/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <LanguageSwitcher language={language} onLanguageChange={(lang) => setLanguage(lang as any)} />
            </div>
            {user ? (
              <Button onClick={signOut} variant="outline" className="w-full glass border-border/20">{t.logout}</Button>
            ) : (
              <Button onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }} className="w-full bg-gradient-to-r from-primary to-accent">{t.login}</Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
