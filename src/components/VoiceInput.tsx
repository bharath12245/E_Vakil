// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySpeechRecognition = any;

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  speechLang?: string;
  inline?: boolean;
}

import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { LawyerAnimation } from "./LawyerAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export const VoiceInput = ({ onTranscript, disabled, speechLang, inline }: VoiceInputProps) => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<AnySpeechRecognition>(null);

  useEffect(() => {
    const w = window as AnySpeechRecognition;
    if (!w.webkitSpeechRecognition && !w.SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  // Stop and restart recognition when language changes mid-session
  useEffect(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechLang]);

  const startRecording = () => {
    const w = window as AnySpeechRecognition;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = speechLang || "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: AnySpeechRecognition) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  if (!isSupported) return null;

  if (inline) {
    return (
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
        type="button"
        className={`w-14 h-14 flex items-center justify-center transition-all duration-300 rounded-xl flex-shrink-0
          ${isRecording
            ? "text-red-500 bg-red-500/10 shadow-inner"
            : "text-white/50 hover:text-white hover:bg-white/5"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {isRecording ? (
          <Square className="w-5 h-5 animate-pulse" fill="currentColor" />
        ) : (
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <LawyerAnimation isActive={isRecording} listeningLabel={t.voiceListening} inactiveLabel={t.voiceInactive} />
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
        type="button"
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
          ${isRecording
            ? "bg-destructive shadow-[0_0_30px_hsl(0_70%_50%/0.5)] scale-110"
            : "bg-primary animate-pulse-glow hover:scale-105"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {isRecording ? (
          <Square className="w-5 h-5 text-primary-foreground" fill="currentColor" />
        ) : (
          <Mic className="w-5 h-5 text-primary-foreground" />
        )}
      </button>
    </div>
  );
};

export default VoiceInput;
