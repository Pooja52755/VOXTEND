import React from 'react';
import { Activity, Brain, Ear } from 'lucide-react';
import { Language } from '../types';

interface StatusIndicatorProps {
  isListening: boolean;
  isProcessing: boolean;
  selectedLanguage: Language;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isListening,
  isProcessing,
  selectedLanguage
}) => {
  const getStatusText = () => {
    if (isListening) {
      return selectedLanguage.code === 'hi' ? 'आपकी आवाज़ सुन रहा हूँ...' :
             selectedLanguage.code === 'te' ? 'మీ వాయిస్ వింటున్నాను...' :
             'Listening to your voice...';
    }
    if (isProcessing) {
      return selectedLanguage.code === 'hi' ? 'आपके प्रश्न को समझ रहा हूँ...' :
             selectedLanguage.code === 'te' ? 'మీ ప్రశ్నను అర్థం చేసుకుంటున్నాను...' :
             'Understanding your question...';
    }
    return selectedLanguage.code === 'hi' ? 'बोलने के लिए तैयार' :
           selectedLanguage.code === 'te' ? 'మాట్లాడడానికి సిద్ధంగా ఉంది' :
           'Ready to listen';
  };

  const getStatusIcon = () => {
    if (isListening) return <Ear className="w-5 h-5 text-blue-500" />;
    if (isProcessing) return <Brain className="w-5 h-5 text-orange-500 animate-pulse" />;
    return <Activity className="w-5 h-5 text-green-500" />;
  };

  const getStatusColor = () => {
    if (isListening) return 'border-blue-200 bg-blue-50';
    if (isProcessing) return 'border-orange-200 bg-orange-50';
    return 'border-green-200 bg-green-50';
  };

  return (
    <div className={`mt-6 p-4 rounded-lg border-2 ${getStatusColor()} transition-all duration-300`}>
      <div className="flex items-center justify-center space-x-3">
        {getStatusIcon()}
        <span className="font-medium text-gray-700">{getStatusText()}</span>
      </div>
      
      {/* Voice Wave Animation */}
      {(isListening || isProcessing) && (
        <div className="flex justify-center items-center mt-3 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t ${
                isListening ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600'
              } rounded-full animate-pulse`}
              style={{
                height: '8px',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;