import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface IncidentLocation {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  incidents: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const incidentLocations: IncidentLocation[] = [
  { name: 'Kuala Lumpur', coordinates: [101.6869, 3.1390], incidents: 456, severity: 'critical' },
  { name: 'Johor Bahru', coordinates: [103.7414, 1.4927], incidents: 382, severity: 'high' },
  { name: 'Penang', coordinates: [100.3327, 5.4141], incidents: 328, severity: 'high' },
  { name: 'Kota Kinabalu', coordinates: [116.0735, 5.9804], incidents: 298, severity: 'medium' },
  { name: 'Kuching', coordinates: [110.3592, 1.5535], incidents: 276, severity: 'medium' },
  { name: 'Ipoh', coordinates: [101.0901, 4.5975], incidents: 245, severity: 'medium' },
  { name: 'Shah Alam', coordinates: [101.5183, 3.0733], incidents: 189, severity: 'high' },
  { name: 'Melaka', coordinates: [102.2501, 2.1896], incidents: 156, severity: 'low' },
  { name: 'Kota Bharu', coordinates: [102.2381, 6.1248], incidents: 134, severity: 'low' },
  { name: 'Kuantan', coordinates: [103.3260, 3.8077], incidents: 127, severity: 'low' },
];

const getSeverityColor = (severity: string, incidents: number) => {
  const opacity = Math.min(incidents / 500, 1);
  switch (severity) {
    case 'critical': return `rgba(239, 68, 68, ${opacity})`;
    case 'high': return `rgba(251, 146, 60, ${opacity})`;
    case 'medium': return `rgba(59, 130, 246, ${opacity})`;
    case 'low': return `rgba(34, 197, 94, ${opacity})`;
    default: return `rgba(107, 114, 128, ${opacity})`;
  }
};

const MalaysiaIncidentMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [109.5, 4.0], // Center of Malaysia
      zoom: 5.5,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for each location
      incidentLocations.forEach((location) => {
        // Create custom marker element
        const el = document.createElement('div');
        const size = Math.max(20, Math.min(location.incidents / 10, 60));
        el.className = 'marker';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundColor = getSeverityColor(location.severity, location.incidents);
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #1a1a1a;">${location.name}</h3>
            <p style="margin: 0; color: #4a5568;">Incidents: <strong>${location.incidents}</strong></p>
            <p style="margin: 0; color: #4a5568;">Severity: <strong style="text-transform: capitalize;">${location.severity}</strong></p>
          </div>`
        );

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      setIsMapInitialized(true);
    });
  };

  useEffect(() => {
    if (isMapInitialized) {
      return () => {
        map.current?.remove();
      };
    }
  }, [isMapInitialized]);

  if (!isMapInitialized) {
    return (
      <div className="w-full h-[500px] rounded-lg border bg-card p-6 flex flex-col items-center justify-center gap-4">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Initialize Malaysia Incident Map</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the incident heatmap. Get your token from{' '}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Mapbox Dashboard
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button 
            onClick={initializeMap} 
            className="w-full"
            disabled={!mapboxToken}
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs">
        <h4 className="font-semibold mb-2">Incident Heatmap Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Critical (&gt;400 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>High (300-400 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Medium (200-300 incidents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Low (&lt;200 incidents)</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Circle size indicates incident volume
          </p>
        </div>
      </div>
    </div>
  );
};

export default MalaysiaIncidentMap;
