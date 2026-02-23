import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Bell, Globe, Moon, Shield, Volume2, Sun } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mb-8">
            Customize your Medi Soul experience
          </p>

          <div className="space-y-6">
            {/* Language Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Language & Region</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language" className="mb-2 block">Preferred Language</Label>
                  <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="es">Español (Spanish)</SelectItem>
                      <SelectItem value="ur">اردو (Urdu)</SelectItem>
                      <SelectItem value="fr">Français (French)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="cursor-pointer">Enable Notifications</Label>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <p className="text-sm text-muted-foreground">Receive alerts for health reminders and important updates</p>
              </div>
            </div>

            {/* Sound Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Volume2 className="h-6 w-6 text-secondary" />
                <h2 className="text-xl font-bold">Sound</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound" className="cursor-pointer">Sound Effects</Label>
                  <Switch id="sound" checked={soundEffects} onCheckedChange={setSoundEffects} />
                </div>
                <p className="text-sm text-muted-foreground">Play sounds for messages and notifications</p>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                {theme === "dark" ? <Moon className="h-6 w-6 text-primary" /> : <Sun className="h-6 w-6 text-primary" />}
                <h2 className="text-xl font-bold">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkmode" className="cursor-pointer">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </Label>
                  <Switch 
                    id="darkmode"
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-bold">Privacy & Security</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Your health data is encrypted and stored securely</p>
                <p>• We never share your information without consent</p>
                <p>• You can delete your account and data at any time</p>
                <Button variant="outline" className="mt-4">Privacy Policy</Button>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-accent" size="lg">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
