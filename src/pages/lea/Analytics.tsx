import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { BarChart3, Shield, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const monthlyEscalations = [
  { month: 'Sep', escalated: 3, resolved: 2 },
  { month: 'Oct', escalated: 4, resolved: 3 },
  { month: 'Nov', escalated: 2, resolved: 2 },
  { month: 'Dec', escalated: 5, resolved: 4 },
  { month: 'Jan', escalated: 6, resolved: 5 },
  { month: 'Feb', escalated: 4, resolved: 3 },
];

const caseOutcomes = [
  { name: 'Prosecution Recommended', value: 5, color: 'hsl(var(--destructive))' },
  { name: 'No Further Action', value: 8, color: 'hsl(var(--status-closed))' },
  { name: 'Ongoing Investigation', value: 4, color: 'hsl(var(--primary))' },
  { name: 'Referred Back', value: 2, color: 'hsl(var(--status-rfi))' },
];

const casesByCategory = [
  { category: 'Theft', count: 6 },
  { category: 'Narcotics', count: 4 },
  { category: 'Contraband', count: 3 },
  { category: 'Fraud', count: 2 },
  { category: 'Counterfeit', count: 2 },
  { category: 'Tampering', count: 2 },
];

const severityBreakdown = [
  { name: 'Critical', value: 7, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 8, color: 'hsl(var(--role-validator))' },
  { name: 'Medium', value: 3, color: 'hsl(var(--primary))' },
  { name: 'Low', value: 1, color: 'hsl(var(--status-closed))' },
];

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function LEAAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6" style={{ color: 'hsl(220 70% 50%)' }} />
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">PDRM — Escalated case insights and investigation metrics</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Referred Cases', value: 19, icon: Shield, color: 'hsl(220 70% 50%)' },
          { label: 'Under Investigation', value: 4, icon: Clock, color: 'hsl(var(--role-validator))' },
          { label: 'Outcomes Submitted', value: 13, icon: CheckCircle2, color: 'hsl(var(--status-closed))' },
          { label: 'Pending Action', value: 2, icon: AlertTriangle, color: 'hsl(var(--destructive))' },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Escalation Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyEscalations}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="escalated" stroke="hsl(220 70% 50%)" strokeWidth={2} name="Escalated" />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--status-closed))" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Investigation Outcomes</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie data={caseOutcomes} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {caseOutcomes.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[40%] space-y-2">
                {caseOutcomes.map((s) => (
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
        <Card>
          <CardHeader><CardTitle className="text-base">Cases by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={casesByCategory} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={90} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="hsl(220 70% 50%)" radius={[0, 4, 4, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Severity Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie data={severityBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {severityBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[40%] space-y-2">
                {severityBreakdown.map((s) => (
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
  );
}
