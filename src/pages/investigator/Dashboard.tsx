import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FolderOpen,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  ShieldAlert,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const orgData = [
  { name: 'Express Courier', cases: 28, escalated: 5 },
  { name: 'Pos Malaysia', cases: 42, escalated: 8 },
  { name: 'J&T Express', cases: 19, escalated: 3 },
  { name: 'CityLink', cases: 15, escalated: 2 },
  { name: 'DHL eCommerce', cases: 11, escalated: 4 },
];

const severityData = [
  { name: 'Low', value: 32, color: 'hsl(var(--status-closed))' },
  { name: 'Medium', value: 45, color: 'hsl(var(--status-in-review))' },
  { name: 'High', value: 25, color: 'hsl(var(--role-investigator))' },
  { name: 'Critical', value: 13, color: 'hsl(var(--destructive))' },
];

const recentClosed = [
  { id: 'PSIRP-2025-0059', org: 'Pos Malaysia', outcome: 'Action Taken', date: '2025-06-10' },
  { id: 'PSIRP-2025-0055', org: 'Express Courier', outcome: 'No Further Action', date: '2025-06-09' },
  { id: 'PSIRP-2025-0052', org: 'J&T Express', outcome: 'Referred to LEA', date: '2025-06-08' },
  { id: 'PSIRP-2025-0049', org: 'CityLink', outcome: 'Action Taken', date: '2025-06-06' },
];

export default function InvestigatorDashboard() {
  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'role-investigator' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'status-in-review' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'destructive' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'status-closed' },
    { label: 'SLA Compliance', value: '87%', icon: TrendingUp, color: 'primary' },
    { label: 'Avg Resolution', value: '6.3d', icon: Clock, color: 'role-reviewer' },
    { label: 'Escalation Ratio', value: '15.7%', icon: AlertTriangle, color: 'role-validator' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, color: 'role-investigator' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Governance Dashboard</h1>
        <p className="text-muted-foreground">MCMC Internal — strategic oversight and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`border-${k.color}/20`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${k.color}`}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Cases by Organisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orgData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                  <Bar dataKey="cases" fill="hsl(var(--role-investigator))" radius={[4, 4, 0, 0]} name="Total Cases" />
                  <Bar dataKey="escalated" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Escalated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {severityData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Closed Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentClosed.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">{c.id}</p>
                <p className="text-xs text-muted-foreground">{c.org}</p>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline" className="text-xs">{c.outcome}</Badge>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
