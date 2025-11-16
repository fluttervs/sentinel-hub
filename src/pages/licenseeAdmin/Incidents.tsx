import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LicenseeAdminIncidents() {
  const navigate = useNavigate();

  const incidents = [
    { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', reporter: 'Ahmad bin Abdullah', status: 'In Review', severity: 'High', submitted: '2025-01-15' },
    { id: 'PSIRP-2025-0024', title: 'Delayed Shipment', reporter: 'Siti Nurhaliza', status: 'Submitted', severity: 'Medium', submitted: '2025-01-14' },
    { id: 'PSIRP-2025-0023', title: 'Damaged Package', reporter: 'Kamal Hassan', status: 'RFI Sent', severity: 'Low', submitted: '2025-01-13' },
    { id: 'PSIRP-2025-0022', title: 'Lost Consignment', reporter: 'Fatimah Zahra', status: 'Under Investigation', severity: 'High', submitted: '2025-01-12' },
    { id: 'PSIRP-2025-0021', title: 'Fraud Attempt', reporter: 'Azman Ali', status: 'Closed', severity: 'Critical', submitted: '2025-01-11' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
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
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/licensee-admin/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Organisation Incidents</h1>
          <p className="text-muted-foreground">View and manage all incidents from your organisation</p>
        </div>
        <Button onClick={() => navigate('/reporter/incidents/new')} className="glow-purple">
          <Plus className="mr-2 h-4 w-4" />
          New Incident
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, reporter..." className="pl-10" />
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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Incident ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reporter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Severity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submitted</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-primary">{incident.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium">{incident.title}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{incident.reporter}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-muted-foreground">{incident.submitted}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/reporter/incidents/${incident.id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
