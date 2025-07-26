import React, { useState } from 'react';
import { Calendar, Users, MapPin, ArrowRight, Star, Timer } from 'lucide-react';
import { WelfareScheme, Language } from '../types';

interface CategorizedSchemesProps {
  schemes: WelfareScheme[];
  selectedLanguage: Language;
  onSchemeSelect: (scheme: WelfareScheme) => void;
}

interface SchemeDeadline {
  schemeId: string;
  deadline: Date;
}

// Mock deadlines for demonstration
const mockDeadlines: SchemeDeadline[] = [
  { schemeId: 'pm-kisan', deadline: new Date('2025-08-30') },
  { schemeId: 'ayushman-bharat', deadline: new Date('2025-09-15') },
  { schemeId: 'ujjwala', deadline: new Date('2025-07-31') },
];

const categories = [
  'Agriculture',
  'Healthcare',
  'Education',
  'Housing',
  'Energy',
  'Employment',
  'Social Security',
  'Financial Inclusion',
  'All'
];

const CategorizedSchemes: React.FC<CategorizedSchemesProps> = ({
  schemes,
  selectedLanguage,
  onSchemeSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredSchemes = selectedCategory === 'All'
    ? schemes
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const getDaysUntilDeadline = (schemeId: string): number | null => {
    const deadline = mockDeadlines.find(d => d.schemeId === schemeId);
    if (!deadline) return null;
    
    const today = new Date();
    const daysLeft = Math.ceil((deadline.deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const isUrgent = (days: number | null): boolean => {
    return days !== null && days <= 30;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-orange-600" />
        {selectedLanguage.code === 'hi' ? 'श्रेणीवार योजनाएं' :
         selectedLanguage.code === 'te' ? 'వర్గాల వారీగా పథకాలు' :
         'Schemes by Category'}
      </h3>

      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {selectedLanguage.code === 'hi' ? category : 
               selectedLanguage.code === 'te' ? category :
               category}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Title */}
      <div className="mt-4 mb-6">
        <h4 className="text-lg font-semibold text-gray-800">
          {selectedCategory === 'All' ? (
            selectedLanguage.code === 'hi' ? 'सभी योजनाएं' :
            selectedLanguage.code === 'te' ? 'అన్ని పథకాలు' :
            'All Schemes'
          ) : (
            `${selectedCategory} ${
              selectedLanguage.code === 'hi' ? 'योजनाएं' :
              selectedLanguage.code === 'te' ? 'పథకాలు' :
              'Schemes'
            }`
          )}
        </h4>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const daysLeft = getDaysUntilDeadline(scheme.id);
          const urgent = isUrgent(daysLeft);

          return (
            <button
              key={scheme.id}
              onClick={() => onSchemeSelect(scheme)}
              className={`w-full text-left p-5 rounded-xl transition-all duration-300 border ${
                urgent
                  ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 hover:border-red-300'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:border-orange-300'
              } hover:shadow-lg group`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight pr-2">
                    {scheme.name}
                    {urgent && (
                      <span className="ml-2 text-xs px-2 py-1 bg-red-500 text-white rounded-full">
                        {daysLeft} days left
                      </span>
                    )}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {scheme.description}
                </p>
                
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

                {daysLeft && daysLeft > 0 && !urgent && (
                  <div className="flex items-center text-xs text-blue-500">
                    <Timer className="w-3 h-3 mr-1" />
                    <span>Deadline: {daysLeft} days left</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorizedSchemes;
