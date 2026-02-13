import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Shield } from 'lucide-react';

const auditLogs = [
  { timestamp: '2025-06-10 11:45:00', user: 'Ahmad Razif', action: 'Escalation request submitted', target: 'PSIRP-2025-0045', type: 'escalation' },
  { timestamp: '2025-06-10 10:30:00', user: 'System', action: 'Case assigned to officer', target: 'PSIRP-2025-0063', type: 'assignment' },
  { timestamp: '2025-06-10 09:15:00', user: 'Supervisor Tan', action: 'Escalation approved', target: 'PSIRP-2025-0042', type: 'escalation' },
  { timestamp: '2025-06-09 16:00:00', user: 'Nurul Hana', action: 'Clarification requested from reporter', target: 'PSIRP-2025-0050', type: 'clarification' },
  { timestamp: '2025-06-09 15:30:00', user: 'Ahmad Razif', action: 'Internal note added', target: 'PSIRP-2025-0045', type: 'note' },
  { timestamp: '2025-06-09 14:00:00', user: 'Ahmad Razif', action: 'Severity changed to Critical', target: 'PSIRP-2025-0045', type: 'classification' },
  { timestamp: '2025-06-09 11:00:00', user: 'Supervisor Tan', action: 'Case closed – No Further Action', target: 'PSIRP-2025-0028', type: 'closure' },
  { timestamp: '2025-06-09 09:00:00', user: 'Lee Wei', action: 'Status changed to Under Review', target: 'PSIRP-2025-0058', type: 'status' },
  { timestamp: '2025-06-08 17:00:00', user: 'Farah Amin', action: 'Report generated – Monthly Summary', target: 'N/A', type: 'report' },
  { timestamp: '2025-06-08 14:30:00', user: 'Lee Wei', action: 'Login successful', target: 'N/A', type: 'login' },
];

const typeColors: Record<string, string> = {
  escalation: 'border-destructive/50 text-destructive',
  assignment: 'border-status-submitted/50 text-status-submitted',
  clarification: 'border-status-rfi/50 text-status-rfi',
  note: 'border-muted-foreground/50 text-muted-foreground',
  classification: 'border-status-in-review/50 text-status-in-review',
  closure: 'border-status-closed/50 text-status-closed',
  status: 'border-role-reviewer/50 text-role-reviewer',
  report: 'border-role-validator/50 text-role-validator',
  login: 'border-muted-foreground/50 text-muted-foreground',
};

export default function AuditCompliance() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = auditLogs.filter((l) => {
    if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.target.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && l.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-role-validator" />
        <div>
          <h1 className="text-3xl font-bold">Audit & Compliance</h1>
          <p className="text-muted-foreground">Full action logs – read-only, immutable records</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search user, action, or case..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Action Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="escalation">Escalation</SelectItem>
                <SelectItem value="closure">Closure</SelectItem>
                <SelectItem value="classification">Classification</SelectItem>
                <SelectItem value="clarification">Clarification</SelectItem>
                <SelectItem value="status">Status Change</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="report">Report</SelectItem>
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
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground text-xs font-mono">{l.timestamp}</TableCell>
                  <TableCell className="font-medium">{l.user}</TableCell>
                  <TableCell>{l.action}</TableCell>
                  <TableCell className="font-mono text-sm">{l.target}</TableCell>
                  <TableCell><Badge variant="outline" className={typeColors[l.type] || ''}>{l.type}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
