import { Language, WelfareScheme, AIResponse } from '../types';

// Simple language detection based on script and common words
export const detectLanguage = (text: string): Language | null => {
  // Check for Devanagari script (Hindi/Marathi)
  if (/[\u0900-\u097F]/.test(text)) {
    return { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', speechCode: 'hi-IN' };
  }
  
  // Check for Telugu script
  if (/[\u0C00-\u0C7F]/.test(text)) {
    return { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' };
  }
  
  // Check for Tamil script
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' };
  }
  
  // Check for Bengali script
  if (/[\u0980-\u09FF]/.test(text)) {
    return { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' };
  }
  
  return null;
};

// Simulate AI processing with predefined responses
export const processUserQuery = async (
  query: string, 
  language: Language, 
  schemes: WelfareScheme[]
): Promise<AIResponse> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuery = query.toLowerCase();
  
  // Find relevant scheme based on keywords
  const relevantScheme = schemes.find(scheme => 
    scheme.keywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    )
  );
  
  // Generate response based on query intent
  if (relevantScheme) {
    return generateSchemeResponse(relevantScheme, language, lowerQuery);
  }
  
  // Handle general queries
  if (lowerQuery.includes('eligibility') || lowerQuery.includes('पात्रता') || lowerQuery.includes('అర్హత')) {
    return generateEligibilityResponse(language);
  }
  
  if (lowerQuery.includes('document') || lowerQuery.includes('दस्तावेज') || lowerQuery.includes('పత్రాలు')) {
    return generateDocumentResponse(language);
  }
  
  if (lowerQuery.includes('apply') || lowerQuery.includes('आवेदन') || lowerQuery.includes('దరఖాస్తు')) {
    return generateApplicationResponse(language);
  }
  
  // Default response
  return generateDefaultResponse(language, schemes);
};

const generateSchemeResponse = (scheme: WelfareScheme, language: Language, query: string): AIResponse => {
  if (language.code === 'hi') {
    if (query.includes('पात्रता') || query.includes('eligible')) {
      return {
        text: `${scheme.name} के लिए पात्रता: ${scheme.eligibilityDetails.join(', ')}। क्या आप इन शर्तों को पूरा करते हैं?`,
        scheme
      };
    }
    if (query.includes('दस्तावेज') || query.includes('document')) {
      return {
        text: `${scheme.name} के लिए आवश्यक दस्तावेज: ${scheme.documents.join(', ')}। क्या आपके पास ये सभी दस्तावेज हैं?`,
        scheme
      };
    }
    return {
      text: `${scheme.name} के बारे में: ${scheme.description}। लाभ: ${scheme.benefits}। क्या आपको इस योजना के बारे में और जानकारी चाहिए?`,
      scheme
    };
  }
  
  if (language.code === 'te') {
    if (query.includes('అర్హత') || query.includes('eligible')) {
      return {
        text: `${scheme.name} కోసం అర్హత: ${scheme.eligibilityDetails.join(', ')}. మీరు ఈ షరతులను తీర్చుతున్నారా?`,
        scheme
      };
    }
    if (query.includes('పత్రాలు') || query.includes('document')) {
      return {
        text: `${scheme.name} కోసం అవసరమైన పత్రాలు: ${scheme.documents.join(', ')}. మీ దగ్గర ఈ పత్రాలన్నీ ఉన్నాయా?`,
        scheme
      };
    }
    return {
      text: `${scheme.name} గురించి: ${scheme.description}. ప్రయోజనాలు: ${scheme.benefits}. ఈ పథకం గురించి మరింత సమాచారం కావాలా?`,
      scheme
    };
  }
  
  // English
  if (query.includes('eligib')) {
    return {
      text: `Eligibility for ${scheme.name}: ${scheme.eligibilityDetails.join(', ')}. Do you meet these criteria?`,
      scheme
    };
  }
  if (query.includes('document')) {
    return {
      text: `Required documents for ${scheme.name}: ${scheme.documents.join(', ')}. Do you have all these documents?`,
      scheme
    };
  }
  return {
    text: `About ${scheme.name}: ${scheme.description}. Benefits: ${scheme.benefits}. Would you like to know more about this scheme?`,
    scheme
  };
};

const generateEligibilityResponse = (language: Language): AIResponse => {
  if (language.code === 'hi') {
    return {
      text: 'पात्रता जांचने के लिए कृपया बताएं कि आप किस योजना के बारे में जानना चाहते हैं? जैसे PM-KISAN, आयुष्मान भारत, या उज्ज्वला योजना।'
    };
  }
  if (language.code === 'te') {
    return {
      text: 'అర్హత తనిఖీ చేయడానికి దయచేసి మీరు ఏ పథకం గురించి తెలుసుకోవాలనుకుంటున్నారో చెప్పండి? PM-KISAN, ఆయుష్మాన్ భారత్, లేదా ఉజ్జ్వల పథకం వంటివి.'
    };
  }
  return {
    text: 'To check eligibility, please tell me which scheme you want to know about. For example: PM-KISAN, Ayushman Bharat, or Ujjwala Yojana.'
  };
};

const generateDocumentResponse = (language: Language): AIResponse => {
  if (language.code === 'hi') {
    return {
      text: 'आवश्यक दस्तावेजों की जानकारी के लिए कृपया बताएं कि आप किस योजना के लिए आवेदन करना चाहते हैं। अधिकांश योजनाओं के लिए आधार कार्ड, बैंक खाता विवरण और आय प्रमाण पत्र आवश्यक होते हैं।'
    };
  }
  if (language.code === 'te') {
    return {
      text: 'అవసరమైన పత్రాల సమాచారం కోసం దయచేసి మీరు ఏ పథకం కోసం దరఖాస్తు చేయాలనుకుంటున్నారో చెప్పండి. చాలా పథకాలకు ఆధార్ కార్డ్, బ్యాంక్ ఖాతా వివరాలు మరియు ఆదాయ ప్రమాణ పత్రం అవసరం.'
    };
  }
  return {
    text: 'For document requirements, please tell me which scheme you want to apply for. Most schemes require Aadhaar Card, Bank Account details, and Income Certificate.'
  };
};

const generateApplicationResponse = (language: Language): AIResponse => {
  if (language.code === 'hi') {
    return {
      text: 'आवेदन प्रक्रिया के लिए कृपया बताएं कि आप किस योजना के लिए आवेदन करना चाहते हैं। मैं आपको चरणबद्ध तरीके से पूरी प्रक्रिया बताऊंगा।'
    };
  }
  if (language.code === 'te') {
    return {
      text: 'దరఖాస్తు ప్రక్రియ కోసం దయచేసి మీరు ఏ పథకం కోసం దరఖాస్తు చేయాలనుకుంటున్నారో చెప్పండి. నేను మీకు దశల వారీగా మొత్తం ప్రక్రియను వివరిస్తాను.'
    };
  }
  return {
    text: 'For the application process, please tell me which scheme you want to apply for. I will guide you through the complete step-by-step process.'
  };
};

const generateDefaultResponse = (language: Language, schemes: WelfareScheme[]): AIResponse => {
  const popularSchemes = schemes.slice(0, 3).map(s => s.name).join(', ');
  
  if (language.code === 'hi') {
    return {
      text: `मैं आपको सरकारी योजनाओं के बारे में जानकारी दे सकता हूं। कुछ लोकप्रिय योजनाएं हैं: ${popularSchemes}। आप किस योजना के बारे में जानना चाहते हैं?`
    };
  }
  if (language.code === 'te') {
    return {
      text: `నేను మీకు ప్రభుత్వ పథకాల గురించి సమాచారం ఇవ్వగలను. కొన్ని ప్రముఖ పథకాలు: ${popularSchemes}. మీరు ఏ పథకం గురించి తెలుసుకోవాలనుకుంటున్నారు?`
    };
  }
  return {
    text: `I can help you with information about government welfare schemes. Some popular schemes include: ${popularSchemes}. Which scheme would you like to know about?`
  };
};