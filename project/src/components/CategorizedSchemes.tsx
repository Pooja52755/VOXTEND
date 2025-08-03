import React, { useState } from 'react';
import { addReminder } from '../utils/reminderManager';
import { Users, MapPin, Timer } from 'lucide-react';
import { WelfareScheme, Language } from '../types';
import SchemeDetails from './SchemeDetails';


interface CategorizedSchemesProps {
  schemes: WelfareScheme[];
  selectedLanguage: Language;
}

// Mock deadlines for demonstration
const mockDeadlines: { schemeId: string; deadline: Date }[] = [
  { schemeId: 'pm-kisan', deadline: new Date('2025-08-30') },
  { schemeId: 'ayushman-bharat', deadline: new Date('2025-09-15') },
  { schemeId: 'ujjwala', deadline: new Date('2025-07-31') },
];

const getCategoryTranslations = (lang: string) => ({
  'All': {
    en: 'All',
    hi: 'सभी',
    te: 'అన్నీ',
    ta: 'அனைத்தும்',
    bn: 'সব',
    mr: 'सर्व',
    gu: 'બધા',
    kn: 'ಎಲ್ಲಾ',
    ml: 'എല്ലാം',
    pa: 'ਸਾਰੇ',
    or: 'ସମସ୍ତ',
    ur: 'سب'
  },
  'Agriculture': {
    en: 'Agriculture',
    hi: 'कृषि',
    te: 'వ్యవసాయం',
    ta: 'விவசாயம்',
    bn: 'কৃষি',
    mr: 'शेती',
    gu: 'ખેતી',
    kn: 'ಕೃಷಿ',
    ml: 'കാർഷികം',
    pa: 'ਖੇਤੀਬਾੜੀ',
    or: 'କୃଷି',
    ur: 'زراعت'
  },
  'Healthcare': {
    en: 'Healthcare',
    hi: 'स्वास्थ्य सेवा',
    te: 'ఆరోగ్య సంరక్షణ',
    ta: 'ஆரோக்கிய பராமரிப்பு',
    bn: 'স্বাস্থ্যসেবা',
    mr: 'आरोग्यसेवा',
    gu: 'આરોગ્યસેવા',
    kn: 'ಆರೋಗ್ಯ ಸೇವೆಗಳು',
    ml: 'ആരോഗ്യസംരക്ഷണം',
    pa: 'ਸਿਹਤ ਸੰਭਾਲ',
    or: 'ସ୍ୱାସ୍ଥ୍ୟ ସେବା',
    ur: 'صحت کی دیکھ بھال'
  },
  'Education': {
    en: 'Education',
    hi: 'शिक्षा',
    te: 'విద్య',
    ta: 'கல்வி',
    bn: 'শিক্ষা',
    mr: 'शिक्षण',
    gu: 'શિક્ષણ',
    kn: 'ಶಿಕ್ಷಣ',
    ml: 'വിദ്യാഭ്യാസം',
    pa: 'ਸਿੱਖਿਆ',
    or: 'ଶିକ୍ଷା',
    ur: 'تعلیم'
  },
  'Housing': {
    en: 'Housing',
    hi: 'आवास',
    te: 'వసతి',
    ta: 'வீடமைப்பு',
    bn: 'বাসস্থান',
    mr: 'गृहनिर्माण',
    gu: 'રહેણાંક',
    kn: 'ವಸತಿ',
    ml: 'വസതി',
    pa: 'ਰਿਹਾਇਸ਼',
    or: 'ବାସସ୍ଥାନ',
    ur: 'رہائش'
  },
  'Energy': {
    en: 'Energy',
    hi: 'ऊर्जा',
    te: 'శక్తి',
    ta: 'ஆற்றல்',
    bn: 'শক্তি',
    mr: 'ऊर्जा',
    gu: 'ઊર્જા',
    kn: 'ಶಕ್ತಿ',
    ml: 'ഊർജ്ജം',
    pa: 'ਊਰਜਾ',
    or: 'ଶକ୍ତି',
    ur: 'توانائی'
  },
  'Employment': {
    en: 'Employment',
    hi: 'रोजगार',
    te: 'ఉపాధి',
    ta: 'தொழில்',
    bn: 'চাকরি',
    mr: 'रोजगार',
    gu: 'રોજગારી',
    kn: 'ಉದ್ಯೋಗ',
    ml: 'ജോലി',
    pa: 'ਰੁਜ਼ਗਾਰ',
    or: 'କର୍ମସଂସ୍ଥାନ',
    ur: 'ملازمت'
  },
  'Social Security': {
    en: 'Social Security',
    hi: 'सामाजिक सुरक्षा',
    te: 'సామాజిక భద్రత',
    ta: 'சமூக பாதுகாப்பு',
    bn: 'সামাজিক সুরক্ষা',
    mr: 'सामाजिक सुरक्षा',
    gu: 'સામાજિક સુરક્ષા',
    kn: 'ಸಾಮಾಜಿಕ ಭದ್ರತೆ',
    ml: 'സാമൂഹ്യ സുരക്ഷ',
    pa: 'ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ',
    or: 'ସାମାଜିକ ସୁରକ୍ଷା',
    ur: 'سماجی تحفظ'
  },
  'Financial Inclusion': {
    en: 'Financial Inclusion',
    hi: 'वित्तीय समावेशन',
    te: 'ఫైనాన్షియల్ ఇంక్లూజన్',
    ta: 'நிதி உள்ளடக்கம்',
    bn: 'আর্থিক অন্তর্ভুক্তি',
    mr: 'आर्थिक समावेशन',
    gu: 'ફાયનાન્સિયલ ઇન્ક્લુઝન',
    kn: 'ಹಣಕಾಸು ಸೇರ್ಪಡೆ',
    ml: 'ഫിനാൻഷ്യൽ ഇൻക്ലൂഷൻ',
    pa: 'ਵਿੱਤੀ ਸ਼ਾਮਲੀਕਰਨ',
    or: 'ଆର୍ଥିକ ସମାବେଶ',
    ur: 'مالی شمولیت'
  }
});

const CategorizedSchemes: React.FC<CategorizedSchemesProps> = ({
  schemes,
  selectedLanguage,
}) => {
  const categoryTranslations = getCategoryTranslations(selectedLanguage.code);
  const categories = Object.keys(categoryTranslations) as Array<keyof typeof categoryTranslations>;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<WelfareScheme | null>(null);

  const filteredSchemes = schemes.filter(scheme => {
    const categoryMatch = selectedCategory === 'All' || scheme.category === selectedCategory;
    const searchMatch = (
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return categoryMatch && searchMatch;
  });

  const getDaysUntilDeadline = (schemeId: string): number | null => {
    const deadline = mockDeadlines.find(d => d.schemeId === schemeId);
    if (!deadline) return null;
    
    const today = new Date();
    const daysLeft = Math.ceil((deadline.deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const isUrgent = (days: number | null): boolean => {
    return days !== null && days <= 30;
  };

  return (
    <div>
      {/* Category and Search Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {selectedLanguage.code === 'hi' ? 'योजनाएं ब्राउज़ करें' :
             selectedLanguage.code === 'te' ? 'పథకాలను బ్రౌజ్ చేయండి' :
             'Browse Schemes'}
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder={
                selectedLanguage.code === 'hi' ? 'योजना खोजें...' :
                selectedLanguage.code === 'te' ? 'పథకాల కోసం శోధించండి...' :
                'Search schemes...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 border rounded-full w-64 focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {selectedLanguage.code === 'hi' ? category : 
               selectedLanguage.code === 'te' ? category :
               category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="mt-4 mb-6">
          <h4 className="text-lg font-semibold text-gray-800">
              {selectedCategory === 'All' ? (
                selectedLanguage.code === 'hi' ? 'सभी योजनाएं' :
                selectedLanguage.code === 'te' ? 'అన్ని పథకాలు' :
                selectedLanguage.code === 'ta' ? 'அனைத்து திட்டங்கள்' :
                selectedLanguage.code === 'bn' ? 'সমস্ত স্কিম' :
                selectedLanguage.code === 'mr' ? 'सर्व योजना' :
                selectedLanguage.code === 'gu' ? 'બધી યોજનાઓ' :
                selectedLanguage.code === 'kn' ? 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು' :
                selectedLanguage.code === 'ml' ? 'എല്ലാ പദ്ധതികളും' :
                selectedLanguage.code === 'pa' ? 'ਸਾਰੀਆਂ ਸਕੀਮਾਂ' :
                selectedLanguage.code === 'or' ? 'ସମସ୍ତ ଯୋଜନା' :
                selectedLanguage.code === 'ur' ? 'تمام اسکیمیں' :
                'All Schemes'
              ) : (
                `${categoryTranslations[selectedCategory as keyof typeof categoryTranslations][selectedLanguage.code as keyof typeof categoryTranslations.All] || selectedCategory} ` +
                (selectedLanguage.code === 'hi' ? 'योजनाएं' :
                selectedLanguage.code === 'te' ? 'పథకాలు' :
                selectedLanguage.code === 'ta' ? 'த்திட்டங்கள்' :
                selectedLanguage.code === 'bn' ? 'স্কিম' :
                selectedLanguage.code === 'mr' ? 'योजना' :
                selectedLanguage.code === 'gu' ? 'યોજનાઓ' :
                selectedLanguage.code === 'kn' ? 'ಯೋಜನೆಗಳು' :
                selectedLanguage.code === 'ml' ? 'പദ്ധതികൾ' :
                selectedLanguage.code === 'pa' ? 'ਸਕੀਮਾਂ' :
                selectedLanguage.code === 'or' ? 'ଯୋଜନା' :
                selectedLanguage.code === 'ur' ? 'اسکیمیں' :
                'Schemes')
              )}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} onClick={() => setSelectedScheme(scheme)} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden border border-gray-200 group p-5 cursor-pointer">
                <h3 className="font-bold text-gray-800 text-lg leading-tight">
                  {scheme.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mt-2 flex-grow">
                  {scheme.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{scheme.targetGroup}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{scheme.category}</span>
                    </div>
                  {scheme.benefits && (
                    <div className="flex items-center text-green-700">
                        <span className="text-xl mr-2">💰</span>
                        <span>{scheme.benefits}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {getDaysUntilDeadline(scheme.id) !== null && getDaysUntilDeadline(scheme.id)! > 0 && (
                      <div className={`flex items-center text-xs ${isUrgent(getDaysUntilDeadline(scheme.id)) ? 'text-red-600 font-semibold' : 'text-blue-600'}`}>
                        <Timer className="w-4 h-4 mr-1.5" />
                        <span>
                        {selectedLanguage.code === 'hi' ? `${getDaysUntilDeadline(scheme.id)} दिन शेष` :
                         selectedLanguage.code === 'te' ? `${getDaysUntilDeadline(scheme.id)} రోజులు మిగిలి ఉన్నాయి` :
                         selectedLanguage.code === 'ta' ? `${getDaysUntilDeadline(scheme.id)} நாட்கள் மீதம்` :
                         selectedLanguage.code === 'bn' ? `${getDaysUntilDeadline(scheme.id)} দিন বাকি` :
                         selectedLanguage.code === 'mr' ? `${getDaysUntilDeadline(scheme.id)} दिवस शिल्लक` :
                         selectedLanguage.code === 'gu' ? `${getDaysUntilDeadline(scheme.id)} દિવસ બાકી` :
                         selectedLanguage.code === 'kn' ? `${getDaysUntilDeadline(scheme.id)} ದಿನಗಳು ಉಳಿದಿವೆ` :
                         selectedLanguage.code === 'ml' ? `${getDaysUntilDeadline(scheme.id)} ദിവസം മാത്രം` :
                         selectedLanguage.code === 'pa' ? `${getDaysUntilDeadline(scheme.id)} ਦਿਨ ਬਾਕੀ` :
                         selectedLanguage.code === 'or' ? `${getDaysUntilDeadline(scheme.id)} ଦିନ ବାକି` :
                         selectedLanguage.code === 'ur' ? `${getDaysUntilDeadline(scheme.id)} دن باقی ہیں` :
                         `${getDaysUntilDeadline(scheme.id)} days left`}
                      </span>
                      </div>
                  )}
                   <button
                      className="text-sm bg-indigo-500 text-white py-2 px-5 rounded-full hover:bg-indigo-600 transition-colors font-semibold ml-auto"
                      onClick={() => {
                        const deadlineObj = mockDeadlines.find((d: any) => d.schemeId === scheme.id);
                        if (deadlineObj) {
                          addReminder({
                            schemeId: scheme.id,
                            schemeName: scheme.name,
                            deadline: deadlineObj.deadline.toISOString(),
                          });
                        } else {
                          // If no deadline, maybe add a general reminder?
                          // For now, we just disable it if no deadline is found.
                          alert('No deadline found for this scheme.');
                        }
                      }}
                    >
                      {selectedLanguage.code === 'hi' ? 'बाद में आवेदन करें' : selectedLanguage.code === 'te' ? 'తరువాత దరఖాస్తు చేయండి' : 'Apply Later'}
                    </button>
                </div>
              </div>
            ))}
            
            {filteredSchemes.length === 0 && (
              <div className="text-center col-span-full p-10">
                <p>
                  {selectedLanguage.code === 'hi' ? 'कोई योजना नहीं मिली। कोई अन्य श्रेणी या खोज प्रयास करें।' :
                   selectedLanguage.code === 'te' ? 'పథకాలు కనుగొనబడలేదు. వేరే వర్గం లేదా శోధన ప్రయత్నించండి.' :
                   selectedLanguage.code === 'ta' ? 'திட்டங்கள் எதுவும் கிடைக்கவில்லை. வேறு வகை அல்லது தேடல் முயற்சிக்கவும்.' :
                   selectedLanguage.code === 'bn' ? 'কোন স্কিম পাওয়া যায়নি। অন্য কোন বিভাগ বা অনুসন্ধান চেষ্টা করুন।' :
                   selectedLanguage.code === 'mr' ? 'कोणतीही योजना सापडली नाही. वेगळी श्रेणी किंवा शोध प्रश्न वापरून पहा.' :
                   selectedLanguage.code === 'gu' ? 'કોઈ યોજના મળી નથી. અલગ શ્રેણી અથવા શોધ પ્રયાસ કરો.' :
                   selectedLanguage.code === 'kn' ? 'ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಬೇರೆ ವರ್ಗ ಅಥವಾ ಹುಡುಕು ಪ್ರಯತ್ನಿಸಿ.' :
                   selectedLanguage.code === 'ml' ? 'സ്കീമുകളൊന്നും കണ്ടെത്തിയില്ല. മറ്റൊരു വിഭാഗം അല്ലെങ്കിൽ തിരയൽ ശ്രമിക്കുക.' :
                   selectedLanguage.code === 'pa' ? 'ਕੋਈ ਸਕੀਮ ਨਹੀਂ ਮਿਲੀ। ਕੋਈ ਹੋਰ ਸ਼੍ਰੇਣੀ ਜਾਂ ਖੋਜ ਕੁਐਰੀ ਅਜ਼ਮਾਓ।' :
                   selectedLanguage.code === 'or' ? 'କୌଣସି ଯୋଜନା ମିଳିଲା ନାହିଁ। ଏକ ଭିନ୍ନ ବର୍ଗ କିମ୍ବା ଖୋଜ ପ୍ରଚେଷ୍ଟା କରନ୍ତୁ।' :
                   selectedLanguage.code === 'ur' ? 'کوئی اسکیم نہیں ملی۔ کوئی مختلف زمرہ یا تلاش کی کوشش کریں۔' :
                   'No schemes found. Try a different category or search query.'}
                </p>
              </div>
            )}
          </div>
      </div>

      {selectedScheme && (
        <SchemeDetails 
          scheme={selectedScheme} 
          selectedLanguage={selectedLanguage} 
          onClose={() => setSelectedScheme(null)}
          onViewDocuments={(schemeId: string) => {
            // Implementation for viewing documents
            console.log(`Viewing documents for scheme: ${schemeId}`);
          }}
          onViewProcess={(schemeId: string) => {
            // Implementation for viewing application process
            console.log(`Viewing application process for scheme: ${schemeId}`);
          }}
        />
      )}
    </div>
  );
};

export default CategorizedSchemes;
