import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface IncidentLocation {
  name: string;
  position: { lat: number; lng: number };
  incidents: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const incidentLocations: IncidentLocation[] = [
  { name: 'Kuala Lumpur', position: { lat: 3.1390, lng: 101.6869 }, incidents: 456, severity: 'critical' },
  { name: 'Johor Bahru', position: { lat: 1.4927, lng: 103.7414 }, incidents: 382, severity: 'high' },
  { name: 'Penang', position: { lat: 5.4141, lng: 100.3327 }, incidents: 328, severity: 'high' },
  { name: 'Kota Kinabalu', position: { lat: 5.9804, lng: 116.0735 }, incidents: 298, severity: 'medium' },
  { name: 'Kuching', position: { lat: 1.5535, lng: 110.3592 }, incidents: 276, severity: 'medium' },
  { name: 'Ipoh', position: { lat: 4.5975, lng: 101.0901 }, incidents: 245, severity: 'medium' },
  { name: 'Shah Alam', position: { lat: 3.0733, lng: 101.5183 }, incidents: 189, severity: 'high' },
  { name: 'Melaka', position: { lat: 2.1896, lng: 102.2501 }, incidents: 156, severity: 'low' },
  { name: 'Kota Bharu', position: { lat: 6.1248, lng: 102.2381 }, incidents: 134, severity: 'low' },
  { name: 'Kuantan', position: { lat: 3.8077, lng: 103.3260 }, incidents: 127, severity: 'low' },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return '#ef4444';
    case 'high': return '#fb923c';
    case 'medium': return '#3b82f6';
    case 'low': return '#22c55e';
    default: return '#6b7280';
  }
};

const MalaysiaIncidentMap = () => {
  const [apiKey, setApiKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<IncidentLocation | null>(null);

  const initializeMap = () => {
    if (apiKey.trim()) {
      setIsMapInitialized(true);
    }
  };

  if (!isMapInitialized) {
    return (
      <div className="w-full h-[500px] rounded-lg border bg-card p-6 flex flex-col items-center justify-center gap-4">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Initialize Google Maps</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Google Maps API key to view the incident heatmap. Get your key from{' '}
              <a 
                href="https://console.cloud.google.com/google/maps-apis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="google-maps-key">Google Maps API Key</Label>
            <Input
              id="google-maps-key"
              type="text"
              placeholder="AIza..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <Button 
            onClick={initializeMap} 
            className="w-full"
            disabled={!apiKey.trim()}
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border relative">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 4.2105, lng: 108.9758 }}
          defaultZoom={6}
          mapId="incident-heatmap"
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {incidentLocations.map((location) => {
            const size = Math.max(20, Math.min(location.incidents / 10, 60));
            const color = getSeverityColor(location.severity);

            return (
              <AdvancedMarker
                key={location.name}
                position={location.position}
                onClick={() => setSelectedLocation(location)}
              >
                <div
                  className="rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    opacity: 0.8,
                  }}
                />
              </AdvancedMarker>
            );
          })}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2">
                <h4 className="font-semibold text-sm mb-1">{selectedLocation.name}</h4>
                <p className="text-xs text-gray-600">
                  Incidents: <span className="font-bold">{selectedLocation.incidents}</span>
                </p>
                <p className="text-xs text-gray-600">
                  Severity: <span className="font-bold capitalize">{selectedLocation.severity}</span>
                </p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs z-10">
        <h4 className="font-semibold mb-3 text-sm">Incident Heatmap Legend</h4>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-xs">Critical (&gt;400 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-xs">High (300-400 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs">Medium (200-300 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs">Low (&lt;200 incidents)</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Circle size indicates incident volume. Click markers for details.
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border z-10">
        <h4 className="font-semibold mb-2 text-sm">Total Coverage</h4>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Total Incidents: <span className="font-bold text-foreground">2,847</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Locations: <span className="font-bold text-foreground">{incidentLocations.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MalaysiaIncidentMap;
