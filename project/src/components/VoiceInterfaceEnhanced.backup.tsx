import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { Language } from '../types';

// Map of language codes to their display names
const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
  or: 'ଓଡ଼ିଆ',
  ur: 'اردو'
};

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
  // State management
  const [browserSupport, setBrowserSupport] = useState({
    speechRecognition: true,
    speechSynthesis: true
  });
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(selectedLanguage);
  
  // Refs
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSpokenTextRef = useRef<string | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  
  // Clear error after some time
  useEffect(() => {
    if (lastError) {
      const timer = setTimeout(() => setLastError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastError]);
  
  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupport(prev => ({ ...prev, speechRecognition: false }));
      setLastError('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage.code;

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
      setLastError(`Speech recognition error: ${event.error}`);
    };

    return recognition;
  }, [currentLanguage.code, onListeningChange, onVoiceInput]);

  // Text-to-Speech functionality
  const speakText = useCallback(async (text: string) => {
    if (!text) return;
    
    // Stop any ongoing speech
    stopSpeaking();
    
    // Show loading state
    setIsAudioLoading(true);
    setLastError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          lang: currentLanguage.code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      return new Promise<void>((resolve, reject) => {
        if (!audio) return reject(new Error('Audio element not created'));
        
        audio.onloadeddata = () => {
          setIsAudioLoading(false);
          setIsSpeaking(true);
        };
        
        audio.onerror = (error) => {
          console.error('Audio playback error:', error);
          setIsAudioLoading(false);
          setIsSpeaking(false);
          setLastError('Failed to play audio. Please try again.');
          reject(error);
        };
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        
        audio.play().catch(error => {
          console.error('Audio play failed:', error);
          setIsAudioLoading(false);
          setIsSpeaking(false);
          setLastError('Please allow audio playback to hear the response.');
          reject(error);
        });
      });
      
    } catch (error: any) {
      console.error('Error in text-to-speech:', error);
      setIsAudioLoading(false);
      setIsSpeaking(false);
      setLastError(error.message || 'Failed to generate speech. Please try again.');
      throw error;
    }
  }, [currentLanguage.code, stopSpeaking]);

  // Update current language when selectedLanguage changes
  useEffect(() => {
    if (selectedLanguage.code !== currentLanguage.code) {
      setCurrentLanguage(selectedLanguage);
      stopSpeaking();
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        const newRecognition = initializeSpeechRecognition();
        if (newRecognition) {
          recognitionRef.current = newRecognition;
        }
      }
    }
  }, [selectedLanguage, currentLanguage.code, stopSpeaking, initializeSpeechRecognition]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupport(prev => ({ ...prev, speechRecognition: false }));
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
  const speakText = useCallback(async (text: string) => {
    if (!text) return;
    
    // Stop any ongoing speech
    stopSpeaking();
    
    // Show loading state
    setIsAudioLoading(true);
    setLastError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          lang: currentLanguage.code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      return new Promise<void>((resolve, reject) => {
        if (!audio) return reject(new Error('Audio element not created'));
        
        audio.onloadeddata = () => {
          setIsAudioLoading(false);
          setIsSpeaking(true);
        };
        
        audio.onerror = (error) => {
          console.error('Audio playback error:', error);
          setIsAudioLoading(false);
          setIsSpeaking(false);
          setLastError('Failed to play audio. Please try again.');
          reject(error);
        };
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        
        audio.play().catch(error => {
          console.error('Audio play failed:', error);
          setIsAudioLoading(false);
          setIsSpeaking(false);
          setLastError('Please allow audio playback to hear the response.');
          reject(error);
        });
      });
      
    } catch (error: any) {
      console.error('Error in text-to-speech:', error);
      setIsAudioLoading(false);
      setIsSpeaking(false);
      setLastError(error.message || 'Failed to generate speech. Please try again.');
      throw error;
    }
  }, [currentLanguage]);
  
  // Stop speaking function
  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    
    setIsSpeaking(false);
    setIsAudioLoading(false);
  }, []);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Initialize speech synthesis
    synthesisRef.current = window.speechSynthesis || null;
    if (!synthesisRef.current) {
      setBrowserSupport(prev => ({ ...prev, speechSynthesis: false }));
      setLastError('Your browser does not support speech synthesis.');
    }

    // Initialize speech recognition
    const recognition = initializeSpeechRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
    }
    
    return () => {
      // Clean up speech synthesis
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      // Clean up speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [initializeSpeechRecognition]);

  // Handle automatic speaking of responses
  useEffect(() => {
    if (responseText && responseText !== lastSpokenTextRef.current && !isListening && !isProcessing) {
      const speak = async () => {
        try {
          await speakText(responseText);
          lastSpokenTextRef.current = responseText;
        } catch (error) {
          console.error('Failed to speak response:', error);
        }
      };
      
      speak();
    }
  }, [responseText, isListening, isProcessing, speakText]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [stopSpeaking]);

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

  // Get the current language name for display
  const currentLangName = LANGUAGE_NAMES[currentLanguage.code] || currentLanguage.name;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        {/* Microphone Button */}
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing || !browserSupport.speechRecognition}
          className={`p-3 rounded-full transition-all ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg transform scale-110'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } ${(isProcessing || !browserSupport.speechRecognition) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          title={
            !browserSupport.speechRecognition 
              ? 'Speech recognition not supported' 
              : isListening 
                ? `Stop listening (${currentLangName})` 
                : `Start listening in ${currentLangName}`
          }
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Speaker Button */}
        <button
          onClick={isSpeaking ? stopSpeaking : () => responseText && speakText(responseText)}
          disabled={!responseText || isProcessing || !browserSupport.speechSynthesis}
          className={`p-3 rounded-full transition-all ${
            isSpeaking || isAudioLoading
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg transform scale-110'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } ${(!responseText || isProcessing || !browserSupport.speechSynthesis) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          title={
            !browserSupport.speechSynthesis
              ? 'Text-to-speech not supported'
              : isSpeaking || isAudioLoading
                ? 'Stop speaking'
                : `Speak response in ${currentLangName}`
          }
        >
          {isAudioLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isSpeaking ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
        
        {/* Language Indicator */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {currentLangName}
        </div>
      </div>
      
      {/* Error Message */}
      {lastError && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{lastError}</span>
        </div>
      )}
      
      {/* Debug Info (visible in development) */}
      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 mt-1">
          <div>Lang: {currentLanguage.code} | 
               Listening: {isListening ? 'Yes' : 'No'} | 
               Speaking: {isSpeaking ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default VoiceInterfaceEnhanced;
