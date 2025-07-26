import React from 'react';
import { X, Users, DollarSign, FileText, Clock, MapPin, Phone, CheckCircle, AlertTriangle } from 'lucide-react';
import { WelfareScheme, Language } from '../types';

interface SchemeDetailsProps {
  scheme: WelfareScheme;
  selectedLanguage: Language;
  onClose: () => void;
  onViewDocuments: () => void;
  onViewProcess: () => void;
}

const SchemeDetails: React.FC<SchemeDetailsProps> = ({
  scheme,
  selectedLanguage,
  onClose,
  onViewDocuments,
  onViewProcess
}) => {
  const mockStats = {
    beneficiaries: '12.5 Crore',
    budget: '₹75,000 Crore',
    successRate: '94%',
    avgProcessingTime: '15 days'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{scheme.name}</h2>
                  <p className="text-blue-100">{scheme.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 text-2xl font-bold"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs opacity-80">
                  {selectedLanguage.code === 'hi' ? 'लाभार्थी' :
                   selectedLanguage.code === 'te' ? 'లబ్ధిదారులు' :
                   'Beneficiaries'}
                </p>
                <p className="font-bold">{mockStats.beneficiaries}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                <DollarSign className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs opacity-80">
                  {selectedLanguage.code === 'hi' ? 'बजट' :
                   selectedLanguage.code === 'te' ? 'బడ్జెట్' :
                   'Budget'}
                </p>
                <p className="font-bold">{mockStats.budget}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs opacity-80">
                  {selectedLanguage.code === 'hi' ? 'सफलता दर' :
                   selectedLanguage.code === 'te' ? 'విజయ రేటు' :
                   'Success Rate'}
                </p>
                <p className="font-bold">{mockStats.successRate}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs opacity-80">
                  {selectedLanguage.code === 'hi' ? 'प्रसंस्करण समय' :
                   selectedLanguage.code === 'te' ? 'ప్రాసెసింగ్ సమయం' :
                   'Processing Time'}
                </p>
                <p className="font-bold">{mockStats.avgProcessingTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  {selectedLanguage.code === 'hi' ? 'योजना विवरण' :
                   selectedLanguage.code === 'te' ? 'పథకం వివరాలు' :
                   'Scheme Description'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  {selectedLanguage.code === 'hi' ? 'लाभ' :
                   selectedLanguage.code === 'te' ? 'ప్రయోజనాలు' :
                   'Benefits'}
                </h3>
                <p className="text-green-700 font-medium text-lg">{scheme.benefits}</p>
              </div>

              {/* Eligibility */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {selectedLanguage.code === 'hi' ? 'पात्रता मानदंड' :
                   selectedLanguage.code === 'te' ? 'అర్హత ప్రమాణాలు' :
                   'Eligibility Criteria'}
                </h3>
                <div className="space-y-3">
                  {scheme.eligibilityDetails.map((criteria, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-700">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Group */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {selectedLanguage.code === 'hi' ? 'लक्षित समूह' :
                   selectedLanguage.code === 'te' ? 'లక్ష్య సమూహం' :
                   'Target Group'}
                </h3>
                <p className="text-orange-700">{scheme.targetGroup}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedLanguage.code === 'hi' ? 'त्वरित कार्य' :
                   selectedLanguage.code === 'te' ? 'త్వరిత చర్యలు' :
                   'Quick Actions'}
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={onViewDocuments}
                    className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {selectedLanguage.code === 'hi' ? 'आवश्यक दस्तावेज़' :
                     selectedLanguage.code === 'te' ? 'అవసరమైన పత్రాలు' :
                     'Required Documents'}
                  </button>
                  <button
                    onClick={onViewProcess}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedLanguage.code === 'hi' ? 'आवेदन प्रक्रिया' :
                     selectedLanguage.code === 'te' ? 'దరఖాస్తు ప్రక్రియ' :
                     'Application Process'}
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedLanguage.code === 'hi' ? 'अभी आवेदन करें' :
                     selectedLanguage.code === 'te' ? 'ఇప్పుడే దరఖాస్తు చేయండి' :
                     'Apply Now'}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  {selectedLanguage.code === 'hi' ? 'संपर्क जानकारी' :
                   selectedLanguage.code === 'te' ? 'సంప్రదింపు సమాచారం' :
                   'Contact Information'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{scheme.contactInfo}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {selectedLanguage.code === 'hi' ? 'निकटतम CSC केंद्र' :
                       selectedLanguage.code === 'te' ? 'సమీప CSC కేంద్రం' :
                       'Nearest CSC Center'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {selectedLanguage.code === 'hi' ? 'महत्वपूर्ण सूचना' :
                   selectedLanguage.code === 'te' ? 'ముఖ్యమైన నోటీసు' :
                   'Important Notice'}
                </h3>
                <p className="text-yellow-700 text-sm">
                  {selectedLanguage.code === 'hi' ? 'कृपया केवल आधिकारिक वेबसाइट के माध्यम से आवेदन करें। किसी भी धोखाधड़ी से बचें।' :
                   selectedLanguage.code === 'te' ? 'దయచేసి అధికారిక వెబ్‌సైట్ ద్వారా మాత్రమే దరఖాస్తు చేయండి. ఏదైనా మోసం నుండి దూరంగా ఉండండి.' :
                   'Please apply only through official website. Beware of any fraud.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;