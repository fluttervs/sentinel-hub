import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

const resolutionTrend = [
  { month: 'Aug', avg: 8.5 }, { month: 'Sep', avg: 7.2 }, { month: 'Oct', avg: 9.1 },
  { month: 'Nov', avg: 6.8 }, { month: 'Dec', avg: 5.4 }, { month: 'Jan', avg: 4.9 },
];

const escalationFrequency = [
  { month: 'Aug', count: 1 }, { month: 'Sep', count: 2 }, { month: 'Oct', count: 3 },
  { month: 'Nov', count: 2 }, { month: 'Dec', count: 1 }, { month: 'Jan', count: 1 },
];

const categoryTrend = [
  { month: 'Aug', theft: 2, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
  { month: 'Sep', theft: 3, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Oct', theft: 4, suspicious: 3, prohibited: 2, breach: 2, others: 1 },
  { month: 'Nov', theft: 3, suspicious: 2, prohibited: 2, breach: 1, others: 1 },
  { month: 'Dec', theft: 2, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Jan', theft: 1, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
];

const reporterEfficiency = [
  { name: 'Ahmad', score: 92 },
  { name: 'Mastura', score: 85 },
  { name: 'Fatimah', score: 78 },
  { name: 'Kamal', score: 65 },
  { name: 'Azman', score: 48 },
];

const reportingDelay = [
  { month: 'Aug', hours: 6.2 }, { month: 'Sep', hours: 5.8 }, { month: 'Oct', hours: 4.5 },
  { month: 'Nov', hours: 3.9 }, { month: 'Dec', hours: 3.2 }, { month: 'Jan', hours: 2.4 },
];

export default function LicenseeAdminAnalytics() {
  const slaRate = 92;
  const riskIndex = 34;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">Deep insight view — Performance & compliance metrics</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Top Gauges */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* SLA Compliance Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SLA Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart
                cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
                startAngle={180} endAngle={0}
                data={[{ value: slaRate, fill: 'hsl(var(--status-closed))' }]}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'hsl(var(--muted))' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-16 text-center">
              <span className="text-3xl font-bold">{slaRate}%</span>
              <p className="text-xs text-muted-foreground mt-1">Target: 90%</p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Index */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Index Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart
                cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
                startAngle={180} endAngle={0}
                data={[{ value: riskIndex, fill: riskIndex > 50 ? 'hsl(var(--destructive))' : 'hsl(var(--status-in-review))' }]}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'hsl(var(--muted))' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-16 text-center">
              <span className="text-3xl font-bold">{riskIndex}</span>
              <p className="text-xs text-muted-foreground mt-1">Low Risk (0-100 scale)</p>
            </div>
          </CardContent>
        </Card>

        {/* Reporting Delay */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporting Delay Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={reportingDelay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="h" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} name="Avg Delay (hours)" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-1 mt-2 justify-center">
              <TrendingDown className="h-3 w-3 text-status-closed" />
              <span className="text-xs text-status-closed font-medium">Improving — 61% reduction over 6 months</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Avg Resolution Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg Resolution Time (Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="avg" stroke="hsl(var(--role-licensee-admin))" strokeWidth={2} name="Avg Days" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Escalation Frequency */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Escalation Frequency Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={escalationFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Escalations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Trend Stacked Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Incident Category Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={categoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Area type="monotone" dataKey="theft" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.3)" name="Theft" />
                <Area type="monotone" dataKey="suspicious" stackId="1" stroke="hsl(var(--status-in-review))" fill="hsl(var(--status-in-review) / 0.3)" name="Suspicious" />
                <Area type="monotone" dataKey="prohibited" stackId="1" stroke="hsl(var(--status-rfi))" fill="hsl(var(--status-rfi) / 0.3)" name="Prohibited" />
                <Area type="monotone" dataKey="breach" stackId="1" stroke="hsl(var(--status-investigation))" fill="hsl(var(--status-investigation) / 0.3)" name="Breach" />
                <Area type="monotone" dataKey="others" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground) / 0.2)" name="Others" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reporter Efficiency Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporter Efficiency Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reporterEfficiency.map((r, i) => (
                <div key={r.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center ${i === 0 ? 'bg-role-licensee-admin/20 text-role-licensee-admin' : 'bg-muted text-muted-foreground'}`}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{r.name}</span>
                    </div>
                    <span className="text-sm font-bold">{r.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${r.score}%`,
                        backgroundColor: r.score >= 80 ? 'hsl(var(--status-closed))' : r.score >= 60 ? 'hsl(var(--status-in-review))' : 'hsl(var(--destructive))',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
