import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';

interface VoiceInterfaceProps {
  text?: string;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
  onVoiceInput: (transcript: string) => void;
  selectedLanguage: Language;
  isProcessing: boolean;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  isListening,
  onListeningChange,
  onVoiceInput,
  selectedLanguage,
  isProcessing
}) => {
  const [hasAudioSupport, setHasAudioSupport] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setHasAudioSupport(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage.speechCode;

    recognition.onstart = () => {
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const finalTranscript = lastResult[0].transcript;
        setTranscript(finalTranscript);
        onVoiceInput(finalTranscript);
      }
    };

    recognition.onend = () => {
      onListeningChange(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onListeningChange(false);
      setTranscript('Error: Could not recognize speech');
    };

    recognitionRef.current = recognition;

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedLanguage, onListeningChange, onVoiceInput]);

  const startListening = () => {
    if (!recognitionRef.current || isProcessing) return;

    try {
      recognitionRef.current.start();
      onListeningChange(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    onListeningChange(false);
  };

  const speakText = async (text: string) => {
    try {
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
      const audio = new Audio(audioUrl);
      
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

    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage.speechCode;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!hasAudioSupport) {
    return (
      <div className="text-center p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            {selectedLanguage.code === 'hi' 
              ? 'आपका ब्राउज़र वॉयस फीचर का समर्थन नहीं करता। कृपया Chrome या Firefox का उपयोग करें।'
              : 'Your browser does not support voice features. Please use Chrome or Firefox.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Main Voice Control Button */}
      <div className="relative mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 shadow-lg scale-110 animate-pulse'
              : isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:scale-105'
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>
        
        {/* Listening Animation */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
        )}
      </div>

      {/* Voice Controls */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => speakText(
            selectedLanguage.code === 'hi' 
              ? 'नमस्कार! मैं आपकी मदद के लिए यहाँ हूँ।'
              : selectedLanguage.code === 'te'
              ? 'నమస్కారం! నేను మీ సహాయం కోసం ఇక్కడ ఉన్నాను.'
              : 'Hello! I am here to help you.'
          )}
          disabled={isSpeaking || isProcessing}
          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:bg-gray-400"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          {selectedLanguage.code === 'hi' ? 'नमूना सुनें' :
           selectedLanguage.code === 'te' ? 'నమూనా వినండి' :
           'Hear Sample'}
        </button>
        
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <VolumeX className="w-4 h-4 mr-2" />
            {selectedLanguage.code === 'hi' ? 'रोकें' :
             selectedLanguage.code === 'te' ? 'ఆపండి' :
             'Stop'}
          </button>
        )}
      </div>

      {/* Status Text */}
      <div className="min-h-[2rem]">
        {isListening && (
          <p className="text-red-600 font-medium animate-pulse">
            {selectedLanguage.code === 'hi' ? '🎤 सुन रहा हूँ...' :
             selectedLanguage.code === 'te' ? '🎤 వింటున్నాఇ...' :
             '🎤 Listening...'}
          </p>
        )}
        {isProcessing && (
          <p className="text-orange-600 font-medium">
            {selectedLanguage.code === 'hi' ? '🤔 समझ रहा हूँ...' :
             selectedLanguage.code === 'te' ? '🤔 అర్థం చేసుకుంటున్నాను...' :
             '🤔 Processing...'}
          </p>
        )}
        {isSpeaking && (
          <p className="text-green-600 font-medium animate-pulse">
            {selectedLanguage.code === 'hi' ? '🔊 बोल रहा हूँ...' :
             selectedLanguage.code === 'te' ? '🔊 మాట్లాడుతున్నాను...' :
             '🔊 Speaking...'}
          </p>
        )}
        {transcript && !isProcessing && (
          <p className="text-gray-600 italic mt-2 p-2 bg-gray-50 rounded">
            "{transcript}"
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600 space-y-1">
        <p>
          {selectedLanguage.code === 'hi' ? '• माइक्रोफोन बटन दबाकर बोलना शुरू करें' :
           selectedLanguage.code === 'te' ? '• మైక్రోఫోన్ బటన్ నొక్కి మాట్లాడడం ప్రారంభించండి' :
           '• Press the microphone button to start speaking'}
        </p>
        <p>
          {selectedLanguage.code === 'hi' ? '• "मुझे PM-KISAN के बारे में बताएं" जैसे प्रश्न पूछें' :
           selectedLanguage.code === 'te' ? '• "PM-KISAN గురించి చెప్పండి" వంటి ప్రశ్నలు అడగండి' :
           '• Ask questions like "Tell me about PM-KISAN scheme"'}
        </p>
        <p>
          {selectedLanguage.code === 'hi' ? '• स्पष्ट और धीरे बोलें' :
           selectedLanguage.code === 'te' ? '• స్పష్టంగా మరియు నెమ్మదిగా మాట్లాడండి' :
           '• Speak clearly and slowly'}
        </p>
      </div>
    </div>
  );
};

export default VoiceInterface;