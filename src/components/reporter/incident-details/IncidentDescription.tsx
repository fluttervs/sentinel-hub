import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface Props {
  incident: {
    description: string;
    systemServiceAffected?: string;
    impactIndicators?: string[];
  };
}

export default function IncidentDescription({ incident }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Incident Description
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Full Detailed Description</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
        </div>
        {incident.systemServiceAffected && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Affected System / Service</p>
            <p className="text-sm font-medium">{incident.systemServiceAffected}</p>
          </div>
        )}
        {incident.impactIndicators && incident.impactIndicators.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Estimated Impact Indicators</p>
            <div className="flex flex-wrap gap-2">
              {incident.impactIndicators.map((ind) => (
                <Badge key={ind} variant="outline" className="text-xs">{ind}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
