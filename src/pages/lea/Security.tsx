import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const loginHistory = [
  { date: '2025-06-15 09:00', ip: '10.20.1.88', status: 'Success' },
  { date: '2025-06-14 08:45', ip: '10.20.1.88', status: 'Success' },
  { date: '2025-06-13 09:10', ip: '10.20.1.88', status: 'Success' },
  { date: '2025-06-12 08:30', ip: '203.0.113.50', status: 'Failed' },
  { date: '2025-06-12 08:32', ip: '10.20.1.88', status: 'Success' },
];

const auditLog = [
  { timestamp: '2025-06-22 16:00', action: 'Investigation report uploaded', ref: 'ESC-2025-001' },
  { timestamp: '2025-06-20 09:15', action: 'Clarification response viewed', ref: 'ESC-2025-001' },
  { timestamp: '2025-06-19 11:30', action: 'Clarification request sent', ref: 'ESC-2025-001' },
  { timestamp: '2025-06-18 14:00', action: 'Status updated: Evidence Seized', ref: 'ESC-2025-002' },
  { timestamp: '2025-06-16 09:00', action: 'Status updated: Under Investigation', ref: 'ESC-2025-001' },
  { timestamp: '2025-06-15 10:30', action: 'Case acknowledged', ref: 'ESC-2025-001' },
  { timestamp: '2025-06-15 09:00', action: 'Login successful', ref: '-' },
];

export default function LEASecurity() {
  const { toast } = useToast();
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Account security, audit log, and access management</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Current Password</Label><Input type="password" /></div>
            <div><Label>New Password</Label><Input type="password" /></div>
            <div><Label>Confirm New Password</Label><Input type="password" /></div>
            <Button onClick={() => toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' })}>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Multi-Factor Authentication</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">MFA Status</p>
                <p className="text-xs text-muted-foreground">Required for LEA access</p>
              </div>
              <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
            </div>
            <Badge variant="outline" className={mfaEnabled ? 'border-status-closed/50 text-status-closed' : 'border-destructive/50 text-destructive'}>
              {mfaEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((l, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs font-mono">{l.date}</TableCell>
                  <TableCell className="text-xs font-mono">{l.ip}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={l.status === 'Success' ? 'border-status-closed/50 text-status-closed' : 'border-destructive/50 text-destructive'}>{l.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Activity Audit Log</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLog.map((l, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs font-mono">{l.timestamp}</TableCell>
                  <TableCell>{l.action}</TableCell>
                  <TableCell className="text-xs font-mono">{l.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
