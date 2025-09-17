import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

interface VoiceButtonProps {
  text: string;
  language?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon" | "sm" | "lg";
  className?: string;
}

export default function VoiceButton({ 
  text, 
  language = 'hi-IN', 
  variant = "ghost", 
  size = "icon",
  className = "" 
}: VoiceButtonProps) {
  const { speak } = useSpeech();

  const handleSpeak = () => {
    speak(text, { lang: language });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSpeak}
      className={`text-primary hover:text-primary/80 ${className}`}
      aria-label="Read aloud"
    >
      <Volume2 className="w-4 h-4" />
    </Button>
  );
}