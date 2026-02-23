import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import whatsappQR from "@/assets/whatsapp-qr.png";

interface Message {
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Allow demo mode - don't redirect immediately
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     navigate("/auth");
  //   }
  // }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!user) {
        // Demo mode - show welcome message
        setMessages([
          {
            text: language === 'en' 
              ? "Hello! I'm MediAgent, your AI health assistant. You're using demo mode. Describe your symptoms and I'll help you understand what might be going on. Sign up to save your chat history!"
              : language === 'hi'
              ? "नमस्ते! मैं MediAgent हूं, आपका AI स्वास्थ्य सहायक। आप डेमो मोड उपयोग कर रहे हैं। अपने लक्षण बताएं और मैं आपको समझने में मदद करूंगा।"
              : language === 'mr'
              ? "नमस्कार! मी MediAgent आहे, तुमचा AI आरोग्य सहाय्यक। तुम्ही डेमो मोड वापरत आहात। तुमची लक्षणे सांगा आणि मी समजून घेण्यास मदत करेन।"
              : "¡Hola! Soy MediAgent, tu asistente de salud AI. Estás usando el modo demo. Describe tus síntomas y te ayudaré.",
            isUser: false,
          },
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading chat history:', error);
        return;
      }

      if (data && data.length > 0) {
        const formattedMessages: Message[] = data.flatMap(chat => [
          { text: chat.message, isUser: true },
          { text: chat.response, isUser: false }
        ]);
        setMessages(formattedMessages);
      } else {
        setMessages([
          {
            text: language === 'en' 
              ? "Hello! I'm MediAgent, your AI health assistant. Describe your symptoms and I'll help you understand what might be going on."
              : language === 'hi'
              ? "नमस्ते! मैं MediAgent हूं, आपका AI स्वास्थ्य सहायक। अपने लक्षण बताएं और मैं आपको समझने में मदद करूंगा।"
              : language === 'mr'
              ? "नमस्कार! मी MediAgent आहे, तुमचा AI आरोग्य सहाय्यक। तुमची लक्षणे सांगा आणि मी समजून घेण्यास मदत करेन।"
              : "¡Hola! Soy MediAgent, tu asistente de salud AI. Describe tus síntomas y te ayudaré.",
            isUser: false,
          },
        ]);
      }
    };

    loadChatHistory();
  }, [user, language]);

  const handleSendMessage = async (message: string) => {
    // Allow sending in demo mode

    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('medical-chat', {
        body: { 
          message, 
          language,
          history: messages.slice(-6)
        }
      });

      if (error) throw error;

      const aiResponse = data.response;
      const severity = data.severity;

      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);

      // Save to database (only if logged in)
      if (user) {
        await supabase.from('chat_history').insert({
          user_id: user.id,
          message,
          response: aiResponse,
          language,
          severity_level: severity
        });
      }

      // Show emergency alert if needed
      if (severity === 'emergency') {
        toast({
          title: "⚠️ Emergency Alert",
          description: "Please seek immediate medical attention!",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {!user && (
          <div className="glass rounded-2xl p-6 mb-4">
            <h3 className="font-bold mb-2">💬 Demo Mode</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You're chatting without an account. Sign up to save your history and access advanced features!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="text-sm bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-lg font-medium hover:opacity-90"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        
        <div className="glass rounded-2xl p-6 mb-4">
          <h3 className="text-lg font-bold mb-3 text-primary">
            🩺 About Our AI Medical Assistant
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our AI is trained on authoritative medical data from <strong className="text-foreground">Drugs.com</strong>, <strong className="text-foreground">NHS.uk</strong>, and <strong className="text-foreground">WHO</strong>. We've analyzed thousands of doctor-approved prescriptions to provide you with accurate health insights for basic medical conditions. This is tested, reliable data you can trust.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {/* Web Chat Option */}
            <div className="glass rounded-xl p-4 border border-primary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Chat via Web
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Access our full-featured AI chatbot directly in your browser
              </p>
              <a
                href="https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/11/05/13/20251105134750-K99NV8X6.json"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Open AI Medic Chatbot
                </Button>
              </a>
            </div>

            {/* WhatsApp Option */}
            <div className="glass rounded-xl p-4 border border-accent/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Chat via WhatsApp
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Connect with our AI assistant on WhatsApp
              </p>
              <div className="space-y-3">
                <img 
                  src={whatsappQR} 
                  alt="WhatsApp QR Code" 
                  className="w-32 h-32 mx-auto rounded-lg"
                />
                <div className="text-xs space-y-2">
                  <p><strong>Step 1:</strong> Scan QR or <a href="https://api.whatsapp.com/send?phone=15817019840&text=MLBDH2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open WhatsApp</a></p>
                  <p><strong>Step 2:</strong> Send code: <code className="bg-muted px-2 py-1 rounded">MLBDH2</code></p>
                  <p><strong>Step 3:</strong> Type "Hi" to start!</p>
                </div>
              </div>
            </div>

            {/* Telegram Option */}
            <div className="glass rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                Chat via Telegram
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Chat with our AI medical bot on Telegram
              </p>
              <div className="space-y-3">
                <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <div className="text-center">
                    <span className="text-3xl">✈️</span>
                    <p className="text-xs text-blue-400 mt-1 font-semibold">Telegram</p>
                  </div>
                </div>
                <a
                  href="https://t.me/AIxmedicbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90">
                    Open in Telegram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

          <div className="glass rounded-2xl p-6 mb-4 border-2 border-muted">
          <h3 className="text-lg font-bold mb-3">
            💬 {language === 'en' ? 'In-App General Chatbot' : language === 'hi' ? 'इन-ऐप सामान्य चैटबॉट' : language === 'mr' ? 'इन-अॅप सामान्य चॅटबॉट' : 'Chatbot General en la Aplicación'}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {language === 'en' 
              ? "This is a general chatbot that can help you in any language with various topics."
              : language === 'hi'
              ? "यह एक सामान्य चैटबॉट है जो विभिन्न विषयों पर किसी भी भाषा में आपकी मदद कर सकता है।"
              : language === 'mr'
              ? "हा एक सामान्य चॅटबॉट आहे जो कोणत्याही भाषेत विविध विषयांवर तुम्हाला मदत करू शकतो।"
              : "Este es un chatbot general que puede ayudarte en cualquier idioma con varios temas."}
          </p>
          <p className="text-sm text-primary font-semibold">
            {language === 'en'
              ? "⚠️ For health-related queries or prescriptions, please use the AI Medical Assistant chatbots mentioned above (WhatsApp or Web)."
              : language === 'hi'
              ? "⚠️ स्वास्थ्य संबंधी प्रश्नों या नुस्खों के लिए, कृपया ऊपर उल्लिखित AI मेडिकल असिस्टेंट चैटबॉट (WhatsApp या वेब) का उपयोग करें।"
              : language === 'mr'
              ? "⚠️ आरोग्य संबंधित प्रश्न किंवा प्रिस्क्रिप्शनसाठी, कृपया वर नमूद केलेले AI मेडिकल असिस्टंट चॅटबॉट (WhatsApp किंवा वेब) वापरा।"
              : "⚠️ Para consultas relacionadas con la salud o recetas, use los chatbots del Asistente Médico de IA mencionados arriba (WhatsApp o Web)."}
          </p>
        </div>

        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
      </div>

      <div className="sticky bottom-0 border-t glass p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} language={language} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
