import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

interface Props {
  incident: {
    primaryIncidentType?: string;
    postalIncidentTypes?: string[];
    otherRelatedInfo?: string;
  };
}

export default function IncidentClassification({ incident }: Props) {
  const hasType = incident.primaryIncidentType || (incident.postalIncidentTypes && incident.postalIncidentTypes.length > 0);
  if (!hasType) return null;

  const isOther = incident.primaryIncidentType?.startsWith('Other');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Part 2: Incident Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incident.primaryIncidentType && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Primary Incident Type</p>
            <Badge variant="outline" className="text-xs">{incident.primaryIncidentType}</Badge>
          </div>
        )}

        {/* Legacy multi-select */}
        {!incident.primaryIncidentType && incident.postalIncidentTypes && incident.postalIncidentTypes.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Type of Postal Security Incident</p>
            <div className="flex flex-wrap gap-2">
              {incident.postalIncidentTypes.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        {isOther && incident.otherRelatedInfo && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Other Details</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{incident.otherRelatedInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
