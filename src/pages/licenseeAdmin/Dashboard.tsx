import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, FileText, AlertTriangle, CheckCircle2, Clock,
  Activity
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';

const kpiCards = [
  { label: 'Total Reporters', value: 12, icon: Users, color: 'text-role-licensee-admin' },
  { label: 'Active Reporters', value: 10, icon: Activity, color: 'text-status-closed' },
  { label: 'Total Incidents', value: 47, icon: FileText, color: 'text-primary' },
  { label: 'Under Review', value: 8, icon: Clock, color: 'text-status-in-review' },
  { label: 'Escalated Cases', value: 5, icon: AlertTriangle, color: 'text-destructive' },
  { label: 'Closed Cases', value: 30, icon: CheckCircle2, color: 'text-status-closed' },
];

const casesByState = [
  { state: 'Selangor', cases: 12 },
  { state: 'KL', cases: 9 },
  { state: 'Johor', cases: 7 },
  { state: 'Penang', cases: 5 },
  { state: 'Sabah', cases: 4 },
  { state: 'Sarawak', cases: 3 },
  { state: 'Perak', cases: 3 },
  { state: 'Others', cases: 4 },
];

const statusDistribution = [
  { name: 'Draft', value: 3, color: 'hsl(var(--status-draft))' },
  { name: 'Submitted', value: 8, color: 'hsl(var(--status-submitted))' },
  { name: 'Under Review', value: 6, color: 'hsl(var(--status-in-review))' },
  { name: 'Escalated', value: 5, color: 'hsl(var(--status-investigation))' },
  { name: 'Closed', value: 25, color: 'hsl(var(--status-closed))' },
];

const caseSubmissionByReporter = [
  { name: 'Ahmad Abdullah', submissions: 14 },
  { name: 'Mastura Hassan', submissions: 11 },
  { name: 'Kamal Hassan', submissions: 9 },
  { name: 'Fatimah Zahra', submissions: 8 },
  { name: 'Azman Ali', submissions: 5 },
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Organisational overview — Express Courier Sdn Bhd</p>
      </div>

      {/* KPI Cards — no trend indicators */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Incident Cases by State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Incident Cases by State</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={casesByState}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="state" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="cases" fill="hsl(var(--role-licensee-admin))" radius={[4, 4, 0, 0]} name="Cases" />
              </BarChart>
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
        {/* Case Submission by Reporter — no Top/Lowest indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Submission by Reporter</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={caseSubmissionByReporter} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="submissions" fill="hsl(var(--role-licensee-admin))" radius={[0, 4, 4, 0]} name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
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

      {/* Announcements */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo maintenance this Saturday from 2 AM to 6 AM.', from: 'System Admin', time: '2 hours ago', priority: 'high' },
            { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month.', from: 'MCMC', time: '1 day ago', priority: 'normal' },
            { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation.', from: 'MCMC', time: '3 days ago', priority: 'normal' },
          ].map((announcement) => (
            <div
              key={announcement.id}
              className={`p-3 rounded-lg border transition-all ${
                announcement.priority === 'high'
                  ? 'border-destructive/40 bg-destructive/5'
                  : 'border-border bg-secondary/30'
              }`}
            >
              <p className="text-sm font-medium mb-1">{announcement.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{announcement.message}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>From: {announcement.from}</span>
                <span>{announcement.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
