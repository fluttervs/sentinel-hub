import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, MessageSquare, HelpCircle, Clock, AlertCircle, CheckCircle2, Trash2, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReporterDashboard() {
  const navigate = useNavigate();

  const drafts = [
    { id: 'draft-1', title: 'Theft of High-Value Package', updated: '2 hours ago', daysLeft: 5 },
    { id: 'draft-2', title: 'Tampered Shipment', updated: '1 day ago', daysLeft: 3 },
    { id: 'draft-3', title: 'Lost Consignment', updated: '3 days ago', daysLeft: 1 },
  ];

  const activities = [
    { type: 'rfi', message: 'RFI received for incident #PSIRP-2025-0023', time: '1 hour ago', urgent: true },
    { type: 'update', message: 'Incident #PSIRP-2025-0020 moved to Investigation', time: '3 hours ago', urgent: false },
    { type: 'acknowledged', message: 'Your submission #PSIRP-2025-0025 was acknowledged', time: '5 hours ago', urgent: false },
    { type: 'closed', message: 'Incident #PSIRP-2025-0019 has been closed', time: '1 day ago', urgent: false },
  ];

  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo maintenance this Saturday from 2 AM to 6 AM.', from: 'System Admin', time: '2 hours ago', priority: 'high' },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month.', from: 'Licensee Admin', time: '1 day ago', priority: 'normal' },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation.', from: 'Licensee Admin', time: '3 days ago', priority: 'normal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Licensee Reporter</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/choose-role')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Role
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
          onClick={() => navigate('/reporter/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card 
          className="border-role-reviewer/20 hover:border-role-reviewer/40 transition-all cursor-pointer"
          onClick={() => navigate('/reporter/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted (30d)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-reviewer">12</div>
          </CardContent>
        </Card>

        <Card 
          className="border-role-validator/20 hover:border-role-validator/40 transition-all cursor-pointer"
          onClick={() => navigate('/reporter/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">7</div>
          </CardContent>
        </Card>

        <Card 
          className="border-destructive/20 hover:border-destructive/40 transition-all cursor-pointer"
          onClick={() => navigate('/reporter/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Action</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <span className="text-xs text-muted-foreground">RFIs pending</span>
          </CardContent>
        </Card>
      </div>

      {/* Primary Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button
          onClick={() => navigate('/reporter/incidents/new')}
          size="lg"
          className="h-auto py-6 flex-col gap-2 glow-cyan"
        >
          <Plus className="h-6 w-6" />
          <span>New Incident</span>
        </Button>
        <Button
          onClick={() => navigate('/reporter/incidents')}
          size="lg"
          variant="outline"
          className="h-auto py-6 flex-col gap-2"
        >
          <FileText className="h-6 w-6" />
          <span>My Submissions</span>
        </Button>
        <Button
          onClick={() => navigate('/reporter/incidents')}
          size="lg"
          variant="outline"
          className="h-auto py-6 flex-col gap-2"
        >
          <MessageSquare className="h-6 w-6" />
          <span>Requests for Info</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-auto py-6 flex-col gap-2"
        >
          <HelpCircle className="h-6 w-6" />
          <span>Help</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Drafts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium">{draft.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-muted-foreground">Last updated: {draft.updated}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        draft.daysLeft <= 2 
                          ? 'bg-destructive/15 text-destructive' 
                          : draft.daysLeft <= 4 
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' 
                            : 'bg-primary/15 text-primary'
                      }`}>
                        {draft.daysLeft} {draft.daysLeft === 1 ? 'day' : 'days'} left
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/reporter/incidents/new')}
                    >
                      Continue
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-3 rounded-lg border transition-all ${
                  announcement.priority === 'high'
                    ? 'border-destructive/40 bg-destructive/5'
                    : 'border-border bg-secondary/30'
                }`}
              >
                <p className="text-sm font-medium mb-1">{announcement.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{announcement.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>From: {announcement.from}</span>
                  <span>{announcement.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Activity & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                  activity.urgent
                    ? 'border-destructive/40 bg-destructive/5'
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="mt-1">
                  {activity.urgent ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.urgent && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Respond
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
