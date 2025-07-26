import React from 'react';
import { FileText, Users, MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import { WelfareScheme, Language } from '../types';

interface WelfareSchemesProps {
  schemes: WelfareScheme[];
  selectedLanguage: Language;
  onSchemeSelect: (scheme: WelfareScheme) => void;
}

const WelfareSchemes: React.FC<WelfareSchemesProps> = ({
  schemes,
  selectedLanguage,
  onSchemeSelect
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-orange-600" />
        {selectedLanguage.code === 'hi' ? 'लोकप्रिय योजनाएं' :
         selectedLanguage.code === 'te' ? 'ప్రముఖ పథకాలు' :
         'Popular Schemes'}
        <Star className="w-4 h-4 ml-2 text-yellow-500" />
      </h3>
      
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onSchemeSelect(scheme)}
            className="w-full text-left p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-xl transition-all duration-300 border border-gray-200 hover:border-orange-300 hover:shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-gray-800 text-sm leading-tight pr-2">{scheme.name}</h4>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{scheme.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span className="truncate max-w-24">{scheme.targetGroup}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{scheme.category}</span>
                </div>
              </div>
              
              {scheme.benefits && (
                <div className="text-xs text-green-600 font-medium">
                  <span className="inline-flex items-center">
                    💰 <span className="ml-1">{scheme.benefits}</span>
                  </span>
                </div>
              )}
              
              <div className="flex items-center text-xs text-orange-500 group-hover:text-orange-600 font-medium">
                <span>
                  {selectedLanguage.code === 'hi' ? 'विस्तार से देखें →' :
                   selectedLanguage.code === 'te' ? 'వివరంగా చూడండి →' :
                   'View Details →'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelfareSchemes;