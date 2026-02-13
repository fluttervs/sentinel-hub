import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, MessageSquare, FileText, Upload } from 'lucide-react';

const notifications = [
  { id: 1, type: 'escalation', icon: AlertTriangle, message: 'New case ESC-2025-005 escalated to your agency — Critical severity', time: '1 hour ago', read: false },
  { id: 2, type: 'escalation', icon: AlertTriangle, message: 'New case ESC-2025-004 escalated to your agency — High severity', time: '3 hours ago', read: false },
  { id: 3, type: 'clarification', icon: MessageSquare, message: 'MCMC responded to your clarification request for ESC-2025-001', time: '1 day ago', read: false },
  { id: 4, type: 'upload', icon: Upload, message: 'Your investigation report for ESC-2025-001 was logged successfully', time: '2 days ago', read: true },
  { id: 5, type: 'status', icon: CheckCircle, message: 'Outcome submitted for ESC-2025-006 — Prosecution Recommended', time: '5 days ago', read: true },
  { id: 6, type: 'document', icon: FileText, message: 'Additional documents attached to ESC-2025-003 by MCMC', time: '1 week ago', read: true },
];

const typeColors: Record<string, string> = {
  escalation: 'text-destructive',
  clarification: 'text-status-rfi',
  upload: 'text-primary',
  status: 'text-status-closed',
  document: 'text-role-validator',
};

export default function LEANotifications() {
  const [items, setItems] = useState(notifications);
  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Case updates and escalation alerts</p>
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
