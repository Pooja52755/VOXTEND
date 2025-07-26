import React, { useState, useEffect } from 'react';
import { Volume2, Globe, FileText, Sparkles } from 'lucide-react';
import VoiceInterfaceEnhanced from './components/VoiceInterfaceEnhanced';
import CategorizedSchemes from './components/CategorizedSchemes';
import MeeSevaCentersMap from './components/MeeSevaCentersMap';
import LanguageSelector from './components/LanguageSelector';
import StatusIndicator from './components/StatusIndicator';
import DocumentViewer from './components/DocumentViewer';
import ApplicationProcess from './components/ApplicationProcess';
import SchemeDetails from './components/SchemeDetails';
import { Language, WelfareScheme } from './types';
import { welfareSchemes } from './data/schemes';
import { languages } from './data/languages';
import { processUserQuery, detectLanguage } from './utils/aiProcessor';
import TabView from './components/TabView';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [currentScheme, setCurrentScheme] = useState<WelfareScheme | null>(null);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    text: string;
    timestamp: Date;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showSchemeDetails, setShowSchemeDetails] = useState(false);
  const [selectedSchemeForDetails, setSelectedSchemeForDetails] = useState<WelfareScheme | null>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage = selectedLanguage.code === 'hi' 
      ? "नमस्कार! मैं VOXTEND हूं, आपका डिजिटल कल्याण सहायक। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने में मदद करूंगा।"
      : selectedLanguage.code === 'te'
      ? "నమస్కారం! నేను VOXTEND, మీ డిజిటల్ కల్యాణ సహాయకుడిని. ప్రభుత్వ పథకాల గురించి మీకు సహాయం చేస్తాను."
      : "Hello! I'm VOXTEND, your digital welfare companion. I'm here to help you access government welfare schemes easily.";
    
    setConversation([{
      type: 'assistant',
      text: welcomeMessage,
      timestamp: new Date()
    }]);
  }, [selectedLanguage]);

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim()) return;

    // Add user message to conversation
    const userMessage = {
      type: 'user' as const,
      text: transcript,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMessage]);

    setIsProcessing(true);

    try {
      // Detect language if needed
      const detectedLang = detectLanguage(transcript);
      if (detectedLang && detectedLang.code !== selectedLanguage.code) {
        const langFromList = languages.find(l => l.code === detectedLang.code);
        if (langFromList) {
          setSelectedLanguage(langFromList);
        }
      }

      // Process the query
      const response = await processUserQuery(transcript, selectedLanguage, welfareSchemes);
      
      // Add assistant response to conversation
      const assistantMessage = {
        type: 'assistant' as const,
        text: response.text,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, assistantMessage]);

      // Update current scheme if relevant
      if (response.scheme) {
        setCurrentScheme(response.scheme);
      }

    } catch (error) {
      console.error('Error processing voice input:', error);
      const errorMessage = {
        type: 'assistant' as const,
        text: selectedLanguage.code === 'hi' 
          ? "क्षमा करें, मुझे आपकी बात समझने में समस्या हुई। कृपया फिर से कोशिश करें।"
          : "Sorry, I had trouble understanding. Please try again.",
        timestamp: new Date()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-purple-500 rounded-full blur-xl"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-orange-200/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Volume2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent flex items-center">
                  VOXTEND
                  <Sparkles className="w-6 h-6 ml-2 text-orange-500" />
                </h1>
                <p className="text-sm text-gray-600 font-medium">Digital Welfare Companion</p>
              </div>
            </div>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <TabView
          isListening={isListening}
          onListeningChange={setIsListening}
          onVoiceInput={handleVoiceInput}
          selectedLanguage={selectedLanguage}
          isProcessing={isProcessing}
          responseText={conversation.length > 0 ? conversation[conversation.length - 1].text : undefined}
          schemes={welfareSchemes}
          onSchemeSelect={(scheme) => {setSelectedSchemeForDetails(scheme); setShowSchemeDetails(true);}}
          conversation={conversation}
        />

        {/* Modals */}
        {showDocuments && (
          <DocumentViewer
            documents={currentScheme?.documents || []}
            selectedLanguage={selectedLanguage}
            onClose={() => setShowDocuments(false)}
          />
        )}

        {showProcess && (
          <ApplicationProcess
            processSteps={currentScheme?.applicationProcess || []}
            selectedLanguage={selectedLanguage}
            onClose={() => setShowProcess(false)}
          />
        )}

        {showSchemeDetails && selectedSchemeForDetails && (
          <SchemeDetails
            scheme={selectedSchemeForDetails}
            selectedLanguage={selectedLanguage}
            onClose={() => {setShowSchemeDetails(false); setSelectedSchemeForDetails(null);}}
            onViewDocuments={() => {
              setShowSchemeDetails(false);
              setCurrentScheme(selectedSchemeForDetails);
              setShowDocuments(true);
            }}
            onViewProcess={() => {
              setShowSchemeDetails(false);
              setCurrentScheme(selectedSchemeForDetails);
              setShowProcess(true);
            }}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              {selectedLanguage.code === 'hi' ? 'सभी भारतीय नागरिकों के लिए सरकारी योजनाओं तक पहुंच सुनिश्चित करना' :
               selectedLanguage.code === 'te' ? 'అన్ని భారతీయ పౌరులకు ప్రభుత్వ పథకాలకు ప్రవేశాన్ని నిర్ధారించడం' :
               'Ensuring access to government schemes for all Indian citizens'}
            </p>
            <div className="flex justify-center items-center mt-2 space-x-4">
              <span className="flex items-center text-xs">
                <Globe className="w-3 h-3 mr-1" />
                {languages.length}+ Languages
              </span>
              <span className="flex items-center text-xs">
                <FileText className="w-3 h-3 mr-1" />
                {welfareSchemes.length}+ Schemes
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
