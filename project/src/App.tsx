import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Users, FileText, HelpCircle, Globe, Phone, Sparkles } from 'lucide-react';
import VoiceInterface from './components/VoiceInterface';
import WelfareSchemes from './components/WelfareSchemes';
import LanguageSelector from './components/LanguageSelector';
import StatusIndicator from './components/StatusIndicator';
import DocumentViewer from './components/DocumentViewer';
import ApplicationProcess from './components/ApplicationProcess';
import SchemeDetails from './components/SchemeDetails';
import { Language, WelfareScheme } from './types';
import { welfareSchemes } from './data/schemes';
import { languages } from './data/languages';
import { processUserQuery, detectLanguage } from './utils/aiProcessor';

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Voice Interface */}
          <div className="lg:col-span-2">
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

              <VoiceInterface
                isListening={isListening}
                onListeningChange={setIsListening}
                onVoiceInput={handleVoiceInput}
                selectedLanguage={selectedLanguage}
                isProcessing={isProcessing}
              />

              <StatusIndicator 
                isListening={isListening}
                isProcessing={isProcessing}
                selectedLanguage={selectedLanguage}
              />
            </div>

            {/* Conversation History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-600" />
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Access Features */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                {selectedLanguage.code === 'hi' ? 'त्वरित सहायता' :
                 selectedLanguage.code === 'te' ? 'త్వరిత సహాయం' :
                 'Quick Help'}
              </h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setShowDocuments(true)}
                  className="w-full text-left p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-300 border border-orange-200 hover:shadow-md"
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-orange-600" />
                    <span className="font-medium text-gray-800">
                      {selectedLanguage.code === 'hi' ? 'आवश्यक दस्तावेज़' :
                       selectedLanguage.code === 'te' ? 'అవసరమైన పత్రాలు' :
                       'Required Documents'}
                    </span>
                  </div>
                </button>
                <button 
                  onClick={() => setShowProcess(true)}
                  className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 border border-green-200 hover:shadow-md"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium text-gray-800">
                      {selectedLanguage.code === 'hi' ? 'आवेदन प्रक्रिया' :
                       selectedLanguage.code === 'te' ? 'దరఖాస్తు ప్రక్రియ' :
                       'Application Process'}
                    </span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 border border-blue-200 hover:shadow-md">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium text-gray-800">
                      {selectedLanguage.code === 'hi' ? 'पात्रता जांचें' :
                       selectedLanguage.code === 'te' ? 'అర్హత తనిఖీ చేయండి' :
                       'Check Eligibility'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Current Scheme Details */}
            {currentScheme && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {selectedLanguage.code === 'hi' ? 'वर्तमान योजना' :
                   selectedLanguage.code === 'te' ? 'ప్రస్తుత పథకం' :
                   'Current Scheme'}
                </h3>
                <div className="space-y-3">
                  <h4 className="font-bold text-orange-600 text-lg">{currentScheme.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{currentScheme.description}</p>
                  <div className="text-xs text-gray-500">
                    <strong>
                      {selectedLanguage.code === 'hi' ? 'लक्षित समूह: ' :
                       selectedLanguage.code === 'te' ? 'లక్ష్య సమూహం: ' :
                       'Target Group: '}
                    </strong>
                    {currentScheme.targetGroup}
                  </div>
                  <button 
                    onClick={() => {setSelectedSchemeForDetails(currentScheme); setShowSchemeDetails(true);}}
                    className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    {selectedLanguage.code === 'hi' ? 'पूरा विवरण देखें' : selectedLanguage.code === 'te' ? 'పూర్తి వివరాలు చూడండి' : 'View Full Details'}
                  </button>
                </div>
              </div>
            )}

            {/* Popular Schemes */}
            <WelfareSchemes 
              schemes={welfareSchemes.slice(0, 5)}
              selectedLanguage={selectedLanguage}
              onSchemeSelect={(scheme) => {setSelectedSchemeForDetails(scheme); setShowSchemeDetails(true);}}
            />
          </div>
        </div>
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
  );
}

export default App;