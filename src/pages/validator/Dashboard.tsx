import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, AlertTriangle, CheckCircle, Shield, Inbox,
} from 'lucide-react';

const escalationQueue = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', days: 4 },
];

const recentClosed = [
  { id: 'PSIRP-2025-0030', outcome: 'Closed – Action Taken', date: '2025-06-08' },
  { id: 'PSIRP-2025-0028', outcome: 'Closed – No Further Action', date: '2025-06-07' },
  { id: 'PSIRP-2025-0025', outcome: 'Closed – Referred to LEA', date: '2025-06-05' },
];

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Open Cases', value: 34, icon: FolderOpen, color: 'text-role-validator' },
    { label: 'Escalation Pending', value: 5, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Closed This Month', value: 12, icon: CheckCircle, color: 'text-status-closed' },
    { label: 'Escalated Cases', value: 8, icon: Shield, color: 'text-role-reviewer' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Governance overview & escalation management</p>
        </div>
        <Button onClick={() => navigate('/validator/escalations')} className="bg-role-validator text-primary-foreground hover:bg-role-validator/90">
          <Inbox className="mr-2 h-4 w-4" /> Escalation Queue
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn('h-4 w-4', kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Escalation Approval Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Escalation Approval Queue</CardTitle>
            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">{escalationQueue.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {escalationQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg hover:bg-accent/30 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.id}</p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Officer: {item.officer} · {item.days}d ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={item.severity === 'Critical' ? 'border-destructive/50 text-destructive' : 'border-status-in-review/50 text-status-in-review'}>
                    {item.severity}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/validator/escalations/${item.id}`)}>Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Closed */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Closed Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentClosed.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{c.id}</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <Badge variant="outline" className="border-status-closed/50 text-status-closed text-xs">{c.outcome}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Officer Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Officer Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Ahmad Razif', cases: 8 },
              { name: 'Nurul Hana', cases: 6 },
              { name: 'Lee Wei', cases: 9 },
              { name: 'Farah Amin', cases: 5 },
              { name: 'Raj Kumar', cases: 4 },
              { name: 'Siti Mariam', cases: 2 },
            ].map((o) => (
              <div key={o.name} className="p-3 border border-border/40 rounded-lg">
                <p className="text-sm font-medium">{o.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{o.cases} cases</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
