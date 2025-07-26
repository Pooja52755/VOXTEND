import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Language } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MeeSevaCenterLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
  timings: string;
  contactNumber: string;
}

interface MeeSevaCentersMapProps {
  selectedLanguage: Language;
}

// Mock data for MeeSeva centers
const mockCenters: MeeSevaCenterLocation[] = [
  {
    id: 'ms-001',
    name: 'MeeSeva Center - Ameerpet',
    address: '6-3-456, Ameerpet Main Road, Hyderabad',
    coordinates: {
      lat: 17.4374,
      lng: 78.4487
    },
    services: [
      'Certificates',
      'Land Records',
      'Social Security',
      'Welfare Schemes'
    ],
    timings: '9:00 AM - 5:00 PM',
    contactNumber: '+91-40-12345678'
  },
  {
    id: 'ms-002',
    name: 'MeeSeva Center - Kukatpally',
    address: 'Plot 123, KPHB Phase 1, Kukatpally',
    coordinates: {
      lat: 17.4849,
      lng: 78.4138
    },
    services: [
      'Certificates',
      'Land Records',
      'Bill Payments',
      'Welfare Schemes'
    ],
    timings: '9:00 AM - 5:00 PM',
    contactNumber: '+91-40-87654321'
  },
  // Add more centers as needed
];

const MeeSevaCentersMap: React.FC<MeeSevaCentersMapProps> = ({
  selectedLanguage
}) => {
  const [selectedCenter, setSelectedCenter] = useState<MeeSevaCenterLocation | null>(null);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          {selectedLanguage.code === 'hi' ? 'नज़दीकी मीसेवा केंद्र' :
           selectedLanguage.code === 'te' ? 'సమీప మీసేవా కేంద్రాలు' :
           'Nearby MeeSeva Centers'}
        </h3>
        
        <div className="h-[400px] rounded-lg overflow-hidden mb-6">
          <MapContainer
            center={[17.3850, 78.4867]} // Hyderabad center
            zoom={11}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mockCenters.map(center => (
              <Marker
                key={center.id}
                position={[center.coordinates.lat, center.coordinates.lng]}
                eventHandlers={{
                  click: () => setSelectedCenter(center),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold text-gray-800">{center.name}</h4>
                    <p className="text-sm text-gray-600">{center.address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Timings:</strong> {center.timings}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Contact:</strong> {center.contactNumber}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-4">
          {mockCenters.map(center => (
            <div
              key={center.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedCenter?.id === center.id
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
              }`}
              onClick={() => setSelectedCenter(center)}
            >
              <h4 className="font-bold text-gray-800">{center.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{center.address}</p>
              
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    {selectedLanguage.code === 'hi' ? 'समय:' :
                     selectedLanguage.code === 'te' ? 'సమయం:' :
                     'Timings:'}
                  </p>
                  <p className="font-medium">{center.timings}</p>
                </div>
                <div>
                  <p className="text-gray-500">
                    {selectedLanguage.code === 'hi' ? 'संपर्क:' :
                     selectedLanguage.code === 'te' ? 'సంప్రదించండి:' :
                     'Contact:'}
                  </p>
                  <p className="font-medium">{center.contactNumber}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-500 text-sm mb-1">
                  {selectedLanguage.code === 'hi' ? 'उपलब्ध सेवाएं:' :
                   selectedLanguage.code === 'te' ? 'అందుబాటులో ఉన్న సేవలు:' :
                   'Available Services:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {center.services.map(service => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium">
                {selectedLanguage.code === 'hi' ? 'दिशा-निर्देश पाएं →' :
                 selectedLanguage.code === 'te' ? 'దారి చూపించు →' :
                 'Get Directions →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeeSevaCentersMap;
