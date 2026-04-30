import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Watch, Smartphone, Heart, Activity, TrendingUp, Clock } from "lucide-react";

const HealthMonitoring = () => {
  const features = [
    {
      icon: Watch,
      title: "Smartwatch Integration",
      description: "Connect your Apple Watch, Samsung Galaxy Watch, Fitbit, or other advanced smartwatches",
      metrics: ["Heart Rate", "Blood Oxygen", "ECG", "Sleep Patterns"]
    },
    {
      icon: Smartphone,
      title: "Mobile Health Apps",
      description: "Sync data from Apple Health, Google Fit, and other health tracking applications",
      metrics: ["Steps", "Calories", "Active Minutes", "Weight"]
    },
    {
      icon: Heart,
      title: "Vital Signs Monitoring",
      description: "Real-time tracking of essential health metrics with AI-powered insights",
      metrics: ["Blood Pressure", "Heart Rate Variability", "Respiratory Rate", "Temperature"]
    },
    {
      icon: TrendingUp,
      title: "Health Trends & Analytics",
      description: "Visualize your health data over time with detailed reports and predictions",
      metrics: ["Weekly Reports", "Monthly Insights", "Trend Analysis", "Anomaly Detection"]
    }
  ];

  const compatibleDevices = [
    "Apple Watch Series 4+",
    "Samsung Galaxy Watch 4+",
    "Fitbit Sense / Versa 3+",
    "Garmin Venu 2+",
    "Amazfit GTR / GTS Series",
    "Google Pixel Watch",
    "Huawei Watch GT Series",
    "Withings ScanWatch"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20">
            Coming Soon
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Health Monitoring
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect your smartwatch and health devices to get comprehensive health insights powered by AI
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="glass p-6 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compatible Devices */}
        <Card className="glass p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Compatible Devices</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Our platform will support a wide range of popular smartwatches and health monitoring devices:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {compatibleDevices.map((device, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Activity className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{device}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* How It Works */}
        <Card className="glass p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Will Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold">Connect Your Device</h3>
              <p className="text-sm text-muted-foreground">
                Securely link your smartwatch or health app to Medi Soul
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold">Sync Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Automatically sync health metrics in real-time
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold">Get AI Insights</h3>
              <p className="text-sm text-muted-foreground">
                Receive personalized health recommendations and alerts
              </p>
            </div>
          </div>
        </Card>

        {/* Coming Soon Notice */}
        <div className="text-center mt-12 p-6 glass rounded-lg">
          <p className="text-lg text-muted-foreground">
            🚀 We're working hard to bring you this amazing feature. Stay tuned for updates!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HealthMonitoring;
