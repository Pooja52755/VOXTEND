import React from 'react';
import { CheckCircle, Clock, FileText, Users, MapPin, Phone } from 'lucide-react';
import { Language } from '../types';

interface Step {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ReactNode;
  details: string[];
}

interface ApplicationProcessProps {
  processSteps: string[];
  selectedLanguage: Language;
  onClose: () => void;
}

const ApplicationProcess: React.FC<ApplicationProcessProps> = ({
  processSteps,
  selectedLanguage,
  onClose
}) => {
  const mockSteps: Step[] = [
    {
      id: 1,
      title: selectedLanguage.code === 'hi' ? 'पात्रता जांच' : selectedLanguage.code === 'te' ? 'అర్హత తనిఖీ' : 'Eligibility Check',
      description: selectedLanguage.code === 'hi' ? 'अपनी पात्रता की जांच करें' : selectedLanguage.code === 'te' ? 'మీ అర్హతను తనిఖీ చేయండి' : 'Verify your eligibility',
      duration: '5 mins',
      status: 'completed',
      icon: <Users className="w-5 h-5" />,
      details: [
        selectedLanguage.code === 'hi' ? 'आयु सीमा की जांच करें' : selectedLanguage.code === 'te' ? 'వయస్సు పరిమితిని తనిఖీ చేయండి' : 'Check age limit',
        selectedLanguage.code === 'hi' ? 'आय सीमा की पुष्टि करें' : selectedLanguage.code === 'te' ? 'ఆదాయ పరిమితిని నిర్ధారించండి' : 'Confirm income limit',
        selectedLanguage.code === 'hi' ? 'श्रेणी की जांच करें' : selectedLanguage.code === 'te' ? 'వర్గాన్ని తనిఖీ చేయండి' : 'Check category'
      ]
    },
    {
      id: 2,
      title: selectedLanguage.code === 'hi' ? 'दस्तावेज़ तैयार करें' : selectedLanguage.code === 'te' ? 'పత్రాలను సిద్ధం చేయండి' : 'Prepare Documents',
      description: selectedLanguage.code === 'hi' ? 'आवश्यक दस्तावेज़ इकट्ठे करें' : selectedLanguage.code === 'te' ? 'అవసరమైన పత్రాలను సేకరించండి' : 'Collect required documents',
      duration: '1-2 days',
      status: 'current',
      icon: <FileText className="w-5 h-5" />,
      details: [
        selectedLanguage.code === 'hi' ? 'आधार कार्ड की फोटोकॉपी' : selectedLanguage.code === 'te' ? 'ఆధార్ కార్డ్ ఫోటోకాపీ' : 'Aadhaar card photocopy',
        selectedLanguage.code === 'hi' ? 'बैंक पासबुक की कॉपी' : selectedLanguage.code === 'te' ? 'బ్యాంక్ పాస్‌బుక్ కాపీ' : 'Bank passbook copy',
        selectedLanguage.code === 'hi' ? 'आय प्रमाण पत्र' : selectedLanguage.code === 'te' ? 'ఆదాయ ప్రమాణ పత్రం' : 'Income certificate'
      ]
    },
    {
      id: 3,
      title: selectedLanguage.code === 'hi' ? 'ऑनलाइन आवेदन' : selectedLanguage.code === 'te' ? 'ఆన్‌లైన్ దరఖాస్తు' : 'Online Application',
      description: selectedLanguage.code === 'hi' ? 'आधिकारिक वेबसाइट पर आवेदन करें' : selectedLanguage.code === 'te' ? 'అధికారిక వెబ్‌సైట్‌లో దరఖాస్తు చేయండి' : 'Apply on official website',
      duration: '30 mins',
      status: 'pending',
      icon: <MapPin className="w-5 h-5" />,
      details: [
        selectedLanguage.code === 'hi' ? 'व्यक्तिगत विवरण भरें' : selectedLanguage.code === 'te' ? 'వ్యక్తిగత వివరాలను పూరించండి' : 'Fill personal details',
        selectedLanguage.code === 'hi' ? 'दस्तावेज़ अपलोड करें' : selectedLanguage.code === 'te' ? 'పత్రాలను అప్‌లోడ్ చేయండి' : 'Upload documents',
        selectedLanguage.code === 'hi' ? 'आवेदन जमा करें' : selectedLanguage.code === 'te' ? 'దరఖాస్తును సమర్పించండి' : 'Submit application'
      ]
    },
    {
      id: 4,
      title: selectedLanguage.code === 'hi' ? 'सत्यापन प्रक्रिया' : selectedLanguage.code === 'te' ? 'ధృవీకరణ ప్రక్రియ' : 'Verification Process',
      description: selectedLanguage.code === 'hi' ? 'अधिकारियों द्वारा सत्यापन' : selectedLanguage.code === 'te' ? 'అధికారులచే ధృవీకరణ' : 'Verification by officials',
      duration: '7-15 days',
      status: 'pending',
      icon: <CheckCircle className="w-5 h-5" />,
      details: [
        selectedLanguage.code === 'hi' ? 'दस्तावेज़ों की जांच' : selectedLanguage.code === 'te' ? 'పత్రాల తనిఖీ' : 'Document verification',
        selectedLanguage.code === 'hi' ? 'फील्ड सत्यापन (यदि आवश्यक)' : selectedLanguage.code === 'te' ? 'క్షేత్ర ధృవీకరణ (అవసరమైతే)' : 'Field verification (if required)',
        selectedLanguage.code === 'hi' ? 'अनुमोदन प्रक्रिया' : selectedLanguage.code === 'te' ? 'ఆమోదం ప్రక్రియ' : 'Approval process'
      ]
    },
    {
      id: 5,
      title: selectedLanguage.code === 'hi' ? 'लाभ प्राप्ति' : selectedLanguage.code === 'te' ? 'ప్రయోజనం పొందడం' : 'Benefit Disbursement',
      description: selectedLanguage.code === 'hi' ? 'योजना का लाभ प्राप्त करें' : selectedLanguage.code === 'te' ? 'పథకం యొక్క ప్రయోజనాన్ని పొందండి' : 'Receive scheme benefits',
      duration: '1-3 days',
      status: 'pending',
      icon: <Phone className="w-5 h-5" />,
      details: [
        selectedLanguage.code === 'hi' ? 'बैंक खाते में राशि' : selectedLanguage.code === 'te' ? 'బ్యాంక్ ఖాతాలో మొత్తం' : 'Amount in bank account',
        selectedLanguage.code === 'hi' ? 'SMS पुष्टिकरण' : selectedLanguage.code === 'te' ? 'SMS నిర్ధారణ' : 'SMS confirmation',
        selectedLanguage.code === 'hi' ? 'लाभार्थी कार्ड' : selectedLanguage.code === 'te' ? 'లబ్ధిదారుల కార్డ్' : 'Beneficiary card'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedLanguage.code === 'hi' ? 'आवेदन प्रक्रिया' :
                   selectedLanguage.code === 'te' ? 'దరఖాస్తు ప్రక్రియ' :
                   'Application Process'}
                </h2>
                <p className="text-green-100">
                  {selectedLanguage.code === 'hi' ? 'चरणबद्ध आवेदन गाइड' :
                   selectedLanguage.code === 'te' ? 'దశల వారీ దరఖాస్తు గైడ్' :
                   'Step-by-step application guide'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {mockSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < mockSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className={`flex items-start space-x-4 p-6 rounded-xl border-2 transition-all duration-300 ${
                  step.status === 'completed' 
                    ? 'bg-green-50 border-green-200' 
                    : step.status === 'current'
                    ? 'bg-orange-50 border-orange-200 shadow-lg'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : step.status === 'current'
                      ? 'bg-orange-500 text-white animate-pulse'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.status === 'completed' ? 'text-green-800' :
                        step.status === 'current' ? 'text-orange-800' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        step.status === 'completed' ? 'bg-green-100 text-green-700' :
                        step.status === 'current' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            step.status === 'completed' ? 'bg-green-400' :
                            step.status === 'current' ? 'bg-orange-400' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {step.status === 'current' && (
                      <div className="mt-4">
                        <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                          {selectedLanguage.code === 'hi' ? 'इस चरण को पूरा करें' :
                           selectedLanguage.code === 'te' ? 'ఈ దశను పూర్తి చేయండి' :
                           'Complete This Step'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              {selectedLanguage.code === 'hi' ? 'सहायता चाहिए?' :
               selectedLanguage.code === 'te' ? 'సహాయం కావాలా?' :
               'Need Help?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">
                  {selectedLanguage.code === 'hi' ? 'हेल्पलाइन नंबर' :
                   selectedLanguage.code === 'te' ? 'హెల్ప్‌లైన్ నంబర్' :
                   'Helpline Number'}
                </h4>
                <p className="text-blue-600 font-mono text-lg">1800-XXX-XXXX</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">
                  {selectedLanguage.code === 'hi' ? 'ईमेल सहायता' :
                   selectedLanguage.code === 'te' ? 'ఇమెయిల్ సహాయం' :
                   'Email Support'}
                </h4>
                <p className="text-blue-600">help@voxtend.gov.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;