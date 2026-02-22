import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, TrendingUp, FileBarChart, CheckCircle } from 'lucide-react';

const notifications = [
  { id: 1, type: 'escalation', icon: AlertTriangle, message: 'New escalation approved for PSIRP-2025-0063 — referred to PDRM', time: '2 hours ago', read: false },
  
  { id: 3, type: 'closure', icon: CheckCircle, message: 'Case PSIRP-2025-0055 closed by Supervisor Ahmad — Action Taken', time: '1 day ago', read: true },
  { id: 4, type: 'report', icon: FileBarChart, message: 'Monthly Compliance Report is now available', time: '2 days ago', read: true },
  { id: 5, type: 'escalation', icon: AlertTriangle, message: 'Escalation rejected for PSIRP-2025-0058 — returned to Case Officer', time: '3 days ago', read: true },
  
];

const typeColors: Record<string, string> = {
  escalation: 'text-destructive',
  
  closure: 'text-status-closed',
  report: 'text-role-investigator',
};

export default function InvestigatorNotifications() {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Governance alerts and system updates</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead}>Mark all read</Button>
      </div>

      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start gap-4 p-4 ${!n.read ? 'bg-accent/30' : ''}`}>
              <n.icon className={`h-5 w-5 mt-0.5 shrink-0 ${typeColors[n.type] || 'text-muted-foreground'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.read ? 'font-medium' : ''}`}>{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
