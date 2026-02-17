import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Pharmacy {
  name: string;
  address: string;
  distance?: string;
  phone?: string;
  hours?: string;
  latitude?: number;
  longitude?: number;
}

const Pharmacies = () => {
  const { language } = useLanguage();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const translations = {
    en: {
      title: "Find Nearby Pharmacies",
      subtitle: "Locate pharmacies near your location",
      getLocation: "Get My Location",
      loading: "Finding pharmacies...",
      noLocation: "Location not available",
      noPharmacies: "No pharmacies found nearby",
      distance: "Distance",
      hours: "Hours",
      phone: "Phone",
      directions: "Get Directions",
    },
    hi: {
      title: "नजदीकी फार्मेसी खोजें",
      subtitle: "अपने स्थान के पास फार्मेसी खोजें",
      getLocation: "मेरा स्थान प्राप्त करें",
      loading: "फार्मेसी खोज रहे हैं...",
      noLocation: "स्थान उपलब्ध नहीं है",
      noPharmacies: "आस-पास कोई फार्मेसी नहीं मिली",
      distance: "दूरी",
      hours: "समय",
      phone: "फोन",
      directions: "दिशा प्राप्त करें",
    },
    mr: {
      title: "जवळपासची फार्मसी शोधा",
      subtitle: "तुमच्या स्थानाजवळ फार्मसी शोधा",
      getLocation: "माझे स्थान मिळवा",
      loading: "फार्मसी शोधत आहे...",
      noLocation: "स्थान उपलब्ध नाही",
      noPharmacies: "जवळपास फार्मसी आढळली नाही",
      distance: "अंतर",
      hours: "वेळ",
      phone: "फोन",
      directions: "दिशा मिळवा",
    },
    es: {
      title: "Encontrar Farmacias Cercanas",
      subtitle: "Localiza farmacias cerca de tu ubicación",
      getLocation: "Obtener Mi Ubicación",
      loading: "Buscando farmacias...",
      noLocation: "Ubicación no disponible",
      noPharmacies: "No se encontraron farmacias cercanas",
      distance: "Distancia",
      hours: "Horario",
      phone: "Teléfono",
      directions: "Obtener Direcciones",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const getLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
          findNearbyPharmacies(coords);
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const findNearbyPharmacies = async (coords: { lat: number; lng: number }) => {
    // Mock data for demonstration - In production, integrate with Google Places API or similar
    const mockPharmacies: Pharmacy[] = [
      {
        name: "Apollo Pharmacy",
        address: "123 Main Street, Near City Hospital",
        distance: "0.5 km",
        phone: "+91 1234567890",
        hours: "24 Hours",
        latitude: coords.lat + 0.005,
        longitude: coords.lng + 0.005,
      },
      {
        name: "MedPlus Pharmacy",
        address: "456 Park Avenue, Opposite Mall",
        distance: "1.2 km",
        phone: "+91 0987654321",
        hours: "8 AM - 10 PM",
        latitude: coords.lat - 0.008,
        longitude: coords.lng + 0.003,
      },
      {
        name: "Wellness Forever",
        address: "789 Market Road, Ground Floor",
        distance: "1.8 km",
        phone: "+91 1122334455",
        hours: "9 AM - 9 PM",
        latitude: coords.lat + 0.01,
        longitude: coords.lng - 0.007,
      },
      {
        name: "Netmeds Pharmacy",
        address: "321 Healthcare Complex, Near Metro",
        distance: "2.3 km",
        phone: "+91 5566778899",
        hours: "24 Hours",
        latitude: coords.lat - 0.012,
        longitude: coords.lng - 0.009,
      },
    ];

    setTimeout(() => {
      setPharmacies(mockPharmacies);
      setLoading(false);
      toast({
        title: "Success",
        description: `Found ${mockPharmacies.length} pharmacies nearby`,
      });
    }, 1500);
  };

  const openDirections = (pharmacy: Pharmacy) => {
    if (pharmacy.latitude && pharmacy.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`,
        "_blank"
      );
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Get Location Button */}
          {!location && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={getLocation}
                disabled={loading}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent gap-2"
              >
                <Navigation className="h-5 w-5" />
                {loading ? t.loading : t.getLocation}
              </Button>
            </div>
          )}

          {/* Pharmacies List */}
          {pharmacies.length > 0 && (
            <div className="space-y-4">
              {pharmacies.map((pharmacy, index) => (
                <Card key={index} className="glass hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-4">
                      <span className="text-xl">{pharmacy.name}</span>
                      {pharmacy.distance && (
                        <span className="text-sm font-normal text-primary flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {pharmacy.distance}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-base">{pharmacy.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pharmacy.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-accent" />
                          <span>{pharmacy.phone}</span>
                        </div>
                      )}
                      {pharmacy.hours && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span>{pharmacy.hours}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => openDirections(pharmacy)}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t.directions}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No pharmacies message */}
          {location && pharmacies.length === 0 && !loading && (
            <Card className="glass text-center py-12">
              <CardContent>
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">{t.noPharmacies}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
