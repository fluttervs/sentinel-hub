import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Upload, CheckCircle2, AlertCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pendingAck = [
  { id: 'ESC-2025-004', title: 'Counterfeit stamps distribution', org: 'Pos Malaysia', severity: 'High', escalatedDate: '2025-06-14' },
  { id: 'ESC-2025-005', title: 'Organised parcel interception ring', org: 'J&T Express', severity: 'Critical', escalatedDate: '2025-06-15' },
];

const recentCases = [
  { id: 'ESC-2025-001', title: 'Theft of High-Value Consignment', status: 'Under Investigation', escalatedDate: '2025-06-10' },
  { id: 'ESC-2025-002', title: 'Tampering with Postal Items', status: 'Evidence Seized', escalatedDate: '2025-06-12' },
  { id: 'ESC-2025-003', title: 'Narcotics via Postal Channel', status: 'Pending Further Information', escalatedDate: '2025-06-13' },
];

const statusBreakdown = [
  { status: 'Under Investigation', count: 4, color: 'primary' },
  { status: 'Evidence Seized', count: 2, color: 'role-validator' },
  { status: 'Pending Info', count: 2, color: 'status-rfi' },
  { status: 'Outcome Submitted', count: 3, color: 'status-closed' },
];

export default function LEADashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">LEA Dashboard</h1>
        <p className="text-muted-foreground">PDRM — Escalated case overview and investigation management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total Escalated', value: '11', icon: Shield, color: 'hsl(220 70% 50%)' },
          { label: 'Under Investigation', value: '4', icon: Clock, color: 'hsl(var(--role-validator))' },
          { label: 'Pending Clarification', value: '2', icon: AlertCircle, color: 'hsl(var(--status-rfi))' },
          { label: 'Evidence Submitted', value: '7', icon: Upload, color: 'hsl(var(--primary))' },
          { label: 'Outcome Submitted', value: '3', icon: CheckCircle2, color: 'hsl(var(--status-closed))' },
        ].map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Acknowledgement */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4 text-destructive" /> Cases Pending Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingAck.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg bg-destructive/5">
              <div className="space-y-1">
                <p className="text-sm font-medium">{c.id} — {c.title}</p>
                <p className="text-xs text-muted-foreground">{c.org} · Severity: {c.severity} · Escalated: {c.escalatedDate}</p>
              </div>
              <Button size="sm" onClick={() => navigate(`/lea/cases/${c.id}`)}>Acknowledge</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Escalated Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCases.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{c.id}</p>
                  <p className="text-xs text-muted-foreground">{c.title}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-xs">{c.status}</Badge>
                  <p className="text-xs text-muted-foreground">{c.escalatedDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Investigation Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {statusBreakdown.map((s) => (
              <div key={s.status} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <span className="text-sm">{s.status}</span>
                <span className={`text-lg font-bold text-${s.color}`}>{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
