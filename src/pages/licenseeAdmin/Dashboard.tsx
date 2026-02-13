import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users, FileText, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown,
  Shield, Activity
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';

const kpiCards = [
  { label: 'Total Reporters', value: 12, change: +8.3, icon: Users, color: 'text-role-licensee-admin' },
  { label: 'Active Reporters', value: 10, change: +5.0, icon: Activity, color: 'text-status-closed' },
  { label: 'Total Incidents', value: 47, change: +12.5, icon: FileText, color: 'text-primary' },
  { label: 'Under Review', value: 8, change: -15.0, icon: Clock, color: 'text-status-in-review' },
  { label: 'Escalated Cases', value: 5, change: +25.0, icon: AlertTriangle, color: 'text-destructive' },
  { label: 'Closed Cases', value: 30, change: +10.0, icon: CheckCircle2, color: 'text-status-closed' },
  { label: 'Avg Submission', value: '2.4h', change: -18.0, icon: TrendingDown, color: 'text-primary' },
  { label: 'Compliance Score', value: '92%', change: +3.2, icon: Shield, color: 'text-role-licensee-admin' },
];

const submissionTrend = [
  { month: 'Aug', current: 6, previous: 4 },
  { month: 'Sep', current: 8, previous: 5 },
  { month: 'Oct', current: 12, previous: 7 },
  { month: 'Nov', current: 9, previous: 8 },
  { month: 'Dec', current: 7, previous: 10 },
  { month: 'Jan', current: 5, previous: 6 },
];

const statusDistribution = [
  { name: 'Draft', value: 3, color: 'hsl(var(--status-draft))' },
  { name: 'Submitted', value: 8, color: 'hsl(var(--status-submitted))' },
  { name: 'Under Review', value: 6, color: 'hsl(var(--status-in-review))' },
  { name: 'Escalated', value: 5, color: 'hsl(var(--status-investigation))' },
  { name: 'Closed', value: 25, color: 'hsl(var(--status-closed))' },
];

const reporterPerformance = [
  { name: 'Ahmad Abdullah', submissions: 14, avgTime: 1.8, escalation: 7 },
  { name: 'Mastura Hassan', submissions: 11, avgTime: 2.1, escalation: 9 },
  { name: 'Kamal Hassan', submissions: 9, avgTime: 3.2, escalation: 22 },
  { name: 'Fatimah Zahra', submissions: 8, avgTime: 2.5, escalation: 12 },
  { name: 'Azman Ali', submissions: 5, avgTime: 4.1, escalation: 40 },
];

const caseTypeByMonth = [
  { month: 'Aug', theft: 2, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
  { month: 'Sep', theft: 3, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Oct', theft: 4, suspicious: 3, prohibited: 2, breach: 2, others: 1 },
  { month: 'Nov', theft: 3, suspicious: 2, prohibited: 2, breach: 1, others: 1 },
  { month: 'Dec', theft: 2, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Jan', theft: 1, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
];

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function LicenseeAdminDashboard() {
  const escalationRatio = ((5 / 47) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Organisational overview — Express Courier Sdn Bhd</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {kpi.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-status-closed" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-primary" />
                )}
                <span className={`text-xs font-medium ${kpi.change > 0 ? 'text-status-closed' : 'text-primary'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submission Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Incident Submission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={submissionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="hsl(var(--role-licensee-admin))" strokeWidth={2} name="Current" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="previous" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" name="Previous" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution Donut */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number, name: string) => [`${value} (${((value / 47) * 100).toFixed(0)}%)`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[40%] space-y-2">
                {statusDistribution.map((s) => (
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

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reporter Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporter Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={reporterPerformance} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="submissions" fill="hsl(var(--role-licensee-admin))" radius={[0, 4, 4, 0]} name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-status-closed" />
                <span className="text-status-closed font-medium">Top: Ahmad Abdullah</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-destructive" />
                <span className="text-destructive font-medium">Lowest: Azman Ali</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Type Analysis Stacked Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Type Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={caseTypeByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Bar dataKey="theft" stackId="a" fill="hsl(var(--destructive))" name="Theft" />
                <Bar dataKey="suspicious" stackId="a" fill="hsl(var(--status-in-review))" name="Suspicious Parcel" />
                <Bar dataKey="prohibited" stackId="a" fill="hsl(var(--status-rfi))" name="Prohibited Items" />
                <Bar dataKey="breach" stackId="a" fill="hsl(var(--status-investigation))" name="Security Breach" />
                <Bar dataKey="others" stackId="a" fill="hsl(var(--muted-foreground))" name="Others" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Escalation Ratio */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full border-4 border-destructive/30 flex items-center justify-center bg-destructive/10">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Escalation Ratio to LEA</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{escalationRatio}%</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive font-medium">+2.1% from last month</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">5 out of 47 total incidents escalated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
