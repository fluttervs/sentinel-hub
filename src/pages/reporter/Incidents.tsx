import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReporterIncidents() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const incidents = [
    { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', category: 'Theft', status: 'In Review', submitted: '2025-01-15', lastUpdated: '2 hours ago' },
    { id: 'PSIRP-2025-0023', title: 'Tampered Shipment Detected', category: 'Tampering', status: 'RFI Sent', submitted: '2025-01-14', lastUpdated: '1 hour ago' },
    { id: 'PSIRP-2025-0020', title: 'Lost Consignment Investigation', category: 'Loss', status: 'Under Investigation', submitted: '2025-01-12', lastUpdated: '5 hours ago' },
    { id: 'PSIRP-2025-0019', title: 'Dangerous Goods Mishandling', category: 'Dangerous Goods', status: 'Closed', submitted: '2025-01-10', lastUpdated: '1 day ago' },
    { id: 'PSIRP-2025-0018', title: 'Fraud Attempt Reported', category: 'Fraud', status: 'Submitted', submitted: '2025-01-09', lastUpdated: '3 days ago' },
  ];

  const filtered = incidents.filter((i) => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
              <Input
                placeholder="Search by ID, title..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="RFI Sent">RFI Sent</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" className="w-[160px]" />
            <Input type="date" className="w-[160px]" />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Reference</th>
                  <th className="pb-3 font-medium text-muted-foreground">Title</th>
                  <th className="pb-3 font-medium text-muted-foreground">Category</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground">Last Updated</th>
                  <th className="pb-3 font-medium text-muted-foreground">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((incident) => (
                  <tr
                    key={incident.id}
                    className="hover:bg-accent/30 cursor-pointer transition-colors"
                    onClick={() => navigate(`/reporter/incidents/${incident.id}`)}
                  >
                    <td className="py-3 font-mono text-primary">{incident.id}</td>
                    <td className="py-3 font-medium">{incident.title}</td>
                    <td className="py-3 text-muted-foreground">{incident.category}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{incident.lastUpdated}</td>
                    <td className="py-3 text-muted-foreground">{incident.submitted}</td>
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
