import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, MessageSquare, HelpCircle, Clock, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReporterDashboard() {
  const navigate = useNavigate();

  const drafts = [
    { id: 'draft-1', title: 'Theft of High-Value Package', updated: '2 hours ago' },
    { id: 'draft-2', title: 'Tampered Shipment', updated: '1 day ago' },
    { id: 'draft-3', title: 'Lost Consignment', updated: '3 days ago' },
  ];

  const activities = [
    { type: 'rfi', message: 'RFI received for incident #PSIRP-2025-0023', time: '1 hour ago', urgent: true },
    { type: 'update', message: 'Incident #PSIRP-2025-0020 moved to Investigation', time: '3 hours ago', urgent: false },
    { type: 'acknowledged', message: 'Your submission #PSIRP-2025-0025 was acknowledged', time: '5 hours ago', urgent: false },
    { type: 'closed', message: 'Incident #PSIRP-2025-0019 has been closed', time: '1 day ago', urgent: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Licensee Reporter</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card className="border-role-reviewer/20 hover:border-role-reviewer/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted (30d)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-reviewer">12</div>
          </CardContent>
        </Card>

        <Card className="border-role-validator/20 hover:border-role-validator/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">7</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 hover:border-destructive/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Action</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <span className="text-xs text-muted-foreground">RFIs pending</span>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 15m</div>
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
                    <p className="text-sm text-muted-foreground">Last updated: {draft.updated}</p>
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

        {/* AI Assistance */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">AI Assistance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              AI can suggest severity and category based on your description.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-sm font-medium mb-1">Last Suggestion</p>
                <p className="text-xs text-muted-foreground">Severity: High • Category: Theft</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-sm font-medium mb-1">Pattern Detected</p>
                <p className="text-xs text-muted-foreground">Similar incidents in your area increased 15% this month</p>
              </div>
            </div>
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
