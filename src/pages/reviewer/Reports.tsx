import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileBarChart, Printer, Megaphone, Pin, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' };

const caseSummary = [
  { id: 'PSIRP-2025-0028', status: 'Under Review', severity: 'Critical', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0027', status: 'Pending Review', severity: 'High', organisation: 'Swift Logistics Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0026', status: 'Clarification Requested', severity: 'High', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0025', status: 'Under Review', severity: 'Medium', organisation: 'Fast Delivery Enterprise', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0022', status: 'Escalated', severity: 'Critical', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0019', status: 'Closed', severity: 'High', organisation: 'Pos Malaysia Berhad', officer: 'CO-2024-015' },
];

const severityData = [
  { name: 'Critical', value: 2, color: 'hsl(0 78% 62%)' },
  { name: 'High', value: 3, color: 'hsl(25 95% 53%)' },
  { name: 'Medium', value: 1, color: 'hsl(48 96% 53%)' },
  { name: 'Low', value: 0, color: 'hsl(142 71% 45%)' },
];

const statusData = [
  { name: 'Pending Review', value: 1, color: 'hsl(203 89% 53%)' },
  { name: 'Under Review', value: 2, color: 'hsl(38 92% 50%)' },
  { name: 'Clarification', value: 1, color: 'hsl(271 76% 53%)' },
  { name: 'Escalated', value: 1, color: 'hsl(0 78% 62%)' },
  { name: 'Closed', value: 1, color: 'hsl(168 76% 42%)' },
];

const monthlyTrend = [
  { month: 'Aug', submitted: 4, closed: 2, escalated: 1 },
  { month: 'Sep', submitted: 6, closed: 4, escalated: 1 },
  { month: 'Oct', submitted: 5, closed: 3, escalated: 2 },
  { month: 'Nov', submitted: 8, closed: 5, escalated: 2 },
  { month: 'Dec', submitted: 7, closed: 6, escalated: 1 },
  { month: 'Jan', submitted: 6, closed: 3, escalated: 2 },
];

const orgBreakdown = [
  { org: 'Express Courier', cases: 8, escalated: 3 },
  { org: 'Swift Logistics', cases: 5, escalated: 1 },
  { org: 'Fast Delivery', cases: 3, escalated: 0 },
  { org: 'Pos Malaysia', cases: 4, escalated: 1 },
];

const announcements = [
  { id: 1, title: 'New SOP for Critical Case Escalation', content: 'All critical severity cases must now be escalated within 24 hours of receipt. Updated guidelines are available in the knowledge base.', date: '2025-01-18', priority: 'high', pinned: true },
  { id: 2, title: 'System Maintenance — 25 Jan 2025', content: 'Scheduled maintenance window from 02:00 to 06:00 MYT. The portal will be unavailable during this period.', date: '2025-01-17', priority: 'medium', pinned: true },
  { id: 3, title: 'Q4 2024 Incident Report Published', content: 'The quarterly incident summary for all licensees has been published. Case officers are encouraged to review trends.', date: '2025-01-15', priority: 'low', pinned: false },
  { id: 4, title: 'Training: Advanced Case Assessment Techniques', content: 'Mandatory training session on 28 Jan 2025 at 10:00 MYT. All case officers must attend via the internal training portal.', date: '2025-01-14', priority: 'medium', pinned: false },
];

export default function CaseOfficerReports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');

  const handleExport = (format: string) => {
    toast({ title: `Exporting as ${format}`, description: 'Your report is being generated.' });
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'Clarification Requested': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Escalated': 'bg-destructive/20 text-destructive border-destructive/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[s] || 'bg-secondary';
  };

  const getPriorityStyle = (p: string) => {
    const styles: Record<string, string> = {
      high: 'border-destructive/30 bg-destructive/5',
      medium: 'border-status-rfi/30 bg-status-rfi/5',
      low: 'border-border',
    };
    return styles[p] || 'border-border';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Report</h1>
          <p className="text-muted-foreground">Incident trend analytics, reports, and announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('PDF')}><Download className="mr-2 h-4 w-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => handleExport('Excel')}><Download className="mr-2 h-4 w-4" />Export Excel</Button>
          <Button variant="outline" onClick={() => handleExport('Print')}><Printer className="mr-2 h-4 w-4" />Print</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Summary Analytics</TabsTrigger>
          <TabsTrigger value="reports">Case Reports</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* ===== ANALYTICS TAB ===== */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-role-reviewer/20 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-role-reviewer" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.length}</p><p className="text-xs text-muted-foreground">Total Active Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.filter(c => c.severity === 'Critical').length}</p><p className="text-xs text-muted-foreground">Critical Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-status-closed/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-status-closed" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.filter(c => c.status === 'Closed').length}</p><p className="text-xs text-muted-foreground">Closed Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-status-rfi/20 flex items-center justify-center"><Clock className="h-5 w-5 text-status-rfi" /></div>
                <div><p className="text-2xl font-bold">4.2</p><p className="text-xs text-muted-foreground">Avg. Days to Close</p></div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1: Trend + Severity */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Monthly Case Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="submitted" stroke="hsl(203 89% 53%)" strokeWidth={2} name="Submitted" />
                    <Line type="monotone" dataKey="closed" stroke="hsl(168 76% 42%)" strokeWidth={2} name="Closed" />
                    <Line type="monotone" dataKey="escalated" stroke="hsl(0 78% 62%)" strokeWidth={2} name="Escalated" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Severity Distribution</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={severityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                      {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  {severityData.map(s => (
                    <div key={s.name} className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-muted-foreground">{s.name} ({s.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2: Status + Org */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Status Overview</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Cases by Organisation</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={orgBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis type="category" dataKey="org" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="cases" fill="hsl(203 89% 53%)" name="Total Cases" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="escalated" fill="hsl(0 78% 62%)" name="Escalated" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== REPORTS TAB ===== */}
        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-role-reviewer">{caseSummary.length}</p><p className="text-sm text-muted-foreground">Total Cases</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-destructive">{caseSummary.filter(c => c.severity === 'Critical').length}</p><p className="text-sm text-muted-foreground">Critical</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-status-closed">{caseSummary.filter(c => c.status === 'Closed').length}</p><p className="text-sm text-muted-foreground">Closed</p></CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileBarChart className="h-5 w-5 text-role-reviewer" />Case Summary Report</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference No</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Officer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {caseSummary.map(c => (
                      <tr key={c.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono text-role-reviewer">{c.id}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge></td>
                        <td className="px-4 py-3">{c.severity}</td>
                        <td className="px-4 py-3">{c.organisation}</td>
                        <td className="px-4 py-3 font-mono text-xs">{c.officer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== ANNOUNCEMENTS TAB ===== */}
        <TabsContent value="announcements" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-role-reviewer" />
              <h2 className="text-xl font-semibold">MCMC Announcements</h2>
            </div>
          </div>

          <div className="space-y-4">
            {announcements.map(a => (
              <Card key={a.id} className={getPriorityStyle(a.priority)}>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        {a.pinned && <Pin className="h-3.5 w-3.5 text-role-reviewer" />}
                        <h3 className="font-semibold">{a.title}</h3>
                        <Badge variant="outline" className={
                          a.priority === 'high' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                          a.priority === 'medium' ? 'bg-status-rfi/20 text-status-rfi border-status-rfi/30' :
                          'bg-muted text-muted-foreground border-border'
                        }>
                          {a.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{a.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{a.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
