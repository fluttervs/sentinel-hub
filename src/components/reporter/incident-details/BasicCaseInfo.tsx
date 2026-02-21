import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface Props {
  incident: {
    id: string;
    incidentType: string;
    category: string;
    dateReported: string;
    incidentDate: string;
    incidentTime: string;
    branchName: string;
    address: string;
    state: string;
    postalCode: string;
    companyName: string;
    reporterName: string;
    reporterDesignation: string;
    status: string;
    severity: string;
    leaEscalation: string;
  };
  getStatusColor: (s: string) => string;
  getSeverityColor: (s: string) => string;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function BasicCaseInfo({ incident, getStatusColor, getSeverityColor }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Basic Case Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <InfoField label="Incident ID" value={incident.id} />
          <InfoField label="Incident Type" value={incident.incidentType} />
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <Badge variant="outline" className="mt-0.5 text-xs">{incident.category}</Badge>
          </div>
          <InfoField label="Date & Time Reported" value={incident.dateReported} />
          <InfoField label="Incident Date & Time" value={`${incident.incidentDate} at ${incident.incidentTime}`} />
          <InfoField label="Incident Location" value={`${incident.branchName}, ${incident.address}, ${incident.state} ${incident.postalCode}`} />
          <InfoField label="Company Name" value={incident.companyName} />
          <InfoField label="Reporter Name" value={incident.reporterName} />
          <InfoField label="Reporter Designation" value={incident.reporterDesignation} />
          <div>
            <p className="text-xs text-muted-foreground">Current Case Status</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Severity Level</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${getSeverityColor(incident.severity)}`}>{incident.severity}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">LEA Escalation Status</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${incident.leaEscalation === 'Yes' ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-secondary text-muted-foreground'}`}>
              {incident.leaEscalation}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
