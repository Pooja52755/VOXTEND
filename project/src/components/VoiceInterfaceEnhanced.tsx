import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';

interface VoiceInterfaceEnhancedProps {
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
  onVoiceInput: (transcript: string) => void;
  selectedLanguage: Language;
  isProcessing: boolean;
  responseText?: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceInterfaceEnhanced: React.FC<VoiceInterfaceEnhancedProps> = ({
  isListening,
  onListeningChange,
  onVoiceInput,
  selectedLanguage,
  isProcessing,
  responseText
}) => {
  const [hasAudioSupport, setHasAudioSupport] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHasAudioSupport(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage.speechCode;

    // For better mobile support
    document.addEventListener('touchstart', () => {
      if (isListening) {
        recognition.start();
      }
    });

    recognition.onstart = () => {
      console.log('Speech recognition started');
      onListeningChange(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onVoiceInput(transcript);
    };

    recognition.onend = () => {
      onListeningChange(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      onListeningChange(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedLanguage, onListeningChange, onVoiceInput]);

  // Text-to-Speech functionality
  const speakText = async (text: string) => {
    try {
      if (isSpeaking) {
        stopSpeaking();
      }

      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          lang: selectedLanguage.code
        }),
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  };

  // Automatically speak the response text when it changes
  useEffect(() => {
    if (responseText && !isListening && !isProcessing) {
      speakText(responseText);
    }
  }, [responseText, isListening, isProcessing]);

  const startListening = () => {
    if (!recognitionRef.current || isProcessing) return;
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {!hasAudioSupport ? (
        <div className="text-red-500 text-sm">
          Speech recognition is not supported in your browser
        </div>
      ) : (
        <>
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`p-3 rounded-full transition-colors ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={isSpeaking ? stopSpeaking : () => responseText && speakText(responseText)}
            disabled={!responseText || isProcessing}
            className={`p-3 rounded-full transition-colors ${
              isSpeaking
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } ${(!responseText || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isSpeaking ? 'Stop speaking' : 'Speak response'}
          >
            {isSpeaking ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default VoiceInterfaceEnhanced;
