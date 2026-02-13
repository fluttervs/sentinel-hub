import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const officers = [
  { name: 'Ahmad Razif', cases: 8, avg: 9.2, escalation: 25, clarification: 37, sla: 87 },
  { name: 'Nurul Hana', cases: 6, avg: 7.5, escalation: 17, clarification: 33, sla: 100 },
  { name: 'Lee Wei', cases: 9, avg: 11.1, escalation: 33, clarification: 44, sla: 78 },
  { name: 'Farah Amin', cases: 5, avg: 6.3, escalation: 20, clarification: 20, sla: 100 },
  { name: 'Raj Kumar', cases: 4, avg: 8.0, escalation: 0, clarification: 25, sla: 100 },
  { name: 'Siti Mariam', cases: 2, avg: 5.5, escalation: 0, clarification: 0, sla: 100 },
];

const trendData = [
  { month: 'Jan', avgDays: 10.2, slaRate: 82 },
  { month: 'Feb', avgDays: 9.5, slaRate: 85 },
  { month: 'Mar', avgDays: 8.8, slaRate: 88 },
  { month: 'Apr', avgDays: 9.1, slaRate: 86 },
  { month: 'May', avgDays: 8.0, slaRate: 91 },
  { month: 'Jun', avgDays: 8.4, slaRate: 91 },
];

export default function OfficerPerformance() {
  const [period, setPeriod] = useState('6m');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Officer Performance</h1>
          <p className="text-muted-foreground">Monitor Case Officer productivity and SLA compliance</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle>Performance Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="avgDays" name="Avg Processing Days" stroke="hsl(var(--role-validator))" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="slaRate" name="SLA Compliance %" stroke="hsl(var(--status-closed))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Officer Summary</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer</TableHead>
                <TableHead>Cases</TableHead>
                <TableHead>Avg Days</TableHead>
                <TableHead>Escalation Rate</TableHead>
                <TableHead>Clarification Rate</TableHead>
                <TableHead>SLA Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {officers.map((o) => (
                <TableRow key={o.name}>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell>{o.cases}</TableCell>
                  <TableCell>{o.avg}</TableCell>
                  <TableCell>{o.escalation}%</TableCell>
                  <TableCell>{o.clarification}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={o.sla} className="h-2 w-16" />
                      <span className={o.sla >= 90 ? 'text-status-closed' : o.sla >= 80 ? 'text-status-in-review' : 'text-destructive'}>{o.sla}%</span>
                    </div>
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
