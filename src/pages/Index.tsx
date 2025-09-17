import { useState } from "react";
import OnboardingScreen, { OnboardingData } from "@/components/OnboardingScreen";
import Dashboard from "@/components/Dashboard";
import ChatAssistant from "@/components/ChatAssistant";
import PestDetection from "@/components/PestDetection";
import WeatherDetails from "@/components/WeatherDetails";

type Screen = 
  | 'onboarding' 
  | 'dashboard' 
  | 'chat' 
  | 'pest-detection' 
  | 'weather'
  | 'market-prices'
  | 'community'
  | 'soil-health'
  | 'advisory-details'
  | 'calendar'
  | 'voice-assistant';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setCurrentScreen('dashboard');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={handleNavigation}
            userLanguage={userData?.language || 'en'}
          />
        );
      
      case 'chat':
      case 'voice-assistant':
        return (
          <ChatAssistant 
            onBack={handleBack}
            userLanguage={userData?.language || 'en'}
          />
        );
      
      case 'pest-detection':
        return <PestDetection onBack={handleBack} />;
      
      case 'weather':
        return <WeatherDetails onBack={handleBack} />;
      
      case 'market-prices':
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="farmer-heading text-primary mb-4">Market Prices</h1>
              <p className="farmer-text-lg text-muted-foreground mb-6">
                Detailed market analysis coming soon!
              </p>
              <button 
                onClick={handleBack}
                className="voice-button px-6 py-3 farmer-text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      
      case 'community':
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="farmer-heading text-primary mb-4">Community</h1>
              <p className="farmer-text-lg text-muted-foreground mb-6">
                Connect with fellow farmers - feature coming soon!
              </p>
              <button 
                onClick={handleBack}
                className="voice-button px-6 py-3 farmer-text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      
      case 'soil-health':
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="farmer-heading text-primary mb-4">Soil Health</h1>
              <p className="farmer-text-lg text-muted-foreground mb-6">
                Comprehensive soil analysis tools coming soon!
              </p>
              <button 
                onClick={handleBack}
                className="voice-button px-6 py-3 farmer-text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      
      case 'advisory-details':
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="farmer-heading text-primary mb-4">Detailed Advisory</h1>
              <p className="farmer-text-lg text-muted-foreground mb-6">
                In-depth crop advisory system coming soon!
              </p>
              <button 
                onClick={handleBack}
                className="voice-button px-6 py-3 farmer-text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      
      case 'calendar':
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="farmer-heading text-primary mb-4">Farm Calendar</h1>
              <p className="farmer-text-lg text-muted-foreground mb-6">
                Smart farming calendar with seasonal reminders coming soon!
              </p>
              <button 
                onClick={handleBack}
                className="voice-button px-6 py-3 farmer-text-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      
      default:
        return <Dashboard onNavigate={handleNavigation} userLanguage={userData?.language || 'en'} />;
    }
  };

  return (
    <div className="min-h-screen scroll-smooth">
      {renderScreen()}
    </div>
  );
};

export default Index;