import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSpeech } from "@/hooks/useSpeech";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  TrendingUp,
  TrendingDown,
  Leaf,
  Bug,
  MessageCircle,
  Camera,
  Users,
  Mic,
  Bell,
  Settings,
  MapPin,
  Calendar
} from "lucide-react";
import cropsHero from "@/assets/crops-hero.jpg";

interface DashboardProps {
  onNavigate: (screen: string) => void;
  userLanguage: string;
}

export default function Dashboard({ onNavigate, userLanguage }: DashboardProps) {
  const [currentTime] = useState(new Date());
  const { speak } = useSpeech();

  // Auto-narrate dashboard on load
  useEffect(() => {
    const welcomeMsg = userLanguage === 'hi' ? 
      "डैशबोर्ड में आपका स्वागत है। आज का मौसम आंशिक बादल छाए हुए हैं और तापमान 28 डिग्री है। फसल की सलाह उपलब्ध है।" : 
      "Welcome to your dashboard. Today's weather is partly cloudy with 28 degrees temperature. Crop advisory is available.";
    
    setTimeout(() => speak(welcomeMsg, { lang: userLanguage === 'hi' ? 'hi-IN' : 'en-US' }), 1000);
  }, [userLanguage, speak]);

  const weatherData = {
    current: {
      temp: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: 12,
      icon: Cloud
    },
    forecast: [
      { day: "Today", temp: "28°", condition: "Cloudy", icon: Cloud, rain: 20 },
      { day: "Tomorrow", temp: "30°", condition: "Sunny", icon: Sun, rain: 0 },
      { day: "Thu", temp: "26°", condition: "Rainy", icon: CloudRain, rain: 80 },
      { day: "Fri", temp: "24°", condition: "Heavy Rain", icon: CloudRain, rain: 90 },
    ]
  };

  const marketPrices = [
    { crop: "Wheat", price: "₹2,180", change: "+2.3%", trend: "up" },
    { crop: "Rice", price: "₹3,450", change: "-1.2%", trend: "down" },
    { crop: "Cotton", price: "₹6,200", change: "+5.1%", trend: "up" },
    { crop: "Sugarcane", price: "₹350", change: "+0.8%", trend: "up" },
  ];

  const todayAdvice = {
    title: "Perfect Day for Irrigation",
    content: "Weather conditions are ideal for watering your crops. Light winds and moderate humidity will help water absorption.",
    priority: "high",
    action: "Water crops before 10 AM"
  };

  const quickActions = [
    { icon: MessageCircle, label: "AI Assistant", screen: "chat", color: "bg-primary" },
    { icon: Camera, label: "Pest Detection", screen: "pest-detection", color: "bg-warning" },
    { icon: Users, label: "Community", screen: "community", color: "bg-success" },
    { icon: Calendar, label: "Farm Calendar", screen: "calendar", color: "bg-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="farmer-heading">Good Morning! 🌅</h1>
            <p className="farmer-text-lg opacity-90">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground">
              <Bell className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground">
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-primary-foreground/80">
          <MapPin className="w-4 h-4" />
          <span className="farmer-text-lg">Pune, Maharashtra</span>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Today's Advisory */}
        <Card className="farmer-card hover-float">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="farmer-text-xl text-primary flex items-center">
                <Leaf className="w-6 h-6 mr-2 text-success" />
                Today's Crop Advisory
              </CardTitle>
              <Badge variant="destructive" className="farmer-text-lg">
                High Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="farmer-text-xl font-semibold mb-2">{todayAdvice.title}</h3>
            <p className="farmer-text-lg text-muted-foreground mb-4">{todayAdvice.content}</p>
            <div className="flex items-center justify-between">
              <span className="farmer-text-lg font-medium text-success">
                Action: {todayAdvice.action}
              </span>
              <Button variant="outline" onClick={() => onNavigate('advisory-details')}>
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="farmer-card hover-float" onClick={() => {
          const weatherMsg = userLanguage === 'hi' ? 
            `मौसम का पूरा विवरण: आज तापमान ${weatherData.current.temp} डिग्री है, आंशिक बदली है।` : 
            `Weather details: Today's temperature is ${weatherData.current.temp} degrees with ${weatherData.current.condition.toLowerCase()}.`;
          speak(weatherMsg, { lang: userLanguage === 'hi' ? 'hi-IN' : 'en-US' });
          onNavigate('weather');
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="farmer-text-xl text-primary flex items-center">
              <weatherData.current.icon className="w-6 h-6 mr-2" />
              Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{weatherData.current.temp}°C</div>
                  <p className="farmer-text-lg text-muted-foreground">{weatherData.current.condition}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Droplets className="w-4 h-4 mr-1" />
                  <span className="farmer-text-lg">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Wind className="w-4 h-4 mr-1" />
                  <span className="farmer-text-lg">{weatherData.current.wind} km/h</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-sm font-medium">{day.day}</p>
                  <day.icon className="w-6 h-6 mx-auto my-1 text-primary" />
                  <p className="text-sm font-bold">{day.temp}</p>
                  <p className="text-xs text-blue-600">{day.rain}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card className="farmer-card hover-float" onClick={() => onNavigate('market-prices')}>
          <CardHeader className="pb-3">
            <CardTitle className="farmer-text-xl text-primary flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="farmer-text-lg font-medium">{item.crop}</span>
                  <div className="flex items-center space-x-2">
                    <span className="farmer-text-lg font-bold">{item.price}</span>
                    <div className={`flex items-center space-x-1 ${
                      item.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {item.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                      <span className="text-sm">{item.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Soil Health Status */}
        <Card className="farmer-card hover-float" onClick={() => onNavigate('soil-health')}>
          <CardHeader className="pb-3">
            <CardTitle className="farmer-text-xl text-primary flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              Soil Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-success">Good</div>
                <p className="farmer-text-lg text-muted-foreground">pH: 6.8 | Nutrients: Balanced</p>
              </div>
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🌱</span>
              </div>
            </div>
            <p className="farmer-text-lg text-muted-foreground">
              Last tested: 15 days ago. Next test recommended in 20 days.
            </p>
          </CardContent>
        </Card>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden">
          <img 
            src={cropsHero} 
            alt="Healthy Crops" 
            className="w-full h-48 object-cover crop-illustration"
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="farmer-card hover-float cursor-pointer hover-3d"
              onClick={() => onNavigate(action.screen)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <p className="farmer-text-lg font-medium">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Voice Assistant Button */}
      <button 
        className="floating-mic"
        onClick={() => onNavigate('voice-assistant')}
      >
        <Mic className="w-8 h-8" />
      </button>
    </div>
  );
}