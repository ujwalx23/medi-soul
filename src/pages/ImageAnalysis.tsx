import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Image as ImageIcon, Loader2, X, Scan, FileText, Eye, Pill, Stethoscope } from "lucide-react";

const translations = {
  en: {
    title: "AI Medical Image Analysis",
    subtitle: "Upload a photo of your prescription, X-ray, skin condition, rash, medicine, or any visible symptom — our AI will explain it in simple words.",
    uploadArea: "Tap or click to upload an image",
    uploadFormats: "Supports JPG, PNG, WEBP (max 10MB)",
    analyzing: "Analyzing your image...",
    analyzeBtn: "Analyze Image",
    clearBtn: "Clear",
    resultTitle: "AI Analysis Result",
    disclaimer: "⚠️ This analysis is for informational purposes only. Always consult a qualified doctor for medical decisions.",
    examples: "What can I analyze?",
    ex1: "Doctor prescriptions",
    ex2: "X-rays & scans",
    ex3: "Skin rashes & conditions",
    ex4: "Medicine packages",
    ex5: "Visible symptoms",
    selectImage: "Please select an image first.",
    errorMsg: "Failed to analyze image. Please try again.",
  },
  hi: {
    title: "AI मेडिकल इमेज विश्लेषण",
    subtitle: "अपनी प्रिस्क्रिप्शन, X-रे, त्वचा की स्थिति, दाने, दवाई या कोई भी दृश्य लक्षण की फोटो अपलोड करें — हमारा AI इसे सरल शब्दों में समझाएगा।",
    uploadArea: "छवि अपलोड करने के लिए टैप करें या क्लिक करें",
    uploadFormats: "JPG, PNG, WEBP समर्थित (अधिकतम 10MB)",
    analyzing: "आपकी छवि का विश्लेषण हो रहा है...",
    analyzeBtn: "छवि विश्लेषण करें",
    clearBtn: "साफ करें",
    resultTitle: "AI विश्लेषण परिणाम",
    disclaimer: "⚠️ यह विश्लेषण केवल सूचनात्मक उद्देश्यों के लिए है। चिकित्सा निर्णयों के लिए हमेशा एक योग्य डॉक्टर से परामर्श करें।",
    examples: "मैं क्या विश्लेषण कर सकता हूं?",
    ex1: "डॉक्टर की प्रिस्क्रिप्शन",
    ex2: "X-रे और स्कैन",
    ex3: "त्वचा पर दाने और स्थितियां",
    ex4: "दवाई के पैकेज",
    ex5: "दृश्य लक्षण",
    selectImage: "कृपया पहले एक छवि चुनें।",
    errorMsg: "छवि विश्लेषण विफल। कृपया पुनः प्रयास करें।",
  },
  mr: {
    title: "AI वैद्यकीय प्रतिमा विश्लेषण",
    subtitle: "तुमची प्रिस्क्रिप्शन, X-रे, त्वचेची स्थिती, पुरळ, औषध किंवा कोणतेही दृश्यमान लक्षण यांचा फोटो अपलोड करा — आमचा AI सोप्या शब्दांत समजावेल।",
    uploadArea: "प्रतिमा अपलोड करण्यासाठी टॅप करा किंवा क्लिक करा",
    uploadFormats: "JPG, PNG, WEBP समर्थित (जास्तीत जास्त 10MB)",
    analyzing: "तुमच्या प्रतिमेचे विश्लेषण होत आहे...",
    analyzeBtn: "प्रतिमा विश्लेषण करा",
    clearBtn: "साफ करा",
    resultTitle: "AI विश्लेषण निकाल",
    disclaimer: "⚠️ हे विश्लेषण केवळ माहितीच्या उद्देशाने आहे. वैद्यकीय निर्णयांसाठी नेहमी पात्र डॉक्टरांशी सल्लामसलत करा.",
    examples: "मी काय विश्लेषण करू शकतो?",
    ex1: "डॉक्टरच्या प्रिस्क्रिप्शन",
    ex2: "X-रे आणि स्कॅन",
    ex3: "त्वचेवरील पुरळ आणि स्थिती",
    ex4: "औषध पॅकेजेस",
    ex5: "दृश्यमान लक्षणे",
    selectImage: "कृपया प्रथम एक प्रतिमा निवडा.",
    errorMsg: "प्रतिमा विश्लेषण अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
  },
  es: {
    title: "Análisis de Imagen Médica con IA",
    subtitle: "Sube una foto de tu receta, rayos X, condición de piel, erupción, medicina o cualquier síntoma visible — nuestra IA lo explicará en palabras simples.",
    uploadArea: "Toca o haz clic para subir una imagen",
    uploadFormats: "Soporta JPG, PNG, WEBP (máx 10MB)",
    analyzing: "Analizando tu imagen...",
    analyzeBtn: "Analizar Imagen",
    clearBtn: "Limpiar",
    resultTitle: "Resultado del Análisis IA",
    disclaimer: "⚠️ Este análisis es solo para fines informativos. Siempre consulta a un médico calificado para decisiones médicas.",
    examples: "¿Qué puedo analizar?",
    ex1: "Recetas médicas",
    ex2: "Rayos X y escaneos",
    ex3: "Erupciones y condiciones de piel",
    ex4: "Envases de medicamentos",
    ex5: "Síntomas visibles",
    selectImage: "Por favor selecciona una imagen primero.",
    errorMsg: "Error al analizar imagen. Por favor intenta de nuevo.",
  },
};

const ImageAnalysis = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = translations[language as keyof typeof translations] || translations.en;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"general" | "prescription" | "medicine">("general");
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("image_analysis_history" as any).select("*").order("created_at", { ascending: false }).limit(10);
    setHistory((data as any) || []);
  };
  useState(() => { loadHistory(); });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select an image under 10MB.", variant: "destructive" });
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setAnalysisResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const fakeEvent = { target: { files: [file] } } as any;
    handleFileSelect(fakeEvent);
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedFile) {
      toast({ title: "No image", description: t.selectImage, variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      // Convert to base64
      const base64 = selectedImage.split(",")[1];
      const mimeType = selectedFile.type || "image/jpeg";

      const langName = language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : language === 'es' ? 'Spanish' : 'English';

      const prescriptionPrompt = `You are an expert medical AI specializing in reading doctor's prescriptions, including handwritten ones. Carefully OCR and analyze the prescription image. Reply ONLY in ${langName}.

Structure your response in clean markdown with these sections:

**👨‍⚕️ Doctor / Clinic** (if visible)
**📅 Date** (if visible)
**🧑 Patient Info** (name/age if visible)

**💊 Medicines Prescribed**
For EACH medicine, list:
- **Name** (read carefully, even if handwritten — e.g. "Paracetamol 500mg")
- **Dosage**: how much (e.g. 1 tablet)
- **Frequency**: how often (e.g. 3 times a day, decode 1-0-1, BD, TDS, QID, SOS, HS)
- **Duration**: how many days
- **When to take**: before/after food, morning/night
- **Purpose** in simple words (e.g. "for fever and pain")

**🧪 Tests Advised** (if any)
**📝 Doctor's Instructions / Advice**
**⚠️ Precautions & Side Effects to Watch**
**🔁 Follow-up** (if mentioned)

If something is unclear or unreadable, say "Unclear — please confirm with your doctor or pharmacist." Never invent medicine names. End with: "⚠️ Always verify with your pharmacist before taking any medicine."`;

      const generalPrompt = `You are an AI medical assistant. Analyze the provided image and explain it in simple, easy-to-understand ${langName}. If it's an X-ray or scan, explain what is visible. If it's a skin condition, suggest possible causes. Always recommend consulting a doctor. Be compassionate and clear. Keep response under 300 words.`;

      const medicinePrompt = `You are an expert pharmacist AI. The user uploaded a photo of a medicine package, strip, bottle, or label. Reply ONLY in ${langName}. Carefully read the packaging (OCR) and provide:

**💊 Medicine Name & Brand**
**🧪 Active Ingredients / Composition** (each ingredient with strength)
**🎯 What It Treats** (uses in simple words)
**📋 How to Take**
- Adult dosage
- Frequency (how many times a day)
- Before / after food
- With water / how to swallow
**⏰ When to Take** (morning/night/specific times)
**⚠️ Side Effects to Watch**
**🚫 Who Should NOT Take It** (contraindications)
**🔄 Drug Interactions** (common ones)
**💾 Storage** (temperature, away from children, etc.)
**📅 Expiry / Batch** (if visible)

End with: "⚠️ Always confirm dosage with your doctor or pharmacist before taking any medicine. Do not exceed the recommended dose."`;

      const finalPrompt = mode === "prescription" ? prescriptionPrompt : mode === "medicine" ? medicinePrompt : generalPrompt;

      // Use edge function for image analysis
      const { data, error } = await supabase.functions.invoke('analyze-medical-image', {
        body: {
          image: base64,
          mimeType,
          language,
          systemPrompt: finalPrompt,
        },
      });

      if (error) throw error;
      setAnalysisResult(data.analysis);

      // Save to history if logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("image_analysis_history" as any).insert({
          user_id: user.id,
          mode,
          image_preview: selectedImage.length < 200000 ? selectedImage : null,
          analysis: data.analysis,
          language,
        });
        loadHistory();
      }
    } catch (err: any) {
      console.error("Image analysis error:", err);
      toast({ title: "Error", description: t.errorMsg, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const exampleItems = [
    { icon: FileText, label: t.ex1 },
    { icon: Scan, label: t.ex2 },
    { icon: Eye, label: t.ex3 },
    { icon: Pill, label: t.ex4 },
    { icon: ImageIcon, label: t.ex5 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">{t.subtitle}</p>
        </div>

        {/* Mode toggle */}
        <div className="glass rounded-2xl p-2 mb-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode("general")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === "general" ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" : "hover:bg-muted/50"}`}
          >
            <ImageIcon className="h-4 w-4" /> General
          </button>
          <button
            onClick={() => setMode("prescription")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === "prescription" ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" : "hover:bg-muted/50"}`}
          >
            <Stethoscope className="h-4 w-4" /> Prescription
          </button>
          <button
            onClick={() => setMode("medicine")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === "medicine" ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" : "hover:bg-muted/50"}`}
          >
            <Pill className="h-4 w-4" /> Medicine
          </button>
        </div>

        {/* Examples */}
        <div className="glass rounded-2xl p-4 mb-6">
          <p className="text-sm font-semibold mb-3 text-primary">{t.examples}</p>
          <div className="flex flex-wrap gap-2">
            {exampleItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 text-xs">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className="glass rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer mb-6"
          onClick={() => !selectedImage && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {selectedImage ? (
            <div className="p-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected medical image"
                  className="w-full max-h-80 object-contain rounded-xl"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleClear(); }}
                  className="absolute top-2 right-2 bg-background/80 rounded-full p-1.5 hover:bg-destructive/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium mb-1">{t.uploadArea}</p>
              <p className="text-xs text-muted-foreground">{t.uploadFormats}</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          {!selectedImage ? (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-gradient-to-r from-primary to-accent"
            >
              <Upload className="h-4 w-4 mr-2" />
              {t.uploadArea}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" />
                    {t.analyzeBtn}
                  </>
                )}
              </Button>
              <Button onClick={handleClear} variant="outline" className="glass border-white/20">
                <X className="h-4 w-4 mr-2" />
                {t.clearBtn}
              </Button>
            </>
          )}
        </div>

        {/* Analysis Result */}
        {analysisResult && (
          <div className="glass rounded-2xl p-6 mb-6 border border-primary/20">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
              <Scan className="h-5 w-5" />
              {t.resultTitle}
            </h2>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {analysisResult}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="glass rounded-xl p-4 text-xs text-muted-foreground text-center border border-yellow-500/20">
          {t.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
