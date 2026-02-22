import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Package } from 'lucide-react';

interface Props {
  incident: {
    description: string;
    incidentDate: string;
    incidentTime: string;
    incidentLocation?: string;
    systemServiceAffected?: string;
    estimatedImpact?: string;
    postalIncidentTypes?: string[];
    staffDetected?: { name: string; designation: string; contactNumber: string; email: string };
    senderInfo?: { name: string; address: string; stateCountry: string; contact: string };
    recipientInfo?: { name: string; address: string; stateCountry: string; contact: string };
    trackingNumber?: string;
    packageDeclaration?: string;
    packageWeight?: string;
    prohibitedItemType?: string;
    otherRelatedInfo?: string;
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

export default function IncidentDescription({ incident }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Part 3: Incident Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Postal Incident Types */}
        {incident.postalIncidentTypes && incident.postalIncidentTypes.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Type of Postal Security Incident</p>
            <div className="flex flex-wrap gap-2">
              {incident.postalIncidentTypes.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Incident Description</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Date of Incident" value={incident.incidentDate} />
          <Field label="Time of Incident" value={incident.incidentTime} />
        </div>

        {/* Location */}
        {incident.incidentLocation && (
          <Field label="Incident Location Address" value={incident.incidentLocation} />
        )}

        {/* Staff Detected */}
        {incident.staffDetected && incident.staffDetected.name && (
          <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">Details of Officer/Staff Who Detected the Incident</p>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Name" value={incident.staffDetected.name} />
              <Field label="Position" value={incident.staffDetected.designation} />
              <Field label="Phone No." value={incident.staffDetected.contactNumber} />
              <Field label="Email" value={incident.staffDetected.email} />
            </div>
          </div>
        )}

        {/* Affected System */}
        {incident.systemServiceAffected && (
          <Field label="Affected System/Service" value={incident.systemServiceAffected} />
        )}

        {/* Estimated Impact */}
        {incident.estimatedImpact && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Estimated Impact</p>
            <Badge variant="outline" className={`text-xs ${
              incident.estimatedImpact === 'High' ? 'bg-destructive/20 text-destructive border-destructive/30' :
              incident.estimatedImpact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
              'bg-green-500/20 text-green-400 border-green-500/30'
            }`}>{incident.estimatedImpact}</Badge>
          </div>
        )}

        {/* Sender & Recipient */}
        <div className="grid md:grid-cols-2 gap-4">
          {incident.senderInfo && incident.senderInfo.name && (
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Sender Information</p>
              <Field label="Name" value={incident.senderInfo.name} />
              <Field label="Address" value={incident.senderInfo.address} />
              <Field label="State / Country" value={incident.senderInfo.stateCountry} />
              <Field label="Phone No." value={incident.senderInfo.contact} />
            </div>
          )}
          {incident.recipientInfo && incident.recipientInfo.name && (
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Recipient Information</p>
              <Field label="Name" value={incident.recipientInfo.name} />
              <Field label="Address" value={incident.recipientInfo.address} />
              <Field label="State / Country" value={incident.recipientInfo.stateCountry} />
              <Field label="Phone No." value={incident.recipientInfo.contact} />
            </div>
          )}
        </div>

        {/* Package Info */}
        <div className="grid md:grid-cols-2 gap-4">
          {incident.trackingNumber && <Field label="Tracking / Consignment Number" value={incident.trackingNumber} />}
          {incident.packageDeclaration && <Field label="Package Declaration" value={incident.packageDeclaration} />}
          {incident.packageWeight && <Field label="Package Weight" value={`${incident.packageWeight} kg`} />}
          {incident.prohibitedItemType && <Field label="Type of Prohibited Item Detected" value={incident.prohibitedItemType} />}
        </div>

        {/* Other Related Info */}
        {incident.otherRelatedInfo && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Other Related Information</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{incident.otherRelatedInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
