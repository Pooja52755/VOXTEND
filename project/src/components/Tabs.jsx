import React from 'react'

const Tabs = ({ activeTab, onChange, tabs }) => {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 -mx-4 px-4 py-2">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200/50'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            {tab.icon && (
              <span className={`mr-2 ${activeTab === tab.id ? 'text-white' : 'text-orange-500'}`}>
                {tab.icon}
              </span>
            )}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
