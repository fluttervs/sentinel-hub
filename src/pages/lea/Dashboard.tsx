import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FolderOpen, AlertTriangle, Clock, CheckCircle, TrendingUp,
  ArrowUpRight, BarChart3, ShieldAlert, Shield, Bell, Upload, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

/* ── Static data ── */
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

const pendingAck = [
  { id: 'ESC-2025-004', title: 'Counterfeit stamps distribution', org: 'Pos Malaysia', severity: 'High', escalatedDate: '2025-06-14' },
  { id: 'ESC-2025-005', title: 'Organised parcel interception ring', org: 'J&T Express', severity: 'Critical', escalatedDate: '2025-06-15' },
];

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function LEADashboard() {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'hsl(220 70% 50%)' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'hsl(var(--status-in-review))' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'hsl(var(--destructive))' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'hsl(var(--status-closed))' },
    { label: 'Avg Resolution', value: '6.3d', icon: TrendingUp, color: 'hsl(var(--role-reviewer))' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, color: 'hsl(var(--role-investigator))' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agency Dashboard</h1>
        <p className="text-muted-foreground">PDRM — Strategic oversight and escalated case analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Acknowledgement */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4 text-destructive" /> Cases Pending Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingAck.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg bg-destructive/5">
              <div className="space-y-1">
                <p className="text-sm font-medium">{c.id} — {c.title}</p>
                <p className="text-xs text-muted-foreground">{c.org} · Severity: {c.severity} · Escalated: {c.escalatedDate}</p>
              </div>
              <Button size="sm" onClick={() => navigate(`/lea/cases/${c.id}`)}>Acknowledge</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Analytics Charts — matching MCMC Internal style */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Cases by Organisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orgData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="cases" fill="hsl(220 70% 50%)" radius={[4, 4, 0, 0]} name="Total Cases" />
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
            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={260}>
                <PieChart>
                  <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    {severityData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2">
                {severityData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Closed Cases */}
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
