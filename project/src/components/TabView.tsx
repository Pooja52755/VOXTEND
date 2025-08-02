import React, { useState } from 'react';
import { Mic, FileText, MapPin, Volume2 } from 'lucide-react';
import Tabs from './Tabs.tsx';
import VoiceInterfaceEnhanced from './VoiceInterfaceEnhanced';
import CategorizedSchemes from './CategorizedSchemes';
import MeeSevaCentersMap from './MeeSevaCentersMap';
import LatestNews from './LatestNews';
import { Language, WelfareScheme } from '../types';

interface TabViewProps {
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
  onVoiceInput: (transcript: string) => void;
  selectedLanguage: Language;
  isProcessing: boolean;
  responseText?: string;
  schemes: WelfareScheme[];

  conversation: Array<{
    type: 'user' | 'assistant';
    text: string;
    timestamp: Date;
  }>;
}

const TabView: React.FC<TabViewProps> = ({
  isListening,
  onListeningChange,
  onVoiceInput,
  selectedLanguage,
  isProcessing,
  responseText,
  schemes,

  conversation
}) => {
  const [activeTab, setActiveTab] = useState('voice');

  const tabs = [
    {
      id: 'voice',
      label: selectedLanguage.code === 'hi' ? 'वॉइस सहायक' : 
             selectedLanguage.code === 'te' ? 'వాయిస్ అసిస్టెంట్' : 
             'Voice Assistant',
      icon: <Mic className="w-4 h-4" />
    },
    {
      id: 'schemes',
      label: selectedLanguage.code === 'hi' ? 'योजनाएं' : 
             selectedLanguage.code === 'te' ? 'పథకాలు' : 
             'Schemes',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'centers',
      label: selectedLanguage.code === 'hi' ? 'मीसेवा केंद्र' : 
             selectedLanguage.code === 'te' ? 'మీసేవా కేంద్రాలు' : 
             'MeeSeva Centers',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: 'news',
      label: selectedLanguage.code === 'hi' ? 'नवीनतम समाचार' :
             selectedLanguage.code === 'te' ? 'తాజా వార్తలు' :
             'Latest News',
      icon: <span className="w-4 h-4">📰</span>
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={tabs}
      />

      <div className="space-y-6">
        {activeTab === 'voice' && (
          <>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {selectedLanguage.code === 'hi' ? 'अपनी आवाज़ से सवाल पूछें' : 
                   selectedLanguage.code === 'te' ? 'మీ వాయిస్‌తో ప్రశ్నలు అడగండి' :
                   'Ask Questions with Your Voice'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {selectedLanguage.code === 'hi' ? 'माइक्रोफोन बटन दबाकर बोलना शुरू करें' :
                   selectedLanguage.code === 'te' ? 'మైక్రోఫోన్ బటన్ నొక్కి మాట్లాడడం ప్రారంభించండి' :
                   'Press the microphone button and start speaking'}
                </p>
              </div>

              <VoiceInterfaceEnhanced
                isListening={isListening}
                onListeningChange={onListeningChange}
                onVoiceInput={onVoiceInput}
                selectedLanguage={selectedLanguage}
                isProcessing={isProcessing}
                responseText={responseText}
              />
            </div>

            {/* Conversation History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
                {selectedLanguage.code === 'hi' ? 'बातचीत का इतिहास' :
                 selectedLanguage.code === 'te' ? 'సంభాషణ చరిత్ర' :
                 'Conversation History'}
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-md ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-75 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'schemes' && (
          <CategorizedSchemes
            schemes={schemes}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeTab === 'centers' && (
          <MeeSevaCentersMap
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === 'news' && (
          <LatestNews />
        )}
      </div>
    </div>
  );
};

export default TabView;
