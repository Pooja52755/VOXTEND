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

const categories = [
  'Agriculture',
  'Healthcare',
  'Education',
  'Housing',
  'Energy',
  'Employment',
  'Social Security',
  'Financial Inclusion',
  'All',
];

const CategorizedSchemes: React.FC<CategorizedSchemesProps> = ({
  schemes,
  selectedLanguage,
}) => {
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
                        <span>{getDaysUntilDeadline(scheme.id)} days left</span>
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
                <p>No schemes found. Try a different category or search query.</p>
              </div>
            )}
          </div>
      </div>

      {selectedScheme && (
        <SchemeDetails 
          scheme={selectedScheme} 
          selectedLanguage={selectedLanguage} 
          onClose={() => setSelectedScheme(null)} 
        />
      )}
    </div>
  );
};

export default CategorizedSchemes;
