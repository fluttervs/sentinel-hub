import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Ban, CheckCircle, Search, Users, FileSearch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const usersData = [
  { id: 1, name: 'Ahmad bin Abdullah', email: 'ahmad.abdullah@expresscourier.com', phone: '+60 12-345 6789', role: 'Reporter', status: 'Active', lastLogin: '2025-01-15 14:30', submissions: 14 },
  { id: 2, name: 'Mastura binti Hassan', email: 'mastura.hassan@expresscourier.com', phone: '+60 13-456 7890', role: 'Reporter', status: 'Active', lastLogin: '2025-01-15 10:15', submissions: 11 },
  { id: 3, name: 'Kamal Hassan', email: 'kamal.hassan@expresscourier.com', phone: '+60 14-567 8901', role: 'Reporter', status: 'Active', lastLogin: '2025-01-14 16:45', submissions: 9 },
  { id: 4, name: 'Fatimah Zahra', email: 'fatimah.zahra@expresscourier.com', phone: '+60 15-678 9012', role: 'Reporter', status: 'Active', lastLogin: '2025-01-15 09:00', submissions: 8 },
  { id: 5, name: 'Azman Ali', email: 'azman.ali@expresscourier.com', phone: '+60 16-789 0123', role: 'Reporter', status: 'Inactive', lastLogin: '2024-12-20 11:30', submissions: 5 },
];

export default function LicenseeAdminUsers() {
  const { toast } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof usersData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const activeCount = usersData.filter(u => u.status === 'Active').length;
  const inactiveCount = usersData.filter(u => u.status === 'Inactive').length;

  const filtered = usersData.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || u.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = () => {
    toast({ title: "User Added", description: "New user has been added successfully." });
    setAddOpen(false);
  };

  const handleDeactivate = () => {
    toast({ title: "Deactivation Requested", description: `Deactivation request for ${selectedUser?.name} has been submitted.` });
    setDeactivateOpen(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = (user: typeof usersData[0]) => {
    if (user.status === 'Active') {
      setSelectedUser(user);
      setDeactivateOpen(true);
    } else {
      toast({ title: "User Activated", description: `${user.name} has been activated.` });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Reporter Management</h1>
        <p className="text-muted-foreground">Manage reporters in your organisation</p>
      </div>

      {/* Analytics Panel — 2 boxes, full width */}
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-status-closed/15 flex items-center justify-center">
              <Users className="h-5 w-5 text-status-closed" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active vs Inactive</p>
              <p className="text-lg font-bold">{activeCount} / {inactiveCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileSearch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Reporters</p>
              <p className="text-lg font-bold">{usersData.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button className="glow-purple">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Reporter</DialogTitle>
                  <DialogDescription>Create a new reporter account for your organisation.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="user@expresscourier.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+60 12-345 6789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select defaultValue="reporter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reporter">Reporter</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active">Active</Label>
                    <Switch id="active" defaultChecked />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Phone Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Submissions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <span className="font-medium">{user.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">{user.role}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={user.status === 'Active' ? 'bg-status-closed/20 text-status-closed border-status-closed/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">{user.submissions}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title={user.status === 'Active' ? 'Deactivate' : 'Activate'} onClick={() => handleToggleStatus(user)}>
                          {user.status === 'Active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Deactivation Modal */}
      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Deactivation</DialogTitle>
            <DialogDescription>Submit a deactivation request for {selectedUser?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">This will disable the user's access to the system.</p>
            </div>
            <div className="space-y-2">
              <Label>Reason for deactivation *</Label>
              <Textarea placeholder="Provide reason for deactivation..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeactivate}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
