import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleChip } from '@/components/RoleChip';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, Role } from '@/lib/auth';
import { getRoleConfig } from '@/lib/roleConfig';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = (location.state?.role || 'reporter') as Role;
  const config = getRoleConfig(role);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAutoFill = () => {
    setEmail('demo@mcmc.gov.my');
    setPassword('demo123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      try {
        login(email, password, role);
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        toast.success('Credentials verified. Please complete MFA.');
        navigate('/otp', { state: { role, otp } });
      } catch (error) {
        toast.error('Login failed');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/choose-role')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Button>

        <Card
          className="border-2"
          style={{ borderColor: `${config.color}40` }}
        >
          <CardHeader className="space-y-4">
            <div
              className="h-16 w-16 rounded-2xl mx-auto flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: config.color }}
              />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl">Login</CardTitle>
              <RoleChip role={role} />
              <CardDescription className="text-base pt-2">
                {config.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Click to auto-fill demo credentials"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleAutoFill}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                style={{
                  backgroundColor: config.color,
                  color: 'hsl(222 47% 3%)',
                }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Forgot Password?
                </a>
              </div>
              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                For demo purposes, click the email field to auto-fill credentials, then click Login.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
