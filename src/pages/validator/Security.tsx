import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

export default function SupervisorSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security</p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-role-validator" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><p className="text-sm font-medium mb-1">Current Password</p><Input type="password" placeholder="••••••••" /></div>
          <div><p className="text-sm font-medium mb-1">New Password</p><Input type="password" placeholder="••••••••" /></div>
          <div><p className="text-sm font-medium mb-1">Confirm New Password</p><Input type="password" placeholder="••••••••" /></div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
