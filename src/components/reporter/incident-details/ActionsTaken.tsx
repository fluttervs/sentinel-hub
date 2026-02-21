import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface Props {
  incident: {
    immediateActions: string;
    incidentControlStatus: string;
    reportedToAuthority: string;
    authorityAgency?: string;
    authorityReference?: string;
    parcelHandedOver: string;
    assistanceRequested: string[];
  };
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function ActionsTaken({ incident }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Actions Taken by Reporter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Immediate Actions Taken</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{incident.immediateActions}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Incident Control Status" value={incident.incidentControlStatus} />
          <div>
            <p className="text-xs text-muted-foreground">Reported to Authority</p>
            <p className="text-sm font-medium">
              {incident.reportedToAuthority}
              {incident.reportedToAuthority === 'Yes' && incident.authorityAgency && (
                <span className="text-muted-foreground"> — {incident.authorityAgency} (Ref: {incident.authorityReference})</span>
              )}
            </p>
          </div>
          <Field label="Parcel Handed Over to Authority" value={incident.parcelHandedOver} />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Assistance Requested</p>
            <div className="flex flex-wrap gap-1.5">
              {incident.assistanceRequested.map((a) => (
                <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
