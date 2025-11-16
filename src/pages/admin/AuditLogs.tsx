import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Download, Shield } from 'lucide-react';

export default function AuditLogs() {
  const navigate = useNavigate();

  const logs = [
    { id: 1, timestamp: '2025-11-16 14:23:45', user: 'john.tan@mcmc.gov.my', action: 'Updated incident status', resource: 'PSIRP-2025-0048', type: 'Modify', severity: 'Info' },
    { id: 2, timestamp: '2025-11-16 13:15:22', user: 'admin@mcmc.gov.my', action: 'Added new user', resource: 'sarah.wong@poslaju.com.my', type: 'Create', severity: 'Info' },
    { id: 3, timestamp: '2025-11-16 11:47:08', user: 'super.admin@mcmc.gov.my', action: 'Modified SLA rule', resource: 'SLA-DG-001', type: 'Modify', severity: 'Warning' },
    { id: 4, timestamp: '2025-11-16 10:22:15', user: 'ahmad@mcmc.gov.my', action: 'Deleted draft incident', resource: 'DRAFT-2025-0156', type: 'Delete', severity: 'Info' },
    { id: 5, timestamp: '2025-11-16 09:05:33', user: 'system', action: 'Failed login attempt', resource: 'unknown@example.com', type: 'Security', severity: 'Critical' },
    { id: 6, timestamp: '2025-11-15 16:44:12', user: 'admin@mcmc.gov.my', action: 'Exported user data', resource: 'users.csv', type: 'Export', severity: 'Warning' },
    { id: 7, timestamp: '2025-11-15 14:18:45', user: 'lisa.chen@gdex.com.my', action: 'Submitted incident', resource: 'PSIRP-2025-0047', type: 'Create', severity: 'Info' },
    { id: 8, timestamp: '2025-11-15 11:23:09', user: 'super.admin@mcmc.gov.my', action: 'Changed system settings', resource: 'config.json', type: 'Modify', severity: 'Warning' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'Warning': return 'default';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Security': return 'destructive';
      case 'Delete': return 'destructive';
      case 'Export': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">System activity and security logs</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="flex-1" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">142</div>
            <p className="text-xs text-muted-foreground">In last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getSeverityColor(log.severity) as any}>{log.severity}</Badge>
                    <Badge variant={getTypeColor(log.type) as any}>{log.type}</Badge>
                  </div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">Resource: {log.resource}</p>
                  <p className="text-xs text-muted-foreground">User: {log.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
