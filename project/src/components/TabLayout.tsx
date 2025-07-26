import React, { useState } from 'react';
import { FileText, MapPin, Mic } from 'lucide-react';
import { Language } from '../types';

interface TabLayoutProps {
  children: React.ReactNode;
  selectedLanguage: Language;
}

type Tab = {
  id: string;
  label: {
    en: string;
    hi: string;
    te: string;
  };
  icon: React.ReactNode;
};

const tabs: Tab[] = [
  {
    id: 'voice',
    label: {
      en: 'Voice Assistant',
      hi: 'आवाज़ सहायक',
      te: 'వాయిస్ అసిస్టెంట్'
    },
    icon: <Mic className="w-5 h-5" />
  },
  {
    id: 'schemes',
    label: {
      en: 'Welfare Schemes',
      hi: 'कल्याण योजनाएं',
      te: 'సంక్షేమ పథకాలు'
    },
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'centers',
    label: {
      en: 'MeeSeva Centers',
      hi: 'मीसेवा केंद्र',
      te: 'మీసేవా కేంద్రాలు'
    },
    icon: <MapPin className="w-5 h-5" />
  }
];

const TabLayout: React.FC<TabLayoutProps> = ({ children, selectedLanguage }) => {
  const [activeTab, setActiveTab] = useState('voice');

  // Filter children based on active tab
  const activeChild = React.Children.toArray(children).find(
    (child: any) => child.props.tabId === activeTab
  );

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 mb-6 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-md border border-gray-200/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-orange-100'
            }`}
          >
            {tab.icon}
            <span className="font-medium">
              {tab.label[selectedLanguage.code as keyof typeof tab.label]}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        {activeChild}
      </div>
    </div>
  );
};

export default TabLayout;
