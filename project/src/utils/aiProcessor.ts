import { Language, WelfareScheme, AIResponse } from '../types';
import { generateResponse } from './geminiClient';

// Define conversation message type for better type safety
type ConversationMessage = {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

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
  if (/[ঀ-৿]/.test(text)) {
    return { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' };
  }

  // Check for Urdu script (Arabic)
  if (/[؀-ۿ]/.test(text)) {
    return { code: 'ur', name: 'Urdu', nativeName: 'اردو', speechCode: 'ur-IN' };
  }

  // Check for Odia script
  if (/[଀-୿]/.test(text)) {
    return { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechCode: 'or-IN' };
  }
  
  return null;
};

// Process user query using Gemini AI
export const processUserQuery = async (
  query: string, 
  language: Language, 
  schemes: WelfareScheme[],
  conversationHistory: ConversationMessage[] = []
): Promise<AIResponse> => {
  try {
    // Find relevant scheme based on keywords
    const queryWords = query.toLowerCase().split(/\s+/);
    const relevantScheme = schemes.find(scheme => 
      queryWords.some(word => 
        word.length > 2 && // Ignore short words
        (scheme.name.toLowerCase().includes(word) ||
        scheme.description.toLowerCase().includes(word))
      )
    );

    // Get the last 5 messages for context (to avoid too much history)
    const recentMessages = conversationHistory.slice(-5);
    
    // Create a context string from recent messages
    const context = recentMessages.map(msg => 
      `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
    ).join('\n');
    
    // Add the current query to the context
    const fullContext = context ? `${context}\nUser: ${query}` : `User: ${query}`;

    // Prepare the prompt with context and relevant scheme info
    let prompt = fullContext;
    
    if (relevantScheme) {
      prompt += `\n\nRelevant scheme information:
      
Name: ${relevantScheme.name}
Description: ${relevantScheme.description}
Eligibility: ${relevantScheme.eligibilityDetails.join(', ')}
Documents Required: ${relevantScheme.documents.join(', ')}

Please respond in ${language.name} language.`;
    } else {
      prompt += `\n\nPlease respond in ${language.name} language.`;
    }
    
    // Generate response using Gemini
    const response = await generateResponse(prompt, language.code);

    // Clean the response by removing asterisks for smoother TTS
    const cleanedText = response.replace(/\*/g, '');

    return {
      text: cleanedText,
      scheme: relevantScheme || undefined
    };
  } catch (error) {
    console.error('Error processing query with Gemini:', error);
    
    // Fallback to simple response if Gemini fails
    const fallbackResponses: Record<string, string> = {
      'hi': 'क्षमा करें, मुझे आपकी बात समझने में समस्या हुई। कृपया फिर से कोशिश करें।',
      'te': 'క్షమించండి, మీ విన్నపాన్ని అర్థం చేసుకోవడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      'ta': 'மன்னிக்கவும், உங்கள் கோரிக்கையைப் புரிந்துகொள்ள சிக்கல் ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      'bn': 'দুঃখিত, আপনার অনুরোধ বোঝার সময় একটি সমস্যা হয়েছে। অনুগ্রহপূর্বক আবার চেষ্টা করুন।',
      'ur': 'معذرت، آپ کی درخواست پر کارروائی کرنے میں ایک مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔',
      'or': 'ଦୁଃଖିତ, ଆପଣଙ୍କ ଅନୁରୋଧ ପ୍ରକ୍ରିୟାକରଣରେ ଏକ ସମସ୍ୟା ଦେଖାଗଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
    };
    
    return {
      text: fallbackResponses[language.code] || 'Sorry, I encountered an issue processing your request. Please try again.',
      scheme: undefined
    };
  }
};


// Export the type for use in other files
export type { ConversationMessage };