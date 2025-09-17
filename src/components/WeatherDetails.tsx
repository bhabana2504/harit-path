import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

interface WeatherDetailsProps {
  onBack: () => void;
}

export default function WeatherDetails({ onBack }: WeatherDetailsProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  const currentWeather = {
    temp: 28,
    condition: "Partly Cloudy",
    feelsLike: 32,
    humidity: 65,
    windSpeed: 12,
    windDirection: "SW",
    visibility: 10,
    pressure: 1013,
    uvIndex: 7,
    sunrise: "06:15",
    sunset: "18:45"
  };

  const forecast = [
    { 
      day: "Today", 
      date: "Mar 15",
      high: 30, 
      low: 22, 
      condition: "Partly Cloudy", 
      icon: Cloud, 
      rain: 20,
      wind: 12,
      humidity: 65,
      advice: "Good day for field work. Light irrigation recommended."
    },
    { 
      day: "Tomorrow", 
      date: "Mar 16",
      high: 32, 
      low: 24, 
      condition: "Sunny", 
      icon: Sun, 
      rain: 0,
      wind: 8,
      humidity: 55,
      advice: "Perfect conditions for harvesting. Avoid heavy watering."
    },
    { 
      day: "Thursday", 
      date: "Mar 17",
      high: 26, 
      low: 20, 
      condition: "Heavy Rain", 
      icon: CloudRain, 
      rain: 90,
      wind: 18,
      humidity: 85,
      advice: "Avoid field activities. Check drainage systems."
    },
    { 
      day: "Friday", 
      date: "Mar 18",
      high: 24, 
      low: 18, 
      condition: "Light Rain", 
      icon: CloudRain, 
      rain: 60,
      wind: 15,
      humidity: 80,
      advice: "Monitor crop moisture. Postpone spraying activities."
    },
    { 
      day: "Saturday", 
      date: "Mar 19",
      high: 27, 
      low: 19, 
      condition: "Cloudy", 
      icon: Cloud, 
      rain: 30,
      wind: 10,
      humidity: 70,
      advice: "Good conditions return. Resume normal farming activities."
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rain Alert",
      message: "Heavy rainfall expected Thursday-Friday. Secure loose farm equipment.",
      priority: "High"
    },
    {
      type: "info",
      title: "Irrigation Advisory",
      message: "Upcoming rain will provide natural irrigation. Reduce water usage.",
      priority: "Medium"
    }
  ];

  const historicalData = [
    { month: "Jan", avgTemp: 22, rainfall: 12 },
    { month: "Feb", avgTemp: 25, rainfall: 8 },
    { month: "Mar", avgTemp: 28, rainfall: 25 },
    { month: "Apr", avgTemp: 32, rainfall: 15 },
    { month: "May", avgTemp: 35, rainfall: 45 },
    { month: "Jun", avgTemp: 32, rainfall: 180 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground mr-3">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="farmer-heading">Weather Forecast</h1>
            <p className="farmer-text-lg opacity-90">Pune, Maharashtra</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">7-Day</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {/* Current Weather */}
            <Card className="farmer-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold text-primary mb-2">{currentWeather.temp}°C</div>
                    <p className="farmer-text-xl text-muted-foreground">{currentWeather.condition}</p>
                    <p className="farmer-text-lg text-muted-foreground">
                      Feels like {currentWeather.feelsLike}°C
                    </p>
                  </div>
                  <Cloud className="w-24 h-24 text-primary" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="farmer-text-lg font-medium">{currentWeather.humidity}%</p>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Wind className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="farmer-text-lg font-medium">{currentWeather.windSpeed} km/h</p>
                      <p className="text-sm text-muted-foreground">Wind {currentWeather.windDirection}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="farmer-text-lg font-medium">{currentWeather.visibility} km</p>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Gauge className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="farmer-text-lg font-medium">{currentWeather.pressure} mb</p>
                      <p className="text-sm text-muted-foreground">Pressure</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sun Times */}
            <Card className="farmer-card">
              <CardHeader>
                <CardTitle className="farmer-text-xl text-primary">Sun & UV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Sunrise className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">{currentWeather.sunrise}</p>
                      <p className="text-sm text-muted-foreground">Sunrise</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sunset className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">{currentWeather.sunset}</p>
                      <p className="text-sm text-muted-foreground">Sunset</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">UV {currentWeather.uvIndex}</p>
                      <p className="text-sm text-muted-foreground">High</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            {alerts.length > 0 && (
              <Card className="farmer-card">
                <CardHeader>
                  <CardTitle className="farmer-text-xl text-primary flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant={alert.priority === 'High' ? 'destructive' : 'secondary'}>
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="farmer-text-lg text-muted-foreground">{alert.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            {/* 7-Day Forecast */}
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <Card 
                  key={index} 
                  className={`farmer-card cursor-pointer transition-all ${
                    selectedDay === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDay(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.date}</p>
                        </div>
                        <day.icon className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-medium">{day.condition}</p>
                          <p className="text-sm text-blue-600">{day.rain}% rain</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{day.high}°</p>
                        <p className="text-sm text-muted-foreground">{day.low}°</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Day Details */}
            {selectedDay !== null && (
              <Card className="farmer-card">
                <CardHeader>
                  <CardTitle className="farmer-text-xl text-primary">
                    {forecast[selectedDay].day} Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                      <p className="font-medium">{forecast[selectedDay].wind} km/h</p>
                      <p className="text-sm text-muted-foreground">Wind</p>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                      <p className="font-medium">{forecast[selectedDay].humidity}%</p>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                    <div className="text-center">
                      <CloudRain className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                      <p className="font-medium">{forecast[selectedDay].rain}%</p>
                      <p className="text-sm text-muted-foreground">Rain Chance</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-success/10 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Farming Advice:</h4>
                    <p className="farmer-text-lg">{forecast[selectedDay].advice}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {/* Historical Data */}
            <Card className="farmer-card">
              <CardHeader>
                <CardTitle className="farmer-text-xl text-primary flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Historical Weather Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{month.month} 2024</p>
                        <p className="text-sm text-muted-foreground">Average data</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <Thermometer className="w-5 h-5 mx-auto mb-1 text-red-500" />
                          <p className="font-medium">{month.avgTemp}°C</p>
                          <p className="text-xs text-muted-foreground">Avg Temp</p>
                        </div>
                        <div className="text-center">
                          <CloudRain className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                          <p className="font-medium">{month.rainfall}mm</p>
                          <p className="text-xs text-muted-foreground">Rainfall</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Trends */}
            <Card className="farmer-card">
              <CardHeader>
                <CardTitle className="farmer-text-xl text-primary flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Seasonal Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Monsoon Season</h4>
                    <p className="farmer-text-lg text-blue-700">
                      Expected to arrive by June 15th. Prepare drainage systems and stock seeds.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-1">Summer Crops</h4>
                    <p className="farmer-text-lg text-green-700">
                      Current weather ideal for summer vegetables. Plan harvesting before monsoon.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}