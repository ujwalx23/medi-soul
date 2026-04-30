import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pill, Calendar, Trash2, Upload, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MedicineRecord {
  id: string;
  medicine_name: string;
  dosage: string;
  date_taken: string;
  notes: string;
  image_url?: string;
  created_at: string;
}

const TrackRecords = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [records, setRecords] = useState<MedicineRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicine_name: "",
    dosage: "",
    date_taken: new Date().toISOString().split('T')[0],
    notes: ""
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadRecords();
    }
  }, [user]);

  const loadRecords = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('medicine_records')
      .select('*')
      .eq('user_id', user.id)
      .order('date_taken', { ascending: false });

    if (error) {
      console.error('Error loading records:', error);
      return;
    }

    if (data) {
      setRecords(data);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    let imageUrl = null;

    // Upload image if selected
    if (selectedImage) {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('medicine_images')
        .upload(fileName, selectedImage);

      if (uploadError) {
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('medicine_images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }

    const { error } = await supabase
      .from('medicine_records')
      .insert({
        user_id: user.id,
        ...formData,
        image_url: imageUrl
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save record. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Medicine record saved successfully!",
    });

    setFormData({
      medicine_name: "",
      dosage: "",
      date_taken: new Date().toISOString().split('T')[0],
      notes: ""
    });
    setSelectedImage(null);
    setImagePreview(null);
    setShowForm(false);
    loadRecords();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('medicine_records')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete record.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deleted",
      description: "Record deleted successfully.",
    });
    loadRecords();
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Medicine Tracker
              </h1>
              <p className="text-muted-foreground mt-2">
                Keep track of your medications and their effectiveness
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Record
            </Button>
          </div>

          {showForm && (
            <Card className="glass p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">New Medicine Record</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Pill className="h-4 w-4 inline mr-2" />
                    Medicine Name
                  </label>
                  <Input
                    value={formData.medicine_name}
                    onChange={(e) => setFormData({...formData, medicine_name: e.target.value})}
                    placeholder="e.g., Aspirin, Paracetamol"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Dosage</label>
                  <Input
                    value={formData.dosage}
                    onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                    placeholder="e.g., 500mg twice daily"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Date Taken
                  </label>
                  <Input
                    type="date"
                    value={formData.date_taken}
                    onChange={(e) => setFormData({...formData, date_taken: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="How did it work? Any side effects?"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Upload className="h-4 w-4 inline mr-2" />
                    Upload Image (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="flex-1"
                    />
                    {imagePreview && (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                    Save Record
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-4">
            {records.length === 0 ? (
              <Card className="glass p-8 text-center">
                <Pill className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No medicine records yet. Start tracking by adding your first record!
                </p>
              </Card>
            ) : (
              records.map((record) => (
                <Card key={record.id} className="glass p-6 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {record.medicine_name}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><strong>Dosage:</strong> {record.dosage}</p>
                        <p><strong>Date:</strong> {new Date(record.date_taken).toLocaleDateString()}</p>
                        {record.notes && (
                          <p className="mt-2"><strong>Notes:</strong> {record.notes}</p>
                        )}
                      </div>
                      {record.image_url && (
                        <div className="mt-3">
                          <img 
                            src={record.image_url} 
                            alt={record.medicine_name}
                            className="w-32 h-32 object-cover rounded-lg border border-border"
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(record.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackRecords;
