import React, { useState } from 'react';
import { Card } from './ui/card';

interface IncidentLocation {
  name: string;
  x: number; // percentage position
  y: number; // percentage position
  incidents: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const incidentLocations: IncidentLocation[] = [
  { name: 'Kuala Lumpur', x: 48, y: 52, incidents: 456, severity: 'critical' },
  { name: 'Johor Bahru', x: 52, y: 85, incidents: 382, severity: 'high' },
  { name: 'Penang', x: 35, y: 28, incidents: 328, severity: 'high' },
  { name: 'Kota Kinabalu', x: 78, y: 32, incidents: 298, severity: 'medium' },
  { name: 'Kuching', x: 68, y: 62, incidents: 276, severity: 'medium' },
  { name: 'Ipoh', x: 42, y: 38, incidents: 245, severity: 'medium' },
  { name: 'Shah Alam', x: 46, y: 50, incidents: 189, severity: 'high' },
  { name: 'Melaka', x: 45, y: 62, incidents: 156, severity: 'low' },
  { name: 'Kota Bharu', x: 52, y: 22, incidents: 134, severity: 'low' },
  { name: 'Kuantan', x: 56, y: 48, incidents: 127, severity: 'low' },
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

const getMarkerSize = (incidents: number) => {
  return Math.max(12, Math.min(incidents / 12, 40));
};

const MalaysiaIncidentMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border overflow-hidden">
        {/* Simplified Malaysia Map SVG */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Peninsular Malaysia */}
          <path
            d="M 35 20 Q 38 25 40 30 L 42 35 Q 45 40 47 45 L 48 50 Q 50 55 52 60 L 53 65 Q 54 70 55 75 L 56 80 Q 55 82 53 83 L 50 84 Q 48 83 46 82 L 44 80 Q 42 78 40 75 L 38 70 Q 36 65 35 60 L 34 55 Q 33 50 33 45 L 32 40 Q 32 35 33 30 L 34 25 Q 34.5 22.5 35 20 Z"
            fill="hsl(var(--primary))"
            opacity="0.3"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
          
          {/* Sabah */}
          <ellipse
            cx="78"
            cy="32"
            rx="12"
            ry="8"
            fill="hsl(var(--primary))"
            opacity="0.3"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
          
          {/* Sarawak */}
          <path
            d="M 58 55 Q 62 58 66 60 L 70 62 Q 74 63 78 63 L 82 62 Q 84 60 85 58 L 86 55 Q 85 52 83 50 L 80 48 Q 76 47 72 47 L 68 48 Q 64 50 62 52 L 60 53.5 Q 59 54.5 58 55 Z"
            fill="hsl(var(--primary))"
            opacity="0.3"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        </svg>

        {/* Incident Markers */}
        {incidentLocations.map((location) => {
          const size = getMarkerSize(location.incidents);
          const color = getSeverityColor(location.severity);
          const isHovered = hoveredLocation === location.name;

          return (
            <div
              key={location.name}
              className="absolute cursor-pointer transition-all duration-200"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
              }}
              onMouseEnter={() => setHoveredLocation(location.name)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Marker Circle */}
              <div
                className="rounded-full border-2 border-white shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  opacity: 0.8,
                }}
              />
              
              {/* Pulse Effect */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: color,
                  opacity: 0.4,
                }}
              />

              {/* Tooltip */}
              {isHovered && (
                <Card className="absolute left-1/2 -translate-x-1/2 -top-20 p-3 min-w-[180px] shadow-xl z-10 pointer-events-none">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">{location.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Incidents: <span className="font-bold">{location.incidents}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Severity: <span className="font-bold capitalize">{location.severity}</span>
                    </p>
                  </div>
                </Card>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs">
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
              Circle size indicates incident volume. Hover for details.
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border">
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
    </div>
  );
};

export default MalaysiaIncidentMap;
