import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Locate, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSIjMDA3Y2I2IiBkPSJtMTkyIDBjLTYxLjcgMC0xMTIgNTAuMy0xMTIgMTEyIDAgNjEuOSA1MC4yIDExMiAxMTIgMTIxLjEgNjEuOC0xMS4xIDExMi02MC4yIDExMi0xMjEuMSAwLTYxLjctNTAuMy0xMTItMTEyLTExMnptNzYuNCAyNTZoLTYuN2MtMjAuOCAxMC0zNiAxMC0zNiAxMHY1OGMwIDMyLjQtNDMuNyA1My04MS4xIDUzQzkwLjQgNDc3IDQ4LjQgNDQyLjcgMzMuMSAzOTYuN2MtLjItLjYtLjktMS43LTEuNy0xLjdIMTBjLS45IDAtMS44IDEuMS0xLjcgMiAwIDAgLjEgMS4yIDEuMSA0LjQgNS4xIDQwLjggMzIuNSA5My4zIDUzLjYgMTgyLjYgNTMuNnMxNDQuMi0zMS43IDE0NC4yLTkwLjFjMC0zNS44LTIxLjItNjcuMi01Mi43LTg0LjJ6Ii8+PC9zdz4=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const centerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSIjZTYxNDE0IiBkPSJtMTkyIDBjLTYxLjcgMC0xMTIgNTAuMy0xMTIgMTEyIDAgNjEuOSA1MC4yIDExMiAxMTIgMTIxLjEgNjEuOC0xMS4xIDExMi02MC4yIDExMi0xMjEuMSAwLTYxLjctNTAuMy0xMTItMTEyLTExMnoiLz48L3N2Zz4=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
  distance?: number; // Distance in kilometers
}

interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

// Helper function to calculate distance between two coordinates in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

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
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5); // 5km default
  const [filteredCenters, setFilteredCenters] = useState<MeeSevaCenterLocation[]>(mockCenters);

  // Get user's location
  const handleGetLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp
        });
        setIsLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please check your browser settings.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Filter centers by distance when userLocation or radius changes
  useEffect(() => {
    if (userLocation) {
      const centersWithDistance = mockCenters.map(center => ({
        ...center,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          center.coordinates.lat,
          center.coordinates.lng
        )
      }));
      const nearbyCenters = centersWithDistance.filter(center => center.distance !== undefined && center.distance <= radius)
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
      setFilteredCenters(nearbyCenters);
    } else {
      setFilteredCenters(mockCenters);
    }
  }, [userLocation, radius]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          {selectedLanguage.code === 'hi' ? 'नज़दीकी मीसेवा केंद्र' :
           selectedLanguage.code === 'te' ? 'సమీప మీసేవా కేంద్రాలు' :
           'Nearby MeeSeva Centers'}
        </h3>
        <button onClick={handleGetLocation} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <Locate className="w-5 h-5 mr-2" />
          Get My Location
        </button>
        {error && <div className="mb-2 text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{error}</div>}
        <div className="h-[400px] rounded-lg overflow-hidden mb-6">
          <MapContainer
            center={userLocation ? [userLocation.lat, userLocation.lng] : [17.3850, 78.4867]}
            zoom={userLocation ? 13 : 11}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* User location marker */}
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <div className="font-medium">Your Location</div>
                  <div className="text-xs text-gray-500">Accuracy: {userLocation.accuracy.toFixed(0)} meters</div>
                </Popup>
              </Marker>
            )}
            {/* MeeSeva center markers */}
            {filteredCenters.length > 0 ? (
              filteredCenters.map(center => (
                <Marker
                  key={center.id}
                  position={[center.coordinates.lat, center.coordinates.lng]}
                  icon={centerIcon}
                >
                  <Popup>
                    <div className="font-medium">{center.name}</div>
                    <div className="text-sm text-gray-600">{center.address}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      {center.timings} • {center.contactNumber}
                    </div>
                    {center.distance !== undefined && userLocation && (
                      <div className="mt-1 text-xs text-blue-700">Distance: {center.distance.toFixed(2)} km</div>
                    )}
                    <div className="mt-2">
                      <h4 className="text-xs font-semibold text-gray-700">Services:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {center.services.map(service => (
                          <span key={service} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">{service}</span>
                        ))}
                      </div>
                    </div>
                    {userLocation && (
                      <button
                        className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${center.coordinates.lat},${center.coordinates.lng}&travelmode=driving`;
                          window.open(url, '_blank');
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </button>
                    )}
                  </Popup>
                </Marker>
              ))
            ) : (
              <></>
            )}

            {/* Only show centers within 10km of user location */}
            {userLocation &&
              mockCenters
                .map(center => ({
                  ...center,
                  distance: calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    center.coordinates.lat,
                    center.coordinates.lng
                  ),
                }))
                .filter(center => center.distance <= 10)
                .map(center => (
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
                        <button
                          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-medium shadow"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${center.coordinates.lat},${center.coordinates.lng}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-1 inline" /> Directions
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
          </MapContainer>
        </div>

        <div className="space-y-4">
          {/* Only show centers within 10km of user location */}
          {userLocation &&
            mockCenters
              .map(center => ({
                ...center,
                distance: calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  center.coordinates.lat,
                  center.coordinates.lng
                ),
              }))
              .filter(center => center.distance <= 10)
              .map(center => (
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
                  <button
                    className="mt-3 text-sm text-blue-500 hover:text-blue-600 font-medium"
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${center.coordinates.lat},${center.coordinates.lng}`;
                      window.open(url, '_blank');
                    }}
                  >
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
