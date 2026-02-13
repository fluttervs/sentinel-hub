import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statusData = [
  { name: 'Submitted', value: 5, color: 'hsl(203, 89%, 53%)' },
  { name: 'Under Review', value: 3, color: 'hsl(38, 92%, 50%)' },
  { name: 'Escalated', value: 2, color: 'hsl(0, 78%, 62%)' },
  { name: 'Closed', value: 8, color: 'hsl(142, 76%, 36%)' },
];

const trendData = [
  { month: 'Aug', submissions: 1 },
  { month: 'Sep', submissions: 2 },
  { month: 'Oct', submissions: 3 },
  { month: 'Nov', submissions: 1 },
  { month: 'Dec', submissions: 4 },
  { month: 'Jan', submissions: 7 },
];

export default function ReporterAnalytics() {
  const total = statusData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Analytics</h1>
        <p className="text-muted-foreground">Personal submission metrics and trends</p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Submission Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-reviewer">2.4 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">11%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closure Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">44%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(220, 26%, 8%)', border: '1px solid hsl(220, 26%, 14%)', borderRadius: '8px' }}
                    labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name} ({s.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submission Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 26%, 14%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(220, 26%, 8%)', border: '1px solid hsl(220, 26%, 14%)', borderRadius: '8px' }}
                    labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                  />
                  <Line type="monotone" dataKey="submissions" stroke="hsl(191, 100%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(191, 100%, 50%)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
