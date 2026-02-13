import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Clock, Monitor } from 'lucide-react';

const loginHistory = [
  { date: '2025-01-16 08:00', ip: '10.0.1.50', device: 'Chrome / Windows', status: 'Success' },
  { date: '2025-01-15 07:45', ip: '10.0.1.50', device: 'Chrome / Windows', status: 'Success' },
  { date: '2025-01-14 08:15', ip: '10.0.1.51', device: 'Firefox / Linux', status: 'Success' },
  { date: '2025-01-13 09:00', ip: '203.0.113.100', device: 'Unknown', status: 'Failed' },
  { date: '2025-01-13 09:01', ip: '203.0.113.100', device: 'Unknown', status: 'Failed' },
];

const sessions = [
  { device: 'Chrome / Windows', location: 'Cyberjaya, MY', lastActive: 'Now', current: true },
];

export default function CaseOfficerSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and authentication</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Key className="h-5 w-5 text-role-reviewer" />Change Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
            <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
            <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" placeholder="••••••••" /></div>
            <Button className="w-full">Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-role-reviewer" />Security</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="text-sm font-medium">Multi-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Required for MCMC officers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 border border-border rounded-lg space-y-2">
              <p className="text-sm font-medium">Account Status</p>
              <Badge className="bg-status-closed/20 text-status-closed border-status-closed/30">Active</Badge>
            </div>
            <div className="p-4 border border-border rounded-lg space-y-1">
              <p className="text-sm font-medium">Last Login</p>
              <p className="text-sm text-muted-foreground">2025-01-16 08:00 — 10.0.1.50</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-role-reviewer" />Login History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Date & Time</th>
                  <th className="pb-3 font-medium text-muted-foreground">IP Address</th>
                  <th className="pb-3 font-medium text-muted-foreground">Device</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loginHistory.map((entry, i) => (
                  <tr key={i}>
                    <td className="py-3">{entry.date}</td>
                    <td className="py-3 font-mono text-xs">{entry.ip}</td>
                    <td className="py-3">{entry.device}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={entry.status === 'Success' ? 'bg-status-closed/20 text-status-closed border-status-closed/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Monitor className="h-5 w-5 text-role-reviewer" />Active Sessions</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{session.device}</p>
                    {session.current && <Badge className="bg-role-reviewer/20 text-role-reviewer border-role-reviewer/30 text-xs">Current</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{session.location} · {session.lastActive}</p>
                </div>
                {!session.current && <Button variant="outline" size="sm" className="text-destructive">Revoke</Button>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
