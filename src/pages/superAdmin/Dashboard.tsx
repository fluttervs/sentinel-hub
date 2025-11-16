import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, AlertTriangle, TrendingUp, Target, Map, BarChart3, Brain, Shield } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">MCMC Super Admin - National Overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-role-super-admin/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-super-admin">2,847</div>
            <p className="text-xs text-muted-foreground mt-1">All-time</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Severity YTD</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">87</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>National Incident Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <Map className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Geographic distribution of incidents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Incident Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { category: 'Loss', count: 842, percent: 29.6 },
              { category: 'Theft', count: 612, percent: 21.5 },
              { category: 'Dangerous Goods', count: 487, percent: 17.1 },
              { category: 'Tampering', count: 356, percent: 12.5 },
              { category: 'Fraud', count: 298, percent: 10.5 },
            ].map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <span className="text-sm">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                  <span className="text-xs text-muted-foreground">({item.percent}%)</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-role-super-admin/20 rounded-lg bg-role-super-admin/5">
              <p className="text-sm font-medium mb-2">Q4 Forecast</p>
              <p className="text-xs text-muted-foreground">
                AI predicts a spike in Dangerous Goods incidents in Q4 2025
              </p>
            </div>
            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <p className="text-sm font-medium mb-2">Risk Alert</p>
              <p className="text-xs text-muted-foreground">
                AI flags repeated high-severity incidents from Route 7 and Route 12
              </p>
            </div>
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-2">Policy Recommendation</p>
              <p className="text-xs text-muted-foreground">
                AI recommends reviewing SOPs for Licensee X (15 high-severity cases YTD)
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * AI insights are for demonstration purposes
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Monthly category breakdown (last 12 months)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Review Time</span>
              <span className="text-sm font-medium">4.2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Validation Time</span>
              <span className="text-sm font-medium">2.8 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Investigation Time</span>
              <span className="text-sm font-medium">3.5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Resolution Time</span>
              <span className="text-sm font-medium">7.2 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              AI Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Global Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Audit Center
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Risk Licensees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: 'Express Courier X', incidents: 15, risk: 'High' },
              { name: 'Postal Services Y', incidents: 12, risk: 'High' },
              { name: 'Logistics Z', incidents: 9, risk: 'Medium' },
            ].map((licensee) => (
              <div key={licensee.name} className="flex items-center justify-between p-2 border-b border-border/40 last:border-0">
                <div>
                  <p className="text-sm">{licensee.name}</p>
                  <p className="text-xs text-muted-foreground">{licensee.incidents} incidents YTD</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  licensee.risk === 'High' ? 'bg-destructive/20 text-destructive' : 'bg-role-validator/20 text-role-validator'
                }`}>
                  {licensee.risk}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
