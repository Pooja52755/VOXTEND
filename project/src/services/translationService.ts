export interface Language {
  code: string;          // ISO 639-1 language code (e.g., 'en', 'hi', 'te')
  name: string;          // English name of the language
  nativeName: string;    // Native name of the language
  speechCode: string;    // Code used for speech recognition/synthesis (may differ from ISO code)
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechCode: 'or-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', speechCode: 'ur-PK' },
];

const translations: Record<string, Record<string, string>> = {
  // Welcome Messages
  welcome: {
    en: "Hello! I'm VOXTEND, your digital welfare companion. I'm here to help you access government welfare schemes easily.",
    hi: "नमस्कार! मैं VOXTEND हूं, आपका डिजिटल कल्याण सहायक। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने में मदद करूंगा।",
    te: "నమస్కారం! నేను VOXTEND, మీ డిజిటల్ కల్యాణ సహాయకుడిని. ప్రభుత్వ పథకాల గురించి మీకు సహాయం చేస్తాను.",
    ta: "வணக்கம்! நான் VOXTEND, உங்கள் டிஜிட்டல் நல்வாழ்வு உதவியாளர். அரசு நலத்திட்டங்களை அணுக உதவுகிறேன்.",
    bn: "নমস্কার! আমি VOXTEND, আপনার ডিজিটাল কল্যাণ সহায়ক। সরকারি কল্যাণমূলক প্রকল্পে অ্যাক্সেস পেতে আমি আপনাকে সাহায্য করতে এখানে আছি।",
    mr: "नमस्कार! मी VOXTEND, तुमचा डिजिटल कल्याण सहायक. सरकारी योजनांबद्दल माहिती मिळविण्यासाठी मी तुमच्या मदतीला आहे.",
    gu: "નમસ્તે! હું VOXTEND છું, તમારો ડિજિટલ કલ્યાણ સહાયક. સરકારી યોજનાઓ સુધી પહોંચવામાં હું તમારી સહાય કરીશ.",
    kn: "ನಮಸ್ಕಾರ! ನಾನು VOXTEND, ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕಲ್ಯಾಣ ಸಹಾಯಕ. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಪ್ರವೇಶಿಸಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ.",
    ml: "നമസ്കാരം! ഞാൻ VOXTEND ആണ്, നിങ്ങളുടെ ഡിജിറ്റൽ ക്ഷേമ സഹായി. സർക്കാർ ക്ഷേമ പദ്ധതികളിലേക്ക് പ്രവേശിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.",
    pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ VOXTEND ਹਾਂ, ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਕਲਿਆਣ ਸਹਾਇਕ। ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਵਿੱਚ ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗਾ।",
    or: "ନମସ୍କାର! ମୁଁ VOXTEND, ଆପଣଙ୍କର ଡିଜିଟାଲ୍ କଲ୍ୟାଣ ସାହାଯ୍ୟକାରୀ। ସରକାରୀ ଯୋଜନାଗୁଡ଼ିକୁ ଆସିବାରେ ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଆସିଛି।",
    ur: "السلام علیکم! میں VOXTEND ہوں، آپ کا ڈیجیٹل بہبود کا ساتھی۔ سرکاری فلاحی اسکیموں تک رسائی حاصل کرنے میں آپ کی مدد کے لیے میں یہاں موجود ہوں۔"
  },
  
  // UI Elements
  listen: {
    en: "Start Listening",
    hi: "सुनना शुरू करें",
    te: "వినడం ప్రారంభించండి",
    ta: "கேட்கத் தொடங்கு",
    bn: "শুনতে শুরু করুন",
    mr: "ऐकणे सुरू करा",
    gu: "સાંભળવાનું શરૂ કરો",
    kn: "ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ",
    ml: "കേൾക്കാൻ തുടങ്ങുക",
    pa: "ਸੁਣਨਾ ਸ਼ੁਰੂ ਕਰੋ",
    or: "ଶୁଣିବା ଆରମ୍ଭ କରନ୍ତୁ",
    ur: "سننا شروع کریں"
  },
  
  stopListening: {
    en: "Stop Listening",
    hi: "सुनना बंद करें",
    te: "వినడం ఆపండి",
    ta: "நிறுத்து கேட்கிறது",
    bn: "শোনা বন্ধ করুন",
    mr: "ऐकणे थांबवा",
    gu: "સાંભળવાનું બંધ કરો",
    kn: "ಆಲಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
    ml: "കേൾക്കുന്നത് നിർത്തുക",
    pa: "ਸੁਣਨਾ ਬੰਦ ਕਰੋ",
    or: "ଶୁଣିବା ବନ୍ଦ କରନ୍ତୁ",
    ur: "سننا بند کریں"
  },
  
  // Add more UI text translations here as needed
};

export function getTranslation(key: string, languageCode: string): string {
  const language = languageCode.split('-')[0]; // Handle language codes like 'en-US'
  return translations[key]?.[language] || translations[key]?.['en'] || key;
}

export function getCurrentLanguage(languageCode: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode) || SUPPORTED_LANGUAGES[0];
}
