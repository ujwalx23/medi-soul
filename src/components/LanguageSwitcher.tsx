import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

interface LanguageSwitcherProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSwitcher = ({ language, onLanguageChange }: LanguageSwitcherProps) => {
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-border/20 text-foreground hover:bg-accent/10">
          <Globe className="h-4 w-4 mr-2" />
          <span className="mr-1">{currentLang.flag}</span>
          {currentLang.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass border-border/20 bg-card/80">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className="cursor-pointer hover:bg-accent/10"
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
