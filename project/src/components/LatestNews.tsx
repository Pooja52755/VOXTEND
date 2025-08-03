import React from 'react';
import { Language } from '../types';

interface NewsItem {
  id: string;
  titles: {
    [key: string]: string;
  };
  url: string;
  sources: {
    [key: string]: string;
  };
  date: string;
  imageUrl: string;
  categories: {
    [key: string]: string;
  };
}

interface LatestNewsProps {
  selectedLanguage: Language;
}

// Mock data for demonstration. In a real app, this would be fetched from an API.
const mockNewsData: NewsItem[] = [
  {
    id: 'pm-kisan-news',
    titles: {
      en: 'PM-KISAN Scheme: Over 11 crore farmers receive financial benefits',
      hi: 'पीएम-किसान योजना: 11 करोड़ से अधिक किसानों को वित्तीय लाभ प्राप्त हुआ',
      te: 'పిఎం-కిసాన్ పథకం: 11 కోట్లకు పైగా రైతులకు ఆర్థిక ప్రయోజనాలు',
      ta: 'பிஎம்-கிசான் திட்டம்: 11 கோடிக்கும் அதிகமான விவசாயிகளுக்கு நிதி நலன்கள் கிடைத்தன',
      bn: 'পিএম-কিসান স্কিম: 11 কোটিরও বেশি কৃষক আর্থিক সুবিধা পেয়েছেন',
    },
    url: '#',
    sources: {
      en: 'PIB India',
      hi: 'पीआईबी भारत',
      te: 'పిబిఐ ఇండియా',
      ta: 'பிஐபி இந்தியா',
      bn: 'পিআইবি ইন্ডিয়া',
    },
    date: '2025-08-01',
    imageUrl: '/news/pm.jpg',
    categories: {
      en: 'Agriculture',
      hi: 'कृषि',
      te: 'వ్యవసాయం',
      ta: 'விவசாயம்',
      bn: 'কৃষি',
    }
  },
  {
    id: 'ayushman-news',
    titles: {
      en: 'Ayushman Bharat Digital Mission crosses 30 crore health records',
      hi: 'आयुष्मान भारत डिजिटल मिशन ने 30 करोड़ स्वास्थ्य रिकॉर्ड पार किए',
      te: 'ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ 30 కోట్ల ఆరోగ్య రికార్డ్లను దాటిపోయింది',
      ta: 'ஆயுஷ்மான் பாரத் டிஜிட்டல் மிஷன் 30 கோடி ஆரோக்கிய பதிவுகளை தாண்டியது',
      bn: 'আয়ুষ্মান ভারত ডিজিটাল মিশন 30 কোটি স্বাস্থ্য রেকর্ড অতিক্রম করেছে',
    },
    url: '#',
    sources: {
      en: 'MyGov India',
      hi: 'माईगव इंडिया',
      te: 'మైగవ్ ఇండియా',
      ta: 'மைகவ் இந்தியா',
      bn: 'মাইগভ ইন্ডিয়া',
    },
    date: '2025-07-30',
    imageUrl: '/news/ayushman.jpg',
    categories: {
      en: 'Healthcare',
      hi: 'स्वास्थ्य सेवा',
      te: 'ఆరోగ్య సంరక్షణ',
      ta: 'ஆரோக்கிய பராமரிப்பு',
      bn: 'স্বাস্থ্যসেবা',
    }
  },
  {
    id: 'ujjwala-news',
    titles: {
      en: 'Ujjwala 2.0: Free LPG connections for 1 crore new beneficiaries',
      hi: 'उज्ज्वला 2.0: 1 करोड़ नए लाभार्थियों के लिए मुफ्त एलपीजी कनेक्शन',
      te: 'ఉజ్జ్వల 2.0: 1 కోటి కొత్త లబ్ధిదారులకు ఉచిత ఎల్పీజి కనెక్షన్లు',
      ta: 'உஜ்வாலா 2.0: 1 கோடி புதிய பயனாளிகளுக்கு இலவச எல்பிஜி இணைப்புகள்',
      bn: 'উজ্জ্বলা 2.0: 1 কোটি নতুন সুবিধাভোগীদের জন্য বিনামূল্যে এলপিজি সংযোগ',
    },
    url: '#',
    sources: {
      en: 'NDTV News',
      hi: 'एनडीटीवी न्यूज',
      te: 'ఎన్డిటివి న్యూస్',
      ta: 'என்டிடிவி செய்திகள்',
      bn: 'এনডিটিভি নিউজ',
    },
    date: '2025-07-28',
    imageUrl: '/news/ujjwala Yojana.jpeg',
    categories: {
      en: 'Energy',
      hi: 'ऊर्जा',
      te: 'శక్తి',
      ta: 'ஆற்றல்',
      bn: 'শক্তি',
    }
  },
];

const formatDate = (dateString: string, lang: string): string => {
  const date = new Date(dateString);
  
  // Format options for English
  if (lang === 'en') {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // For other Indian languages, use the appropriate locale
  const locales: {[key: string]: string} = {
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    bn: 'bn-IN',
    // Add more language codes as needed
  };
  
  const locale = locales[lang] || 'en-IN';
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const LatestNews: React.FC<LatestNewsProps> = ({ selectedLanguage }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-3">📰</span> 
        {selectedLanguage.code === 'hi' ? 'ताजा समाचार' :
         selectedLanguage.code === 'te' ? 'తాజా వార్తలు' :
         selectedLanguage.code === 'ta' ? 'சமீபத்திய செய்திகள்' :
         selectedLanguage.code === 'bn' ? 'সর্বশেষ খবর' :
         'Latest News'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockNewsData.map((item, index) => (
          <a 
            key={index} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-200"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.titles[selectedLanguage.code] || item.titles['en']} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {item.categories[selectedLanguage.code] || item.categories['en']}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="font-bold text-gray-800 text-md leading-tight flex-grow">
                {item.titles[selectedLanguage.code] || item.titles['en']}
              </h4>
              <div className="text-xs text-gray-500 mt-3 flex justify-between items-center">
                <span>{item.sources[selectedLanguage.code] || item.sources['en']}</span>
                <span>{formatDate(item.date, selectedLanguage.code)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
