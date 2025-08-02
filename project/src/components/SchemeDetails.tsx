import React, { useState, useEffect } from 'react';
import { X, FileText, Phone, AlertTriangle } from 'lucide-react';
import { WelfareScheme, Language } from '../types';
import { generateResponse } from '../utils/geminiClient';

interface SchemeDetailsProps {
  scheme: WelfareScheme;
  selectedLanguage: Language;
  onClose: () => void;
}

const SchemeDetails: React.FC<SchemeDetailsProps> = ({
  scheme,
  selectedLanguage,
  onClose
}) => {
  const [translatedScheme, setTranslatedScheme] = useState<WelfareScheme>(scheme);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateScheme = async () => {
      if (selectedLanguage.code === 'en') {
        setTranslatedScheme(scheme);
        return;
      }

      setIsTranslating(true);
      try {
        const toTranslate = {
          description: scheme.description,
          benefits: scheme.benefits,
          howToApply: scheme.howToApply,
        };

        const prompt = `Translate the following JSON values to ${selectedLanguage.name}. Respond with only the translated JSON object, keeping the same keys. Do not include any other text or explanations. JSON: ${JSON.stringify(toTranslate)}`;
        
        const response = await generateResponse(prompt, selectedLanguage.code);
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}') + 1;
        const jsonStr = response.substring(jsonStart, jsonEnd);
        const translatedContent = JSON.parse(jsonStr);

        setTranslatedScheme({ ...scheme, ...translatedContent });
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedScheme(scheme); // Fallback to original
      } finally {
        setIsTranslating(false);
      }
    };

    translateScheme();
  }, [scheme, selectedLanguage]);

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
            

          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-blue-600" />
                  Scheme Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{isTranslating ? 'Translating...' : translatedScheme.description}</p>
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-green-600" />
                  Benefits
                </h3>
                <p className="text-gray-700 leading-relaxed">{isTranslating ? 'Translating...' : translatedScheme.benefits}</p>
              </div>

              {/* How to Apply */}
              {scheme.howToApply && scheme.howToApply.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-purple-600" />
                    How to Apply
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    {translatedScheme.howToApply.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents */}
              {scheme.documents && scheme.documents.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-red-600" />
                    Required Documents
                  </h3>
                  <ul className="space-y-2">
                    {scheme.documents.map((doc, index) => (
                      <li key={index} className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-gray-800 font-medium">{doc.name}</span>
                        <div className="flex items-center space-x-4">
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">View</a>
                          <a href={doc.url} download className="text-sm font-medium text-green-600 hover:underline">Download</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Actions */}


              {/* Contact Info */}
              {scheme.contact && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-green-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-700 font-medium">{scheme.contact.name}</p>
                    {scheme.contact.number && <p className="text-gray-700">Phone: {scheme.contact.number}</p>}
                    {scheme.contact.email && <p className="text-gray-700">Email: {scheme.contact.email}</p>}
                  </div>
                </div>
              )}

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