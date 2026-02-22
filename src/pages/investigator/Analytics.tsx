import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const caseVolume = [
  { month: 'Jan', cases: 18, prev: 14 },
  { month: 'Feb', cases: 22, prev: 16 },
  { month: 'Mar', cases: 15, prev: 20 },
  { month: 'Apr', cases: 28, prev: 19 },
  { month: 'May', cases: 24, prev: 22 },
  { month: 'Jun', cases: 30, prev: 25 },
];

const categoryTrend = [
  { month: 'Jan', theft: 5, damage: 8, tampering: 3, hazmat: 2 },
  { month: 'Feb', theft: 7, damage: 9, tampering: 4, hazmat: 2 },
  { month: 'Mar', theft: 4, damage: 6, tampering: 3, hazmat: 2 },
  { month: 'Apr', theft: 9, damage: 10, tampering: 5, hazmat: 4 },
  { month: 'May', theft: 6, damage: 9, tampering: 5, hazmat: 4 },
  { month: 'Jun', theft: 8, damage: 12, tampering: 6, hazmat: 4 },
];

const escalationByLEA = [
  { name: 'PDRM', count: 12 },
  { name: 'KPDNHEP', count: 5 },
  { name: 'Customs', count: 8 },
  { name: 'AELB', count: 3 },
];

const resolutionTime = [
  { month: 'Jan', avgDays: 8.2, longest: 22 },
  { month: 'Feb', avgDays: 7.5, longest: 19 },
  { month: 'Mar', avgDays: 9.1, longest: 25 },
  { month: 'Apr', avgDays: 6.3, longest: 18 },
  { month: 'May', avgDays: 7.0, longest: 20 },
  { month: 'Jun', avgDays: 5.8, longest: 15 },
];

const tooltipStyle = {
  backgroundColor: 'hsl(var(--background))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '6px',
};

export default function InvestigatorAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Strategic Analytics</h1>
        <p className="text-muted-foreground">Cross-organisation insights and governance metrics</p>
      </div>

      <Tabs defaultValue="volume" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="volume">Case Volume</TabsTrigger>
          <TabsTrigger value="category">Incident Types</TabsTrigger>
          <TabsTrigger value="escalation">Escalation</TabsTrigger>
          <TabsTrigger value="resolution">Resolution Time</TabsTrigger>
        </TabsList>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Case Volume Trend (Period-over-Period)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={caseVolume}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="hsl(var(--role-investigator))" strokeWidth={2} name="Current Period" />
                    <Line type="monotone" dataKey="prev" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" name="Previous Period" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>Incident Type Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={categoryTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Area type="monotone" dataKey="theft" stackId="1" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" fillOpacity={0.4} name="Theft" />
                    <Area type="monotone" dataKey="damage" stackId="1" fill="hsl(var(--role-validator))" stroke="hsl(var(--role-validator))" fillOpacity={0.4} name="Damage" />
                    <Area type="monotone" dataKey="tampering" stackId="1" fill="hsl(var(--role-reviewer))" stroke="hsl(var(--role-reviewer))" fillOpacity={0.4} name="Tampering" />
                    <Area type="monotone" dataKey="hazmat" stackId="1" fill="hsl(var(--role-investigator))" stroke="hsl(var(--role-investigator))" fillOpacity={0.4} name="Hazmat" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader>
              <CardTitle>Escalations by LEA Agency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={escalationByLEA}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" fill="hsl(var(--role-investigator))" radius={[4, 4, 0, 0]} name="Escalations" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-role-investigator">28</p>
                  <p className="text-xs text-muted-foreground">Total Escalations</p>
                </div>
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-role-validator">3</p>
                  <p className="text-xs text-muted-foreground">Multi-LEA Cases</p>
                </div>
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-primary">4.2d</p>
                  <p className="text-xs text-muted-foreground">Avg to Escalation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolution">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionTime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis unit="d" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="avgDays" stroke="hsl(var(--primary))" strokeWidth={2} name="Avg Days to Close" />
                    <Line type="monotone" dataKey="longest" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" name="Longest Open (days)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-primary">7.3</p>
                  <p className="text-xs text-muted-foreground">Avg Days to Close (Overall)</p>
                </div>
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-role-validator">2.1d</p>
                  <p className="text-xs text-muted-foreground">Avg Reporting Delay</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
