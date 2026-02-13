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
  { date: '2025-06-15 08:12', ip: '10.0.1.45', status: 'Success' },
  { date: '2025-06-14 09:05', ip: '10.0.1.45', status: 'Success' },
  { date: '2025-06-13 08:58', ip: '10.0.1.45', status: 'Success' },
  { date: '2025-06-12 07:30', ip: '192.168.1.10', status: 'Failed' },
  { date: '2025-06-12 07:31', ip: '10.0.1.45', status: 'Success' },
];

export default function InvestigatorSecurity() {
  const { toast } = useToast();
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Account security and access management</p>
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
                <p className="text-xs text-muted-foreground">Adds an extra layer of security to your account</p>
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
    </div>
  );
}
