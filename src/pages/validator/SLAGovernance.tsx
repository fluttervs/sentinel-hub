import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const officerSLA = [
  { officer: 'Ahmad Razif', total: 8, compliant: 7, breached: 1, rate: 87, avg: 9.2 },
  { officer: 'Nurul Hana', total: 6, compliant: 6, breached: 0, rate: 100, avg: 7.5 },
  { officer: 'Lee Wei', total: 9, compliant: 7, breached: 2, rate: 78, avg: 11.1 },
  { officer: 'Farah Amin', total: 5, compliant: 5, breached: 0, rate: 100, avg: 6.3 },
  { officer: 'Raj Kumar', total: 4, compliant: 4, breached: 0, rate: 100, avg: 8.0 },
  { officer: 'Siti Mariam', total: 2, compliant: 2, breached: 0, rate: 100, avg: 5.5 },
];

const breachList = [
  { id: 'PSIRP-2025-0039', officer: 'Ahmad Razif', daysOpen: 16, threshold: 14, status: 'Under Review' },
  { id: 'PSIRP-2025-0044', officer: 'Lee Wei', daysOpen: 15, threshold: 14, status: 'Clarification Requested' },
  { id: 'PSIRP-2025-0048', officer: 'Lee Wei', daysOpen: 18, threshold: 14, status: 'Under Review' },
];

const chartData = officerSLA.map((o) => ({ name: o.officer.split(' ')[0], rate: o.rate, avg: o.avg }));

export default function SLAGovernance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SLA Governance</h1>
        <p className="text-muted-foreground">Monitor SLA compliance across officers and cases</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Overall Compliance</p><p className="text-3xl font-bold text-status-closed">91%</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Avg Resolution (days)</p><p className="text-3xl font-bold text-role-validator">8.4</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Active Breaches</p><p className="text-3xl font-bold text-destructive">3</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Escalation Turnaround</p><p className="text-3xl font-bold text-role-reviewer">1.8 days</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>SLA Compliance by Officer</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="rate" name="SLA %" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.rate >= 90 ? 'hsl(var(--status-closed))' : entry.rate >= 80 ? 'hsl(var(--status-in-review))' : 'hsl(var(--destructive))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Officer SLA Detail</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer</TableHead>
                <TableHead>Total Cases</TableHead>
                <TableHead>Compliant</TableHead>
                <TableHead>Breached</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Avg Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {officerSLA.map((o) => (
                <TableRow key={o.officer}>
                  <TableCell className="font-medium">{o.officer}</TableCell>
                  <TableCell>{o.total}</TableCell>
                  <TableCell className="text-status-closed">{o.compliant}</TableCell>
                  <TableCell className={o.breached > 0 ? 'text-destructive' : ''}>{o.breached}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={o.rate} className="h-2 w-16" />
                      <span className={o.rate >= 90 ? 'text-status-closed' : o.rate >= 80 ? 'text-status-in-review' : 'text-destructive'}>{o.rate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{o.avg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-destructive">Active SLA Breaches</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Days Open</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Overage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breachList.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.id}</TableCell>
                  <TableCell>{b.officer}</TableCell>
                  <TableCell className="text-destructive font-medium">{b.daysOpen}</TableCell>
                  <TableCell>{b.threshold}</TableCell>
                  <TableCell className="text-destructive">+{b.daysOpen - b.threshold} days</TableCell>
                  <TableCell><Badge variant="outline" className="border-status-in-review/50 text-status-in-review">{b.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
