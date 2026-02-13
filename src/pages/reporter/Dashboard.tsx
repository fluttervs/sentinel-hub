import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, MessageSquare, Clock, AlertCircle, CheckCircle2, Trash2, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Licensee Reporter</p>
      </div>

      {/* KPI Cards - 5 cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card className="border-status-submitted/20 hover:border-status-submitted/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-submitted">12</div>
          </CardContent>
        </Card>

        <Card className="border-status-in-review/20 hover:border-status-in-review/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-in-review">4</div>
          </CardContent>
        </Card>

        <Card className="border-status-investigation/20 hover:border-status-investigation/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalated</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-investigation">2</div>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20 hover:border-status-closed/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Incident */}
      <Button
        onClick={() => navigate('/reporter/incidents/new')}
        size="lg"
        className="w-full h-auto py-5 text-lg glow-cyan"
      >
        <Plus className="mr-3 h-6 w-6" />
        Create New Incident
      </Button>

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
                    <Button size="sm" variant="outline" onClick={() => navigate('/reporter/incidents/new')}>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
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
