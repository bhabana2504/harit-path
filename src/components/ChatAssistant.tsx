import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Bot,
  User,
  Leaf,
  MapPin
} from "lucide-react";

interface ChatAssistantProps {
  onBack: () => void;
  userLanguage: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export default function ChatAssistant({ onBack, userLanguage }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: userLanguage === 'hi' ? 
        "नमस्ते! मैं आपका स्मार्ट कृषि सहायक हूं। मैं फसल, मौसम, कीट नियंत्रण और बाजार की कीमतों के बारे में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?" :
        "Hello! I'm your Smart Agricultural Assistant. I can help you with crops, weather, pest control, and market prices. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage, userLanguage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Text-to-speech simulation
      if (audioEnabled) {
        speakMessage(botResponse.content, userLanguage);
      }
    }, 1500);
  };

  const generateBotResponse = (input: string, language: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (language === 'hi') {
      if (lowerInput.includes('मौसम') || lowerInput.includes('weather')) {
        return "आज पुणे में आंशिक बादल छाए रहेंगे, तापमान 28°C रहेगा। कल बारिश की 80% संभावना है। आपको सिंचाई आज ही कर लेनी चाहिए।";
      }
      if (lowerInput.includes('कीट') || lowerInput.includes('pest')) {
        return "कीट नियंत्रण के लिए आप नीम का तेल (2-3 मिली प्रति लीटर पानी) का छिड़काव करें। यदि समस्या बनी रहे तो फोटो भेजें, मैं पहचान कर सकूंगा।";
      }
      if (lowerInput.includes('बाजार') || lowerInput.includes('price') || lowerInput.includes('market')) {
        return "आज गेहूं ₹2,180 प्रति क्विंटल (+2.3%), चावल ₹3,450 (-1.2%), कपास ₹6,200 (+5.1%) भाव चल रहा है पुणे मंडी में।";
      }
      return "मुझे खुशी होगी आपकी मदद करने में! कृपया अधिक विस्तार से बताएं कि आप क्या जानना चाहते हैं - फसल, मौसम, कीट, या बाजार के बारे में?";
    } else {
      if (lowerInput.includes('weather')) {
        return "Today in Pune: Partly cloudy, 28°C. Tomorrow has 80% chance of rain. I recommend irrigating your crops today before the rain arrives.";
      }
      if (lowerInput.includes('pest') || lowerInput.includes('disease')) {
        return "For pest control, spray neem oil solution (2-3ml per liter water). If the problem persists, please share a photo and I can help identify the specific pest.";
      }
      if (lowerInput.includes('price') || lowerInput.includes('market')) {
        return "Today's Pune market rates: Wheat ₹2,180/quintal (+2.3%), Rice ₹3,450 (-1.2%), Cotton ₹6,200 (+5.1%). Prices are trending upward for wheat and cotton.";
      }
      return "I'd be happy to help! Please tell me more about what you'd like to know - crops, weather, pests, or market prices?";
    }
  };

  const speakMessage = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage(
        userLanguage === 'hi' 
          ? "मेरी फसल में कीड़े लग गए हैं, क्या करूं?"
          : "My crops have pest problems, what should I do?"
      );
    }, 2000);
  };

  const quickSuggestions = userLanguage === 'hi' ? [
    "आज का मौसम कैसा है?",
    "गेहूं की कीमत क्या है?",
    "कीट नियंत्रण के तरीके",
    "सिंचाई की सलाह"
  ] : [
    "What's today's weather?",
    "What's the wheat price?",
    "Pest control methods",
    "Irrigation advice"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground mr-3">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="farmer-heading">AI Assistant</h1>
            <div className="flex items-center space-x-2 opacity-90">
              <Bot className="w-4 h-4" />
              <span className="farmer-text-lg">Smart Farming Helper</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="text-primary-foreground"
          >
            {audioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 text-primary-foreground/80">
          <MapPin className="w-4 h-4" />
          <span className="farmer-text-lg">Pune, Maharashtra</span>
          <Badge variant="secondary" className="ml-2">
            {userLanguage === 'hi' ? 'हिंदी' : 'English'}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'farmer-card'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-primary-foreground/20' : 'bg-primary/10'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="w-5 h-5" /> : 
                      <Leaf className="w-5 h-5 text-success" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="farmer-text-lg leading-relaxed">{message.content}</p>
                    <p className={`text-sm mt-2 ${
                      message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'bot' && audioEnabled && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => speakMessage(message.content, userLanguage)}
                      className="h-8 w-8"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="farmer-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                    <Leaf className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="p-4 space-y-2">
          <p className="farmer-text-lg text-muted-foreground text-center mb-3">
            {userLanguage === 'hi' ? 'त्वरित सुझाव:' : 'Quick suggestions:'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setInputMessage(suggestion)}
                className="text-sm p-3 h-auto text-left break-words"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-muted/50">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                userLanguage === 'hi' 
                  ? "अपना सवाल यहां लिखें..." 
                  : "Type your question here..."
              }
              className="farmer-text-lg h-12 pr-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={startListening}
              disabled={isListening}
              className={`absolute right-1 top-1 h-10 w-10 ${
                isListening ? 'bg-destructive text-destructive-foreground' : ''
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          </div>
          <Button onClick={handleSendMessage} className="voice-button h-12 w-12">
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <p className="farmer-text-lg text-destructive font-medium">
              🎤 {userLanguage === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}