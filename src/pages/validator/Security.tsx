import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Lock, Smartphone } from 'lucide-react';

const loginHistory = [
  { date: '2025-06-10 08:30', ip: '203.106.xx.xx', device: 'Chrome / Windows', status: 'Success' },
  { date: '2025-06-09 07:45', ip: '203.106.xx.xx', device: 'Chrome / Windows', status: 'Success' },
  { date: '2025-06-08 08:15', ip: '175.139.xx.xx', device: 'Safari / macOS', status: 'Success' },
  { date: '2025-06-07 09:00', ip: '203.106.xx.xx', device: 'Chrome / Windows', status: 'MFA Required' },
];

export default function SupervisorSecurity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-role-validator" />
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground">Authentication, MFA, and session management</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><p className="text-sm font-medium mb-1">Current Password</p><Input type="password" placeholder="••••••••" /></div>
            <div><p className="text-sm font-medium mb-1">New Password</p><Input type="password" placeholder="••••••••" /></div>
            <div><p className="text-sm font-medium mb-1">Confirm New Password</p><Input type="password" placeholder="••••••••" /></div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Multi-Factor Authentication</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
              <div>
                <p className="text-sm font-medium">MFA Status</p>
                <p className="text-xs text-muted-foreground">Authenticator app enabled</p>
              </div>
              <Badge variant="outline" className="border-status-closed/50 text-status-closed">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Require MFA on login</p><p className="text-xs text-muted-foreground">Enforced by policy</p></div>
              <Switch checked disabled />
            </div>
            <p className="text-xs text-muted-foreground italic">MFA is mandatory for Supervisor accounts per governance policy.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Login History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{l.date}</TableCell>
                  <TableCell className="text-muted-foreground">{l.ip}</TableCell>
                  <TableCell>{l.device}</TableCell>
                  <TableCell><Badge variant="outline" className={l.status === 'Success' ? 'border-status-closed/50 text-status-closed' : 'border-status-in-review/50 text-status-in-review'}>{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
