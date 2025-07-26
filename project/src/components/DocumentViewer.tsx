import React from 'react';
import { FileText, Download, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  format: string;
  sampleUrl?: string;
  status: 'required' | 'optional' | 'verified';
}

interface DocumentViewerProps {
  documents: string[];
  selectedLanguage: Language;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documents,
  selectedLanguage,
  onClose
}) => {
  const mockDocuments: Document[] = [
    {
      id: 'aadhaar',
      name: selectedLanguage.code === 'hi' ? 'आधार कार्ड' : selectedLanguage.code === 'te' ? 'ఆధార్ కార్డ్' : 'Aadhaar Card',
      description: selectedLanguage.code === 'hi' ? 'पहचान और पता प्रमाण के लिए' : selectedLanguage.code === 'te' ? 'గుర్తింపు మరియు చిరునామా రుజువు కోసం' : 'For identity and address verification',
      required: true,
      format: 'PDF/JPG',
      sampleUrl: '/sample-aadhaar.pdf',
      status: 'required'
    },
    {
      id: 'bank',
      name: selectedLanguage.code === 'hi' ? 'बैंक खाता विवरण' : selectedLanguage.code === 'te' ? 'బ్యాంక్ ఖాతా వివరాలు' : 'Bank Account Details',
      description: selectedLanguage.code === 'hi' ? 'पासबुक या बैंक स्टेटमेंट' : selectedLanguage.code === 'te' ? 'పాస్‌బుక్ లేదా బ్యాంక్ స్టేట్‌మెంట్' : 'Passbook or Bank Statement',
      required: true,
      format: 'PDF/JPG',
      sampleUrl: '/sample-bank.pdf',
      status: 'required'
    },
    {
      id: 'income',
      name: selectedLanguage.code === 'hi' ? 'आय प्रमाण पत्र' : selectedLanguage.code === 'te' ? 'ఆదాయ ప్రమాణ పత్రం' : 'Income Certificate',
      description: selectedLanguage.code === 'hi' ? 'तहसीलदार या SDM द्वारा जारी' : selectedLanguage.code === 'te' ? 'తహసీల్దార్ లేదా SDM జారీ చేసినది' : 'Issued by Tehsildar or SDM',
      required: true,
      format: 'PDF',
      sampleUrl: '/sample-income.pdf',
      status: 'required'
    },
    {
      id: 'land',
      name: selectedLanguage.code === 'hi' ? 'भूमि रिकॉर्ड' : selectedLanguage.code === 'te' ? 'భూమి రికార్డులు' : 'Land Records',
      description: selectedLanguage.code === 'hi' ? 'खाता/खसरा नंबर' : selectedLanguage.code === 'te' ? 'ఖాతా/ఖసరా నంబర్' : 'Khata/Khesra Number',
      required: false,
      format: 'PDF/JPG',
      sampleUrl: '/sample-land.pdf',
      status: 'optional'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedLanguage.code === 'hi' ? 'आवश्यक दस्तावेज़' :
                   selectedLanguage.code === 'te' ? 'అవసరమైన పత్రాలు' :
                   'Required Documents'}
                </h2>
                <p className="text-orange-100">
                  {selectedLanguage.code === 'hi' ? 'आवेदन के लिए आवश्यक दस्तावेजों की सूची' :
                   selectedLanguage.code === 'te' ? 'దరఖాస్తు కోసం అవసరమైన పత్రాల జాబితా' :
                   'List of documents needed for application'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      doc.status === 'required' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <FileText className={`w-6 h-6 ${
                        doc.status === 'required' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.format}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'required' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {doc.status === 'required' 
                      ? (selectedLanguage.code === 'hi' ? 'आवश्यक' : selectedLanguage.code === 'te' ? 'అవసరం' : 'Required')
                      : (selectedLanguage.code === 'hi' ? 'वैकल्पिक' : selectedLanguage.code === 'te' ? 'ఐచ్ఛికం' : 'Optional')
                    }
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{doc.description}</p>

                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {selectedLanguage.code === 'hi' ? 'नमूना देखें' :
                     selectedLanguage.code === 'te' ? 'నమూనా చూడండి' :
                     'View Sample'}
                  </button>
                  <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    {selectedLanguage.code === 'hi' ? 'डाउनलोड' :
                     selectedLanguage.code === 'te' ? 'డౌన్‌లోడ్' :
                     'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {selectedLanguage.code === 'hi' ? 'महत्वपूर्ण सुझाव' :
               selectedLanguage.code === 'te' ? 'ముఖ్యమైన చిట్కాలు' :
               'Important Tips'}
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {selectedLanguage.code === 'hi' ? 'सभी दस्तावेज़ स्पष्ट और पढ़ने योग्य होने चाहिए' :
                   selectedLanguage.code === 'te' ? 'అన్ని పత్రాలు స్పష్టంగా మరియు చదవగలిగేలా ఉండాలి' :
                   'All documents should be clear and readable'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {selectedLanguage.code === 'hi' ? 'दस्तावेज़ों की फोटोकॉपी और मूल दोनों रखें' :
                   selectedLanguage.code === 'te' ? 'పత్రాల ఫోటోకాపీ మరియు అసలు రెండూ ఉంచండి' :
                   'Keep both photocopies and originals of documents'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {selectedLanguage.code === 'hi' ? 'आधार कार्ड में मोबाइल नंबर लिंक होना आवश्यक है' :
                   selectedLanguage.code === 'te' ? 'ఆధార్ కార్డ్‌తో మొబైల్ నంబర్ లింక్ చేయాలి' :
                   'Mobile number must be linked with Aadhaar card'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;