import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, MapPin, Users } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

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

export default function LicenseeAdminAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">Incident submission & distribution overview</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* ====== Incident Submission Overview ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Incident Submission Overview
        </h2>

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

        <div className="grid gap-6 lg:grid-cols-2">
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
      </div>

      {/* ====== Geographic & Officer Distribution ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-role-licensee-admin" />
          Geographic & Officer Distribution
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
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
      </div>
    </div>
  );
}
