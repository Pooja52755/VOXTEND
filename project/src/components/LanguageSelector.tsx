import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { languages } from '../data/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
        <Globe className="w-4 h-4" />
        <span className="font-medium">{selectedLanguage.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="py-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageChange(language)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                selectedLanguage.code === language.code 
                  ? 'bg-orange-50 text-orange-700 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{language.name}</span>
                <span className="text-sm text-gray-500">{language.nativeName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;