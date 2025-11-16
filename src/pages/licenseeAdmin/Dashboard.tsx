import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, AlertCircle, Plus, Settings, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LicenseeAdminDashboard() {
  const navigate = useNavigate();

  // Last 6 months incident data
  const incidentTrendData = [
    { month: 'Aug 2024', total: 6, high: 2, medium: 3, low: 1, critical: 0 },
    { month: 'Sep 2024', total: 8, high: 3, medium: 3, low: 2, critical: 0 },
    { month: 'Oct 2024', total: 12, high: 4, medium: 5, low: 2, critical: 1 },
    { month: 'Nov 2024', total: 9, high: 3, medium: 4, low: 2, critical: 0 },
    { month: 'Dec 2024', total: 7, high: 2, medium: 3, low: 2, critical: 0 },
    { month: 'Jan 2025', total: 5, high: 1, medium: 2, low: 2, critical: 0 },
  ];

  // Category breakdown for current month
  const categoryData = [
    { name: 'Loss', count: 15, percentage: 32 },
    { name: 'Theft', count: 12, percentage: 26 },
    { name: 'Tampering', count: 8, percentage: 17 },
    { name: 'Fraud', count: 7, percentage: 15 },
    { name: 'Others', count: 5, percentage: 10 },
  ];

  // Calculate trend
  const lastMonth = incidentTrendData[incidentTrendData.length - 1].total;
  const previousMonth = incidentTrendData[incidentTrendData.length - 2].total;
  const trendPercentage = ((lastMonth - previousMonth) / previousMonth * 100).toFixed(1);
  const isIncreasing = lastMonth > previousMonth;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Licensee Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your organisation's users and submissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="border-primary/20 cursor-pointer hover:border-primary/40 transition-all"
          onClick={() => navigate('/licensee-admin/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">47</div>
            <p className="text-xs text-muted-foreground mt-1">Organisation-wide</p>
          </CardContent>
        </Card>

        <Card 
          className="border-role-validator/20 cursor-pointer hover:border-role-validator/40 transition-all"
          onClick={() => navigate('/licensee-admin/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">12</div>
            <p className="text-xs text-muted-foreground mt-1">Across all statuses</p>
          </CardContent>
        </Card>

        <Card 
          className="border-status-rfi/20 cursor-pointer hover:border-status-rfi/40 transition-all"
          onClick={() => navigate('/licensee-admin/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RFIs Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">3</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card 
          className="border-role-licensee-admin/20 cursor-pointer hover:border-role-licensee-admin/40 transition-all"
          onClick={() => navigate('/licensee-admin/users')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-licensee-admin">8</div>
            <p className="text-xs text-muted-foreground mt-1">In your organisation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/reporter/incidents/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Incident
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/licensee-admin/incidents')}
            >
              <FileText className="mr-2 h-4 w-4" />
              View All Incidents
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/licensee-admin/users')}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/licensee-admin/profile')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Organisation Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Analytics & Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Reporting Speed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Reporting Speed</p>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">60%</span>
                  <span className="text-sm text-muted-foreground">faster</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-muted-foreground">vs industry average</p>
              </div>

              {/* Resolution Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Resolution Rate</p>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-role-validator">87%</span>
                  <span className="text-sm text-muted-foreground">closed</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-role-validator h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                <p className="text-xs text-muted-foreground">last 30 days</p>
              </div>
            </div>

            {/* Incident Type Distribution Mini Chart */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Top Incident Categories</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Loss</span>
                      <span className="text-sm font-medium text-primary">32%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Theft</span>
                      <span className="text-sm font-medium text-destructive">26%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-destructive h-1.5 rounded-full" style={{ width: '26%' }} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Tampering</span>
                      <span className="text-sm font-medium text-status-rfi">17%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-status-rfi h-1.5 rounded-full" style={{ width: '17%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex gap-2 items-start">
                <div className="mt-0.5">
                  <AlertCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-primary">AI Recommendation</p>
                  <p className="text-xs text-muted-foreground">
                    Review packaging SOPs for high-value items. Loss incidents increased by 15% in the past 2 weeks for shipments over RM5,000.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Organisation Incident Trend</CardTitle>
            <div className="flex items-center gap-2 text-sm">
              {isIncreasing ? (
                <>
                  <TrendingUp className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium">+{trendPercentage}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">{trendPercentage}%</span>
                </>
              )}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Line Chart - Incident Trends */}
            <div>
              <h4 className="text-sm font-medium mb-4">Monthly Incident Volume (Last 6 Months)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Total Incidents"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="critical" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Critical"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="high" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    name="High"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Category Breakdown */}
            <div>
              <h4 className="text-sm font-medium mb-4">Incident Type Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[8, 8, 0, 0]}
                    name="Incidents"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Peak Month</p>
                <p className="text-lg font-bold">Oct 2024</p>
                <p className="text-xs text-muted-foreground">12 incidents</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Most Common Type</p>
                <p className="text-lg font-bold">Loss (32%)</p>
                <p className="text-xs text-muted-foreground">15 incidents this period</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">6-Month Average</p>
                <p className="text-lg font-bold">7.8 incidents</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
