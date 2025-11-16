import { Bell, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getCurrentUser, logout } from '@/lib/auth';
import { RoleChip } from './RoleChip';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'EN' | 'BM'>('EN');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
              P
            </div>
            <span className="font-semibold text-lg">PSIRP</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
            <button
              onClick={() => setLanguage('BM')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'BM' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              BM
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'EN' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 h-auto py-2">
                <div className="flex flex-col items-end text-sm">
                  <span className="font-medium">{user.name}</span>
                  <RoleChip role={user.role} className="mt-1" />
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`${getRoleConfig(user.role).basePath}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

function getRoleConfig(role: string) {
  const configs: Record<string, { basePath: string }> = {
    'reporter': { basePath: '/reporter' },
    'licensee-admin': { basePath: '/licensee-admin' },
    'reviewer': { basePath: '/reviewer' },
    'validator': { basePath: '/validator' },
    'investigator': { basePath: '/investigator' },
    'system-admin': { basePath: '/admin' },
    'super-admin': { basePath: '/super-admin' },
  };
  return configs[role] || { basePath: '/' };
}
