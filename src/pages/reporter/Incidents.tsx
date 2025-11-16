import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReporterIncidents() {
  const navigate = useNavigate();

  const incidents = [
    {
      id: 'PSIRP-2025-0025',
      title: 'High-Value Package Theft',
      status: 'In Review',
      severity: 'High',
      submitted: '2025-01-15',
      lastAction: '2 hours ago',
      sla: '22h remaining',
    },
    {
      id: 'PSIRP-2025-0023',
      title: 'Tampered Shipment Detected',
      status: 'RFI Sent',
      severity: 'Medium',
      submitted: '2025-01-14',
      lastAction: '1 hour ago',
      sla: 'Action Required',
    },
    {
      id: 'PSIRP-2025-0020',
      title: 'Lost Consignment Investigation',
      status: 'Under Investigation',
      severity: 'High',
      submitted: '2025-01-12',
      lastAction: '5 hours ago',
      sla: '36h remaining',
    },
    {
      id: 'PSIRP-2025-0019',
      title: 'Dangerous Goods Mishandling',
      status: 'Closed',
      severity: 'Critical',
      submitted: '2025-01-10',
      lastAction: '1 day ago',
      sla: 'Completed',
    },
    {
      id: 'PSIRP-2025-0018',
      title: 'Fraud Attempt Reported',
      status: 'Submitted',
      severity: 'Medium',
      submitted: '2025-01-09',
      lastAction: '3 days ago',
      sla: '12h remaining',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-status-draft/20 text-status-draft border-status-draft/30',
      'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Under Investigation': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[status] || 'bg-secondary';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
          <p className="text-muted-foreground">Track and manage your incident reports</p>
        </div>
        <Button onClick={() => navigate('/reporter/incidents/new')} className="glow-cyan">
          <Plus className="mr-2 h-4 w-4" />
          New Incident
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, or description..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition-all cursor-pointer"
                onClick={() => navigate(`/reporter/incidents/${incident.id}`)}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-primary">{incident.id}</span>
                    <h3 className="font-semibold flex-1">{incident.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                    <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-1 text-sm">
                  <p className="text-muted-foreground">Submitted: {incident.submitted}</p>
                  <p className="text-muted-foreground">Last action: {incident.lastAction}</p>
                  <p
                    className={`font-medium ${
                      incident.sla === 'Action Required'
                        ? 'text-destructive'
                        : incident.sla === 'Completed'
                        ? 'text-status-closed'
                        : 'text-foreground'
                    }`}
                  >
                    {incident.sla}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
