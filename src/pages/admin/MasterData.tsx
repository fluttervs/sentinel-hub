import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Database, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MasterData() {
  const navigate = useNavigate();

  const dataCategories = [
    { name: 'Incident Categories', count: 12, lastUpdated: '2 days ago' },
    { name: 'Severity Levels', count: 4, lastUpdated: '1 week ago' },
    { name: 'Organisation Types', count: 8, lastUpdated: '3 weeks ago' },
    { name: 'SLA Rules', count: 15, lastUpdated: '1 day ago' },
    { name: 'Workflow States', count: 9, lastUpdated: '5 days ago' },
    { name: 'Notification Templates', count: 23, lastUpdated: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Master Data Management</h1>
          <p className="text-muted-foreground">Configure system reference data</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dataCategories.map((category) => (
          <Card key={category.name} className="cursor-pointer hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-base">{category.name}</span>
                <Database className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total entries</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last updated</span>
                  <span className="text-xs text-muted-foreground">{category.lastUpdated}</span>
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { action: 'Added new incident category', category: 'Incident Categories', user: 'Admin User', time: '2 hours ago' },
              { action: 'Updated SLA threshold', category: 'SLA Rules', user: 'Super Admin', time: '1 day ago' },
              { action: 'Modified notification template', category: 'Notification Templates', user: 'Admin User', time: '3 days ago' },
            ].map((change, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{change.action}</p>
                  <p className="text-xs text-muted-foreground">{change.category} • by {change.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{change.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
