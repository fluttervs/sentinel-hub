import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, AlertTriangle, Clock, CheckCircle2, BarChart3, MapPin, Users, Repeat, Search as SearchIcon } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

// === Section I: Incident Submission Overview ===
const incidentsByCategory = [
  { name: 'Theft', value: 18, color: 'hsl(var(--destructive))' },
  { name: 'Suspicious Parcel', value: 10, color: 'hsl(var(--status-in-review))' },
  { name: 'Prohibited Items', value: 8, color: 'hsl(var(--status-rfi))' },
  { name: 'Security Breach', value: 6, color: 'hsl(var(--status-investigation))' },
  { name: 'Others', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const incidentsBySeverity = [
  { name: 'Critical', value: 4, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 14, color: 'hsl(var(--status-rfi))' },
  { name: 'Medium', value: 18, color: 'hsl(var(--status-in-review))' },
  { name: 'Low', value: 11, color: 'hsl(var(--status-closed))' },
];

const draftVsSubmittedVsReturned = [
  { month: 'Aug', draft: 1, submitted: 5, returned: 0 },
  { month: 'Sep', draft: 2, submitted: 6, returned: 1 },
  { month: 'Oct', draft: 1, submitted: 9, returned: 2 },
  { month: 'Nov', draft: 2, submitted: 7, returned: 1 },
  { month: 'Dec', draft: 1, submitted: 5, returned: 1 },
  { month: 'Jan', draft: 1, submitted: 4, returned: 0 },
];

// === Section II: SLA & Compliance ===
const reportingTimeTrend = [
  { month: 'Aug', avgHours: 6.2, regulatory: 4 },
  { month: 'Sep', avgHours: 5.8, regulatory: 4 },
  { month: 'Oct', avgHours: 4.5, regulatory: 4 },
  { month: 'Nov', avgHours: 3.9, regulatory: 4 },
  { month: 'Dec', avgHours: 3.2, regulatory: 4 },
  { month: 'Jan', avgHours: 2.4, regulatory: 4 },
];

// === Section III: Internal Performance ===
const incidentsByBranch = [
  { branch: 'KL Hub', incidents: 14 },
  { branch: 'Selangor', incidents: 11 },
  { branch: 'Penang', incidents: 7 },
  { branch: 'Johor Bahru', incidents: 6 },
  { branch: 'Sabah', incidents: 5 },
  { branch: 'Sarawak', incidents: 4 },
];

const incidentsByOfficer = [
  { name: 'Ahmad Abdullah', count: 14 },
  { name: 'Mastura Hassan', count: 11 },
  { name: 'Kamal Hassan', count: 9 },
  { name: 'Fatimah Zahra', count: 8 },
  { name: 'Azman Ali', count: 5 },
];

const repeatIncidentTypes = [
  { type: 'Theft at Sorting Centre', count: 7, trend: 'increasing' },
  { type: 'Suspicious Parcel – Scanner Alert', count: 5, trend: 'stable' },
  { type: 'Unauthorized Facility Access', count: 4, trend: 'decreasing' },
  { type: 'Parcel Tampering', count: 3, trend: 'stable' },
];

const rootCausePatterns = [
  { cause: 'Inadequate CCTV coverage', percentage: 28 },
  { cause: 'Shift handover gaps', percentage: 22 },
  { cause: 'Weak access control', percentage: 18 },
  { cause: 'Insufficient staff training', percentage: 16 },
  { cause: 'Equipment malfunction', percentage: 10 },
  { cause: 'Other', percentage: 6 },
];

export default function LicenseeAdminAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">Incident submission, compliance & internal performance</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* ====== SECTION I: Incident Submission Overview ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          I. Incident Submission Overview
        </h2>

        {/* Period metrics */}
        <div className="grid gap-4 grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Month</p>
              <p className="text-3xl font-bold text-primary">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Quarter</p>
              <p className="text-3xl font-bold text-primary">16</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Year</p>
              <p className="text-3xl font-bold text-primary">47</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* By Category */}
          <Card>
            <CardHeader><CardTitle className="text-base">Incidents by Category</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ResponsiveContainer width="55%" height={220}>
                  <PieChart>
                    <Pie data={incidentsByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {incidentsByCategory.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-[45%] space-y-2">
                  {incidentsByCategory.map(s => (
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

          {/* By Severity */}
          <Card>
            <CardHeader><CardTitle className="text-base">Incidents by Severity</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ResponsiveContainer width="55%" height={220}>
                  <PieChart>
                    <Pie data={incidentsBySeverity} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {incidentsBySeverity.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-[45%] space-y-2">
                  {incidentsBySeverity.map(s => (
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

        {/* Draft vs Submitted vs Returned */}
        <Card>
          <CardHeader><CardTitle className="text-base">Draft vs Submitted vs Returned</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={draftVsSubmittedVsReturned}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Bar dataKey="draft" fill="hsl(var(--muted-foreground))" name="Draft" />
                <Bar dataKey="submitted" fill="hsl(var(--role-licensee-admin))" name="Submitted" />
                <Bar dataKey="returned" fill="hsl(var(--status-rfi))" name="Returned" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ====== SECTION II: SLA & Compliance Tracking ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-status-in-review" />
          II. SLA & Compliance Tracking
        </h2>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Avg Reporting Time</p>
              <p className="text-2xl font-bold">2.4h</p>
              <p className="text-xs text-muted-foreground">incident → submission</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Late Submissions</p>
              <p className="text-2xl font-bold text-status-rfi">3</p>
              <p className="text-xs text-muted-foreground">this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">SLA Breached Cases</p>
              <p className="text-2xl font-bold text-destructive">2</p>
              <p className="text-xs text-muted-foreground">all-time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">SLA Compliance</p>
              <p className="text-2xl font-bold text-status-closed">92%</p>
              <p className="text-xs text-muted-foreground">target: 90%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Reporting Trend vs Regulatory Expectation</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={reportingTimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="h" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="avgHours" stroke="hsl(var(--role-licensee-admin))" strokeWidth={2} name="Avg Reporting Time" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="regulatory" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" name="Regulatory Target" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ====== SECTION III: Internal Performance Monitoring ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-role-licensee-admin" />
          III. Internal Performance Monitoring
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* By Branch/Region */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Incidents by Branch / Region</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={incidentsByBranch}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="branch" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="incidents" fill="hsl(var(--role-licensee-admin))" radius={[4, 4, 0, 0]} name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* By Reporting Officer */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Incidents by Reporting Officer</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={incidentsByOfficer} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Repeat Incident Types */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Repeat className="h-4 w-4" /> Repeat Incident Types</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {repeatIncidentTypes.map(r => (
                <div key={r.type} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{r.type}</p>
                    <p className="text-xs text-muted-foreground">{r.count} occurrences</p>
                  </div>
                  <Badge variant="outline" className={
                    r.trend === 'increasing' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                    r.trend === 'decreasing' ? 'bg-status-closed/20 text-status-closed border-status-closed/30' :
                    'bg-muted text-muted-foreground border-border'
                  }>
                    {r.trend}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Root Cause Patterns */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><SearchIcon className="h-4 w-4" /> Root Cause Patterns</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {rootCausePatterns.map(rc => (
                <div key={rc.cause} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{rc.cause}</span>
                    <span className="text-sm font-bold">{rc.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500 bg-role-licensee-admin"
                      style={{ width: `${rc.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
