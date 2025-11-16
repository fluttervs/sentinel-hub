import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertTriangle, FileText, XCircle, BarChart3, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function ValidatorDashboard() {
  const navigate = useNavigate();

  // Severity distribution data
  const severityData = [
    { severity: 'Critical', count: 4, percentage: 22 },
    { severity: 'High', count: 7, percentage: 39 },
    { severity: 'Medium', count: 5, percentage: 28 },
    { severity: 'Low', count: 2, percentage: 11 },
  ];

  // Colors for severity levels
  const severityColors: Record<string, string> = {
    'Critical': 'hsl(var(--destructive))',
    'High': 'hsl(25 95% 53%)',
    'Medium': 'hsl(48 96% 53%)',
    'Low': 'hsl(142 76% 36%)',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Validator Dashboard</h1>
          <p className="text-muted-foreground">MCMC Validator / Approver workspace</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/choose-role')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Role
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-role-validator/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">9</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready To Close</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">5</div>
            <p className="text-xs text-muted-foreground mt-1">Completed investigations</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Severity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">4</div>
            <p className="text-xs text-muted-foreground mt-1">Requiring approval</p>
          </CardContent>
        </Card>

        <Card className="border-status-rfi/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Re-opened</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">2</div>
            <p className="text-xs text-muted-foreground mt-1">Cases needing review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'PSIRP-2025-0045', title: 'High-value theft case', severity: 'High', from: 'Investigator A' },
              { id: 'PSIRP-2025-0043', title: 'Dangerous goods incident', severity: 'Critical', from: 'Investigator B' },
              { id: 'PSIRP-2025-0041', title: 'Package tampering report', severity: 'Medium', from: 'Reviewer C' },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between p-3 border border-border/40 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.id}</p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">From: {item.from}</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Closure Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-1">PSIRP-2025-0045</p>
              <p className="text-xs text-muted-foreground">
                AI suggests: <span className="text-foreground">Close with advisory</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Risk implication: Medium
              </p>
            </div>
            <div className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
              <p className="text-sm font-medium mb-1">PSIRP-2025-0043</p>
              <p className="text-xs text-muted-foreground">
                AI suggests: <span className="text-foreground">Recommend further investigation</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Risk implication: High
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              * AI insights are for demonstration purposes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution (Pending Approval)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="severity" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={severityColors[entry.severity]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              {severityData.map((item) => (
                <div key={item.severity} className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: severityColors[item.severity] }}
                    />
                    <p className="text-sm font-medium">{item.severity}</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: severityColors[item.severity] }}>
                    {item.count}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Pending Approval</span>
                <span className="text-2xl font-bold text-primary">
                  {severityData.reduce((sum, item) => sum + item.count, 0)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
