import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, UserPlus, Edit, Lock, UserCheck, UserX } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function AdminUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const users = [
    { id: 1, name: 'John Tan', email: 'john.tan@mcmc.gov.my', role: 'Reviewer', organisation: 'MCMC', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Wong', email: 'sarah.wong@poslaju.com.my', role: 'Reporter', organisation: 'Pos Laju', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Ahmad Ibrahim', email: 'ahmad@mcmc.gov.my', role: 'Investigator', organisation: 'MCMC', status: 'Active', lastLogin: '3 hours ago' },
    { id: 4, name: 'Lisa Chen', email: 'lisa.chen@gdex.com.my', role: 'Licensee Admin', organisation: 'GDEx', status: 'Active', lastLogin: '5 days ago' },
    { id: 5, name: 'Kumar Singh', email: 'kumar@mcmc.gov.my', role: 'Validator', organisation: 'MCMC', status: 'Inactive', lastLogin: '2 weeks ago' },
  ];

  const handleAddUser = () => {
    toast({
      title: "User Added",
      description: "New user has been created successfully.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all system users</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="flex-1" />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reporter">Reporter</SelectItem>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="validator">Validator</SelectItem>
                    <SelectItem value="investigator">Investigator</SelectItem>
                    <SelectItem value="system-admin">System Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Organisation</Label>
                <Input placeholder="Organisation name" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge variant="secondary">{user.organisation}</Badge>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground mr-4">Last login: {user.lastLogin}</p>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Lock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    {user.status === 'Active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
