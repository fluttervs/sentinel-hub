import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, Bell, XCircle, Shield } from 'lucide-react';

const notifications = [
  { id: 1, type: 'escalation', title: 'New Escalation Request', message: 'Ahmad Razif submitted escalation for PSIRP-2025-0045 – High-value theft case.', time: '2 hours ago', read: false, icon: AlertTriangle, color: 'text-destructive' },
  { id: 2, type: 'escalation', title: 'New Escalation Request', message: 'Farah Amin submitted escalation for PSIRP-2025-0060 – Cross-border contraband.', time: '4 hours ago', read: false, icon: AlertTriangle, color: 'text-destructive' },
  { id: 3, type: 'sla', title: 'SLA Breach Alert', message: 'PSIRP-2025-0048 has exceeded the 14-day SLA threshold. Assigned to Lee Wei.', time: '6 hours ago', read: false, icon: Clock, color: 'text-status-in-review' },
  { id: 4, type: 'closure', title: 'Case Closure Confirmed', message: 'PSIRP-2025-0028 closed successfully – No Further Action.', time: '1 day ago', read: true, icon: CheckCircle, color: 'text-status-closed' },
  { id: 5, type: 'escalation', title: 'Escalation Approved', message: 'Your approval of PSIRP-2025-0042 has been processed. LEA notified.', time: '1 day ago', read: true, icon: Shield, color: 'text-role-reviewer' },
  { id: 6, type: 'rejection', title: 'Escalation Rejected', message: 'PSIRP-2025-0037 escalation was rejected and returned to Case Officer.', time: '2 days ago', read: true, icon: XCircle, color: 'text-destructive' },
  { id: 7, type: 'sla', title: 'SLA Warning', message: 'PSIRP-2025-0039 is at 86% of SLA threshold. Currently assigned to Ahmad Razif.', time: '2 days ago', read: true, icon: Clock, color: 'text-status-in-review' },
];

export default function SupervisorNotifications() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Escalation alerts, SLA warnings, and closure confirmations</p>
        </div>
        {unread > 0 && (
          <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
            {unread} unread
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {notifications.map((n) => (
            <div key={n.id} className={`flex items-start gap-4 p-4 transition-colors ${!n.read ? 'bg-accent/20' : ''}`}>
              <div className={`mt-0.5 ${n.color}`}><n.icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-destructive" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              <Button size="sm" variant="ghost">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
