import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Clock, Shield } from 'lucide-react';
import MalaysiaIncidentMap from '@/components/MalaysiaIncidentMap';

const monthlyCases = [
  { month: 'Sep', submitted: 12, closed: 8, escalated: 3 },
  { month: 'Oct', submitted: 18, closed: 14, escalated: 4 },
  { month: 'Nov', submitted: 15, closed: 12, escalated: 2 },
  { month: 'Dec', submitted: 20, closed: 16, escalated: 5 },
  { month: 'Jan', submitted: 22, closed: 18, escalated: 6 },
  { month: 'Feb', submitted: 17, closed: 13, escalated: 4 },
];

const severityDistribution = [
  { name: 'Critical', value: 8, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 15, color: 'hsl(var(--role-validator))' },
  { name: 'Medium', value: 22, color: 'hsl(var(--primary))' },
  { name: 'Low', value: 12, color: 'hsl(var(--status-closed))' },
];

const categoryBreakdown = [
  { category: 'Prohibited Items', count: 14 },
  { category: 'Serious Threat', count: 8 },
  { category: 'Theft/Loss', count: 12 },
  { category: 'Fraud/Scam', count: 6 },
  { category: 'Operational', count: 10 },
  { category: 'Cyber/Data', count: 4 },
  { category: 'Infrastructure', count: 3 },
];

const officerWorkload = [
  { name: 'Ahmad Razif', open: 8, closed: 14, escalated: 3 },
  { name: 'Nurul Hana', open: 6, closed: 11, escalated: 2 },
  { name: 'Lee Wei', open: 9, closed: 16, escalated: 5 },
  { name: 'Farah Amin', open: 5, closed: 9, escalated: 1 },
  { name: 'Raj Kumar', open: 4, closed: 7, escalated: 2 },
];

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function SupervisorAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-role-validator" />
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Supervisory insights and incident trends</p>
          </div>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Cases (6mo)', value: 104, icon: TrendingUp, color: 'text-role-validator' },
          { label: 'Escalated', value: 24, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Closed', value: 81, icon: CheckCircle2, color: 'text-status-closed' },
          { label: 'Avg Resolution (days)', value: 4.2, icon: Clock, color: 'text-primary' },
        ].map((kpi) => (
          <Card key={kpi.label}>
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

      {/* Incident Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-role-validator" />
            Incident Density Heat Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MalaysiaIncidentMap />
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Case Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyCases}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="submitted" stroke="hsl(var(--primary))" strokeWidth={2} name="Submitted" />
                <Line type="monotone" dataKey="closed" stroke="hsl(var(--status-closed))" strokeWidth={2} name="Closed" />
                <Line type="monotone" dataKey="escalated" stroke="hsl(var(--destructive))" strokeWidth={2} name="Escalated" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader><CardTitle className="text-base">Severity Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie data={severityDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {severityDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[40%] space-y-2">
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

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Breakdown */}
        <Card>
          <CardHeader><CardTitle className="text-base">Incident Category Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryBreakdown} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="hsl(var(--role-validator))" radius={[0, 4, 4, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Officer Workload */}
        <Card>
          <CardHeader><CardTitle className="text-base">Officer Workload Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={officerWorkload}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Bar dataKey="open" stackId="a" fill="hsl(var(--primary))" name="Open" />
                <Bar dataKey="closed" stackId="a" fill="hsl(var(--status-closed))" name="Closed" />
                <Bar dataKey="escalated" stackId="a" fill="hsl(var(--destructive))" name="Escalated" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
