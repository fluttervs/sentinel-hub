import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Lock } from 'lucide-react';

const auditLogs = [
  { timestamp: '2025-06-15 08:00', user: 'System', action: 'Case escalated to PDRM', category: 'Escalation', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-14 17:30', user: 'Supervisor Ahmad', action: 'Escalation approved', category: 'Escalation', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-14 16:00', user: 'Raj Kumar', action: 'Escalation proposed to PDRM', category: 'Escalation', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-13 09:30', user: 'Ali Hassan', action: 'Clarification response submitted', category: 'Clarification', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-12 11:45', user: 'Raj Kumar', action: 'Clarification requested', category: 'Clarification', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-11 10:00', user: 'Raj Kumar', action: 'Severity set to Medium', category: 'Assessment', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-10 14:30', user: 'System', action: 'Case assigned to Raj Kumar', category: 'Assignment', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-10 09:15', user: 'Ali Hassan', action: 'Incident submitted', category: 'Submission', ref: 'PSIRP-2025-0063' },
  { timestamp: '2025-06-09 16:00', user: 'Supervisor Ahmad', action: 'Case closed – Action Taken', category: 'Closure', ref: 'PSIRP-2025-0055' },
  { timestamp: '2025-06-09 08:20', user: 'Farah Amin', action: 'Login successful', category: 'Auth', ref: '-' },
  { timestamp: '2025-06-08 14:10', user: 'Lee Wei', action: 'Report exported (PDF)', category: 'Report', ref: '-' },
  { timestamp: '2025-06-06 11:00', user: 'Supervisor Ahmad', action: 'Case closed – No Further Action', category: 'Closure', ref: 'PSIRP-2025-0049' },
];

const categoryColors: Record<string, string> = {
  Escalation: 'border-destructive/50 text-destructive',
  Clarification: 'border-role-reviewer/50 text-role-reviewer',
  Assessment: 'border-role-validator/50 text-role-validator',
  Assignment: 'border-primary/50 text-primary',
  Submission: 'border-status-submitted/50 text-status-submitted',
  Closure: 'border-status-closed/50 text-status-closed',
  Auth: 'border-muted-foreground/50 text-muted-foreground',
  Report: 'border-role-investigator/50 text-role-investigator',
};

export default function InvestigatorAuditCompliance() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = auditLogs.filter((l) => {
    const matchSearch = !search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.ref.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || l.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit & Compliance</h1>
          <p className="text-muted-foreground">System action logs — read-only</p>
        </div>
        <Badge variant="outline" className="bg-role-investigator/10 text-role-investigator border-role-investigator/30 gap-1">
          <Lock className="h-3 w-3" /> Immutable Log
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by user, action, reference..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Escalation">Escalation</SelectItem>
                <SelectItem value="Clarification">Clarification</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
                <SelectItem value="Assignment">Assignment</SelectItem>
                <SelectItem value="Submission">Submission</SelectItem>
                <SelectItem value="Closure">Closure</SelectItem>
                <SelectItem value="Auth">Auth</SelectItem>
                <SelectItem value="Report">Report</SelectItem>
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
                <TableHead>Category</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs font-mono">{l.timestamp}</TableCell>
                  <TableCell className="font-medium">{l.user}</TableCell>
                  <TableCell>{l.action}</TableCell>
                  <TableCell><Badge variant="outline" className={categoryColors[l.category] || ''}>{l.category}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{l.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
