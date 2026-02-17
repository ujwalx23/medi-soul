import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"chats" | "records" | "appointments">("chats");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      // Load chat history
      const { data: chats } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (chats) setChatHistory(chats);

      // Load medical records
      const { data: records } = await supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (records) setMedicalRecords(records);

      // Load appointments
      const { data: appts } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (appts) setAppointments(appts);
    };

    loadHistory();
  }, [user]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <div className="flex glass rounded-full p-1 mb-6">
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex-1 py-2 px-4 rounded-full transition-all ${
                activeTab === "chats" ? "bg-gradient-to-r from-primary to-accent text-white" : "text-muted-foreground"
              }`}
            >
              Chat History
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`flex-1 py-2 px-4 rounded-full transition-all ${
                activeTab === "records" ? "bg-gradient-to-r from-primary to-accent text-white" : "text-muted-foreground"
              }`}
            >
              Records
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 py-2 px-4 rounded-full transition-all ${
                activeTab === "appointments" ? "bg-gradient-to-r from-primary to-accent text-white" : "text-muted-foreground"
              }`}
            >
              Appointments
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === "chats" && (
              <>
                {chatHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No chat history yet</p>
                ) : (
                  chatHistory.map((chat) => (
                    <div key={chat.id} className="glass rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm text-primary">You:</p>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(chat.created_at), "MMM dd, yyyy HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{chat.message}</p>
                      <div className="border-t border-white/10 pt-3">
                        <p className="font-medium text-sm text-secondary mb-1">MediAgent:</p>
                        <p className="text-sm text-muted-foreground">{chat.response}</p>
                      </div>
                      {chat.severity_level && (
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            chat.severity_level === 'emergency' ? 'bg-red-500/20 text-red-400' :
                            chat.severity_level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            chat.severity_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {chat.severity_level}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "records" && (
              <>
                {medicalRecords.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No medical records yet</p>
                ) : (
                  medicalRecords.map((record) => (
                    <div key={record.id} className="glass rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-primary">{record.diagnosis}</h3>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(record.created_at), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{record.symptoms}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          record.severity === 'emergency' ? 'bg-red-500/20 text-red-400' :
                          record.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {record.severity}
                        </span>
                        {record.recommended_specialist && (
                          <span className="text-accent">→ {record.recommended_specialist}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "appointments" && (
              <>
                {appointments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No appointments yet</p>
                ) : (
                  appointments.map((appt) => (
                    <div key={appt.id} className="glass rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-primary mb-1">{appt.specialist_type}</h3>
                          <p className="text-sm text-muted-foreground">{appt.symptoms}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appt.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                          appt.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                      {appt.preferred_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(appt.preferred_date), "PPP")}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;