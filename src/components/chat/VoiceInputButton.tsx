import { Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInputButton({ onTranscript, disabled }: VoiceInputButtonProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!isListening && transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [isListening, transcript, onTranscript, resetTranscript]);

  if (!isSupported) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled
              className="p-1.5 rounded-lg text-muted-foreground opacity-50 cursor-not-allowed"
              aria-label="Gravação de voz não suportada"
            >
              <MicOff className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Seu navegador não suporta gravação de voz</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const handleClick = () => {
    if (disabled) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`p-1.5 rounded-lg transition-colors ${
          isListening ? "recording-pulse" : "hover:bg-accent"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label={isListening ? "Parar gravação" : "Gravar voz"}
      >
        {isListening ? (
          <div className="w-5 h-5 rounded-full bg-destructive" />
        ) : (
          <Mic className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {isListening && interimTranscript && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-popover border border-border rounded-lg shadow-lg max-w-[250px] z-50">
          <p className="text-xs text-muted-foreground italic truncate">
            {interimTranscript}
          </p>
        </div>
      )}
    </div>
  );
}
