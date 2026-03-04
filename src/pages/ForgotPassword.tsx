import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

type View = 'request' | 'sent' | 'reset' | 'success';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordValid = newPassword.length >= 8 && newPassword === confirmPassword;

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setView('sent');
    }, 800);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('success');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Request View */}
        {view === 'request' && (
          <>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
            <Card className="border-2 border-border">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || !email}>
                    {isLoading ? 'Sending…' : 'Send Reset Link'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}

        {/* Sent View */}
        {view === 'sent' && (
          <Card className="border-2 border-border">
            <CardContent className="flex flex-col items-center text-center py-12 space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Check Your Inbox</h2>
              <p className="text-muted-foreground max-w-sm">
                If an account matches that address, a password reset link has been sent to your inbox.
              </p>
              <div className="pt-4 flex flex-col gap-2 w-full">
                <Button variant="outline" onClick={() => setView('reset')} className="w-full">
                  Simulate Clicking Reset Link
                </Button>
                <Button variant="ghost" onClick={() => navigate('/login')} className="w-full">
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reset View */}
        {view === 'reset' && (
          <>
            <Button
              variant="ghost"
              onClick={() => setView('request')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Card className="border-2 border-border">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Set New Password</CardTitle>
                <CardDescription>
                  Your password must be at least 8 characters long.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                    {newPassword.length > 0 && newPassword.length < 8 && (
                      <p className="text-xs text-destructive">Password must be at least 8 characters.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                      <p className="text-xs text-destructive">Passwords do not match.</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={!passwordValid || isLoading}>
                    {isLoading ? 'Updating…' : 'Update Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}

        {/* Success View */}
        {view === 'success' && (
          <Card className="border-2 border-border">
            <CardContent className="flex flex-col items-center text-center py-12 space-y-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-semibold">Password Updated</h2>
              <p className="text-muted-foreground">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full mt-4">
                Go to Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
