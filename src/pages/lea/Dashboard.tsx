import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Upload, CheckCircle2, AlertCircle, Bell, TrendingUp, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

const pendingAck = [
  { id: 'ESC-2025-004', title: 'Counterfeit stamps distribution', org: 'Pos Malaysia', severity: 'High', escalatedDate: '2025-06-14' },
  { id: 'ESC-2025-005', title: 'Organised parcel interception ring', org: 'J&T Express', severity: 'Critical', escalatedDate: '2025-06-15' },
];

const recentCases = [
  { id: 'ESC-2025-001', title: 'Theft of High-Value Consignment', status: 'Under Investigation', escalatedDate: '2025-06-10' },
  { id: 'ESC-2025-002', title: 'Tampering with Postal Items', status: 'Evidence Seized', escalatedDate: '2025-06-12' },
  { id: 'ESC-2025-003', title: 'Narcotics via Postal Channel', status: 'Pending Further Information', escalatedDate: '2025-06-13' },
];

const statusBreakdown = [
  { status: 'Under Investigation', count: 4, color: 'primary' },
  { status: 'Evidence Seized', count: 2, color: 'role-validator' },
  { status: 'Pending Info', count: 2, color: 'status-rfi' },
  { status: 'Outcome Submitted', count: 3, color: 'status-closed' },
];

const monthlyEscalations = [
  { month: 'Jan', escalated: 3, resolved: 2 },
  { month: 'Feb', escalated: 5, resolved: 3 },
  { month: 'Mar', escalated: 4, resolved: 4 },
  { month: 'Apr', escalated: 6, resolved: 5 },
  { month: 'May', escalated: 7, resolved: 4 },
  { month: 'Jun', escalated: 5, resolved: 6 },
];

const severityDistribution = [
  { name: 'Critical', value: 4, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 8, color: 'hsl(var(--role-validator))' },
  { name: 'Medium', value: 6, color: 'hsl(var(--primary))' },
  { name: 'Low', value: 3, color: 'hsl(var(--status-closed))' },
];

const casesByCategory = [
  { category: 'Theft', count: 5 },
  { category: 'Narcotics', count: 3 },
  { category: 'Tampering', count: 4 },
  { category: 'Fraud', count: 2 },
  { category: 'Dangerous Goods', count: 2 },
];

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function LEADashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">LEA Dashboard</h1>
        <p className="text-muted-foreground">PDRM — Escalated case overview and investigation management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total Escalated', value: '11', icon: Shield, color: 'hsl(220 70% 50%)' },
          { label: 'Under Investigation', value: '4', icon: Clock, color: 'hsl(var(--role-validator))' },
          { label: 'Pending Clarification', value: '2', icon: AlertCircle, color: 'hsl(var(--status-rfi))' },
          { label: 'Evidence Submitted', value: '7', icon: Upload, color: 'hsl(var(--primary))' },
          { label: 'Outcome Submitted', value: '3', icon: CheckCircle2, color: 'hsl(var(--status-closed))' },
        ].map((k) => (
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

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Escalated Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCases.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{c.id}</p>
                  <p className="text-xs text-muted-foreground">{c.title}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-xs">{c.status}</Badge>
                  <p className="text-xs text-muted-foreground">{c.escalatedDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Investigation Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {statusBreakdown.map((s) => (
              <div key={s.status} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <span className="text-sm">{s.status}</span>
                <span className={`text-lg font-bold text-${s.color}`}>{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Monthly Escalation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEscalations}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="escalated" stroke="hsl(220 70% 50%)" strokeWidth={2} name="Escalated" />
                  <Line type="monotone" dataKey="resolved" stroke="hsl(var(--status-closed))" strokeWidth={2} name="Resolved" />
                </LineChart>
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
              <ResponsiveContainer width="55%" height={250}>
                <PieChart>
                  <Pie data={severityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
                    {severityDistribution.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2">
                {severityDistribution.map((s) => (
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Cases by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casesByCategory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-xs" />
                <YAxis className="text-xs" allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="hsl(220 70% 50%)" radius={[4, 4, 0, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}