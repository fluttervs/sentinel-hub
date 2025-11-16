import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Building2, Edit, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminOrganisations() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const organisations = [
    { id: 1, name: 'Pos Laju', licenceNo: 'PSL-2020-001', type: 'Postal Service', users: 45, incidents: 123, status: 'Active' },
    { id: 2, name: 'GDEx', licenceNo: 'PSL-2019-045', type: 'Postal Service', users: 38, incidents: 98, status: 'Active' },
    { id: 3, name: 'DHL Malaysia', licenceNo: 'PSL-2018-012', type: 'Courier Service', users: 52, incidents: 156, status: 'Active' },
    { id: 4, name: 'J&T Express', licenceNo: 'PSL-2021-089', type: 'Courier Service', users: 67, incidents: 201, status: 'Active' },
    { id: 5, name: 'CityLink Express', licenceNo: 'PSL-2017-034', type: 'Courier Service', users: 29, incidents: 67, status: 'Suspended' },
  ];

  const handleViewOrg = (orgName: string) => {
    toast({
      title: `Viewing ${orgName}`,
      description: "Organisation details page coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Organisation Management</h1>
          <p className="text-muted-foreground">Manage licensee organisations</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search organisations..." className="flex-1" />
        </div>
        
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add Organisation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Organisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Licences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">118</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Organisations ({organisations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {organisations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{org.name}</p>
                  <p className="text-sm text-muted-foreground">Licence: {org.licenceNo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{org.type}</Badge>
                    <Badge variant={org.status === 'Active' ? 'default' : 'destructive'}>
                      {org.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 mr-6">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{org.users}</p>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{org.incidents}</p>
                    <p className="text-xs text-muted-foreground">Incidents</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewOrg(org.name)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {org.status === 'Suspended' && (
                    <Button variant="ghost" size="sm">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
