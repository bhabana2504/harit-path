import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Globe, Mic, User, MapPin } from "lucide-react";
import farmerWelcome from "@/assets/farmer-welcome.jpg";

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  language: string;
  preferVoice: boolean;
  farmSize: string;
  soilType: string;
  previousCrops: string;
  location: string;
}

const languages = [
  { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(data as OnboardingData);
    }
  };

  const updateData = (key: keyof OnboardingData, value: string | boolean) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-sky p-4 flex flex-col">
      {/* Progress indicator */}
      <div className="flex justify-center mb-6 mt-4">
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i <= step ? 'bg-primary' : 'bg-primary/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        {step === 1 && (
          <Card className="farmer-card p-8 text-center animate-fade-in-up">
            <div className="mb-6">
              <img 
                src={farmerWelcome} 
                alt="Welcome Farmer" 
                className="w-32 h-32 mx-auto rounded-full object-cover crop-illustration"
              />
            </div>
            <h1 className="farmer-heading text-primary mb-4">
              स्मार्ट कृषि सलाहकार में आपका स्वागत है!
            </h1>
            <p className="farmer-text-lg text-muted-foreground mb-6">
              Welcome to Smart Crop Advisory!
            </p>
            <p className="farmer-text-lg text-muted-foreground mb-8">
              आइए आपकी भाषा चुनकर शुरुआत करते हैं
            </p>
            
            <div className="space-y-4">
              <Label className="farmer-text-xl text-primary">
                <Globe className="inline mr-2" />
                भाषा चुनें / Select Language
              </Label>
              <Select onValueChange={(value) => updateData('language', value)}>
                <SelectTrigger className="w-full text-lg h-14">
                  <SelectValue placeholder="Choose your language / अपनी भाषा चुनें" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-lg py-3">
                      <span className="mr-3">{lang.flag}</span>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="farmer-card p-8 animate-fade-in-up">
            <h2 className="farmer-heading text-primary mb-6 text-center">
              Voice Assistance / आवाज़ सहायता
            </h2>
            <p className="farmer-text-lg text-muted-foreground mb-8 text-center">
              Would you like voice guidance? / क्या आप आवाज़ से मार्गदर्शन चाहते हैं?
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={data.preferVoice === true ? "default" : "outline"}
                className="h-20 farmer-text-lg flex flex-col space-y-2"
                onClick={() => updateData('preferVoice', true)}
              >
                <Mic className="w-8 h-8" />
                <span>हाँ / Yes</span>
              </Button>
              <Button
                variant={data.preferVoice === false ? "default" : "outline"}
                className="h-20 farmer-text-lg flex flex-col space-y-2"
                onClick={() => updateData('preferVoice', false)}
              >
                <User className="w-8 h-8" />
                <span>नहीं / No</span>
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="farmer-card p-8 animate-fade-in-up">
            <h2 className="farmer-heading text-primary mb-6 text-center">
              Farm Details / खेत की जानकारी
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label className="farmer-text-xl text-primary">
                  Farm Size / खेत का आकार (Acres)
                </Label>
                <Input
                  placeholder="e.g., 2.5 acres"
                  className="text-lg h-14 mt-2"
                  value={data.farmSize || ''}
                  onChange={(e) => updateData('farmSize', e.target.value)}
                />
              </div>
              
              <div>
                <Label className="farmer-text-xl text-primary">
                  Soil Type / मिट्टी का प्रकार
                </Label>
                <Select onValueChange={(value) => updateData('soilType', value)}>
                  <SelectTrigger className="w-full text-lg h-14 mt-2">
                    <SelectValue placeholder="Select soil type / मिट्टी चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay / चिकनी मिट्टी</SelectItem>
                    <SelectItem value="sandy">Sandy / रेतीली मिट्टी</SelectItem>
                    <SelectItem value="loamy">Loamy / दोमट मिट्टी</SelectItem>
                    <SelectItem value="black">Black / काली मिट्टी</SelectItem>
                    <SelectItem value="red">Red / लाल मिट्टी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="farmer-text-xl text-primary">
                  Previous Crops / पिछली फसल
                </Label>
                <Input
                  placeholder="e.g., Wheat, Rice / गेहूं, चावल"
                  className="text-lg h-14 mt-2"
                  value={data.previousCrops || ''}
                  onChange={(e) => updateData('previousCrops', e.target.value)}
                />
              </div>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="farmer-card p-8 animate-fade-in-up text-center">
            <h2 className="farmer-heading text-primary mb-6">
              Location / स्थान
            </h2>
            <p className="farmer-text-lg text-muted-foreground mb-6">
              Please share your location for personalized weather and market updates
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <MapPin className="w-6 h-6" />
                <span className="farmer-text-lg">Detecting location...</span>
              </div>
              
              <Input
                placeholder="Or enter manually / या हाथ से लिखें"
                className="text-lg h-14"
                value={data.location || ''}
                onChange={(e) => updateData('location', e.target.value)}
              />
            </div>
            
            <div className="mt-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">🌱</span>
              </div>
              <p className="farmer-text-lg text-success font-medium">
                Ready to start your smart farming journey!
              </p>
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="farmer-text-lg">
            Back / वापस
          </Button>
        )}
        <div className="flex-1" />
        <Button 
          onClick={handleNext}
          disabled={
            (step === 1 && !data.language) ||
            (step === 2 && data.preferVoice === undefined) ||
            (step === 3 && (!data.farmSize || !data.soilType))
          }
          className="farmer-text-lg voice-button"
        >
          {step === 4 ? 'Start Farming' : 'Next'}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}