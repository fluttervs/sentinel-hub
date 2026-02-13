import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Monitor, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginHistory = [
  { date: '2025-01-15 14:30', ip: '203.106.xx.xx', device: 'Chrome / Windows 11', status: 'Success' },
  { date: '2025-01-15 09:00', ip: '203.106.xx.xx', device: 'Chrome / Windows 11', status: 'Success' },
  { date: '2025-01-14 16:45', ip: '175.139.xx.xx', device: 'Safari / macOS', status: 'Success' },
  { date: '2025-01-13 08:20', ip: '60.54.xx.xx', device: 'Chrome / Android', status: 'Failed' },
  { date: '2025-01-12 10:00', ip: '203.106.xx.xx', device: 'Chrome / Windows 11', status: 'Success' },
];

const sessions = [
  { device: 'Chrome / Windows 11', ip: '203.106.xx.xx', lastActive: 'Now', current: true },
  { device: 'Safari / macOS', ip: '175.139.xx.xx', lastActive: '2 days ago', current: false },
];

export default function LicenseeAdminSecuritySettings() {
  const { toast } = useToast();
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handlePasswordChange = () => {
    toast({ title: "Password Updated", description: "Your password has been changed successfully." });
  };

  const handleMfaToggle = (checked: boolean) => {
    setMfaEnabled(checked);
    toast({
      title: checked ? "MFA Enabled" : "MFA Disabled",
      description: checked ? "Multi-factor authentication is now active." : "Multi-factor authentication has been turned off.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-1">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and authentication</p>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5 text-role-licensee-admin" />
            Account Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge variant="outline" className="bg-status-closed/20 text-status-closed border-status-closed/30 mt-1">Active</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium mt-1">Licensee Admin</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">MFA</p>
              <Badge variant="outline" className={mfaEnabled ? 'bg-status-closed/20 text-status-closed border-status-closed/30 mt-1' : 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 mt-1'}>
                {mfaEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Login</p>
              <p className="text-sm font-medium mt-1">2025-01-15 14:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Key className="h-5 w-5 text-role-licensee-admin" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </CardContent>
      </Card>

      {/* MFA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5 text-role-licensee-admin" />
            Multi-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Enable MFA</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch checked={mfaEnabled} onCheckedChange={handleMfaToggle} />
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-role-licensee-admin" />
            Login History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">IP Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Device</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((entry, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm">{entry.date}</td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{entry.ip}</td>
                    <td className="px-4 py-3 text-sm">{entry.device}</td>
                    <td className="px-4 py-3">
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

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="h-5 w-5 text-role-licensee-admin" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{session.device}</p>
                  {session.current && <Badge variant="outline" className="bg-status-closed/20 text-status-closed border-status-closed/30 text-xs">Current</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{session.ip} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
