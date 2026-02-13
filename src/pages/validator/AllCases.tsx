import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allCases = [
  { id: 'PSIRP-2025-0063', org: 'Express Courier', officer: 'Raj Kumar', severity: 'Medium', status: 'Under Review', escalation: 'None', sla: 4, date: '2025-06-09' },
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', sla: 1, date: '2025-06-10' },
  { id: 'PSIRP-2025-0058', org: 'J&T Express', officer: 'Lee Wei', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', sla: 3, date: '2025-06-08' },
  { id: 'PSIRP-2025-0055', org: 'DHL eCommerce', officer: 'Ahmad Razif', severity: 'High', status: 'Under Review', escalation: 'None', sla: 6, date: '2025-06-06' },
  { id: 'PSIRP-2025-0052', org: 'Ninja Van', officer: 'Nurul Hana', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', sla: 1, date: '2025-06-10' },
  { id: 'PSIRP-2025-0048', org: 'CityLink', officer: 'Lee Wei', severity: 'Low', status: 'Clarification Requested', escalation: 'None', sla: 8, date: '2025-06-03' },
  { id: 'PSIRP-2025-0045', org: 'Express Courier', officer: 'Ahmad Razif', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', sla: 2, date: '2025-06-09' },
  { id: 'PSIRP-2025-0030', org: 'Pos Malaysia', officer: 'Nurul Hana', severity: 'Medium', status: 'Closed', escalation: 'None', sla: 0, date: '2025-05-28' },
  { id: 'PSIRP-2025-0025', org: 'DHL eCommerce', officer: 'Farah Amin', severity: 'High', status: 'Escalated', escalation: 'Approved', sla: 0, date: '2025-05-22' },
];

const statusColors: Record<string, string> = {
  'Under Review': 'border-status-in-review/50 text-status-in-review',
  'Escalation Pending': 'border-destructive/50 text-destructive',
  'Clarification Requested': 'border-status-rfi/50 text-status-rfi',
  'Closed': 'border-status-closed/50 text-status-closed',
  'Escalated': 'border-role-reviewer/50 text-role-reviewer',
  'Submitted': 'border-status-submitted/50 text-status-submitted',
};

export default function AllCases() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = allCases.filter((c) => {
    if (search && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.org.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (severityFilter !== 'all' && c.severity !== severityFilter) return false;
    if (orgFilter !== 'all' && c.org !== orgFilter) return false;
    return true;
  });

  const orgs = [...new Set(allCases.map((c) => c.org))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Cases</h1>
        <p className="text-muted-foreground">View all cases within authorised scope</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
                <SelectItem value="Clarification Requested">Clarification Requested</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger><SelectValue placeholder="Organisation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organisations</SelectItem>
                {orgs.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Escalation</TableHead>
                <TableHead>SLA (days)</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.org}</TableCell>
                  <TableCell>{c.officer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={c.severity === 'Critical' ? 'border-destructive/50 text-destructive' : c.severity === 'High' ? 'border-status-in-review/50 text-status-in-review' : 'border-muted-foreground/50 text-muted-foreground'}>
                      {c.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[c.status] || ''}>{c.status}</Badge>
                  </TableCell>
                  <TableCell>{c.escalation}</TableCell>
                  <TableCell>{c.sla > 0 ? c.sla : '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{c.date}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/validator/cases/${c.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
