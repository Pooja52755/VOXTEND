import React from 'react';

interface NewsItem {
  title: string;
  url: string;
  source: string;
  date: string;
  imageUrl: string;
  category: string;
}

// Mock data for demonstration. In a real app, this would be fetched from an API.
const mockNewsData: NewsItem[] = [
  {
    title: 'PM-KISAN Scheme: Over 11 crore farmers receive financial benefits',
    url: '#',
    source: 'PIB India',
    date: 'August 1, 2025',
    imageUrl: '/news/pm.jpg',
    category: 'Agriculture'
  },
  {
    title: 'Ayushman Bharat Digital Mission crosses 30 crore health records',
    url: '#',
    source: 'MyGov India',
    date: 'July 30, 2025',
    imageUrl: '/news/ayushman.jpg',
    category: 'Healthcare'
  },
  {
    title: 'Ujjwala 2.0: Free LPG connections for 1 crore new beneficiaries',
    url: '#',
    source: 'NDTV News',
    date: 'July 28, 2025',
    imageUrl: '/news/ujjwala Yojana.jpeg',
    category: 'Energy'
  },
];

const LatestNews: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-3">📰</span> Latest News
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
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{item.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="font-bold text-gray-800 text-md leading-tight flex-grow">{item.title}</h4>
              <div className="text-xs text-gray-500 mt-3 flex justify-between items-center">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
