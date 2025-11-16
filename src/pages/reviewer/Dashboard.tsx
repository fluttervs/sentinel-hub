import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertCircle, MessageSquare, Clock, Home, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReviewerDashboard() {
  const navigate = useNavigate();

  const priorityIncidents = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', licensee: 'Express Courier Sdn Bhd', severity: 'Critical', sla: '2h remaining', status: 'Pending Review' },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', licensee: 'Swift Logistics Sdn Bhd', severity: 'High', sla: '5h remaining', status: 'Pending Review' },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', licensee: 'Express Courier Sdn Bhd', severity: 'High', sla: '8h remaining', status: 'RFI Sent' },
    { id: 'PSIRP-2025-0025', title: 'Lost Consignment Claim', licensee: 'Fast Delivery Enterprise', severity: 'Medium', sla: '12h remaining', status: 'Pending Review' },
    { id: 'PSIRP-2025-0024', title: 'Fraud Attempt Documentation', licensee: 'Express Courier Sdn Bhd', severity: 'High', sla: '3h remaining', status: 'RFI Sent' },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
    };
    return colors[status] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reviewer Dashboard</h1>
          <p className="text-muted-foreground">MCMC Reviewer workspace</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="border-primary/20 cursor-pointer hover:border-primary/40 transition-all"
          onClick={() => navigate('/reviewer/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card 
          className="border-role-validator/20 cursor-pointer hover:border-role-validator/40 transition-all"
          onClick={() => navigate('/reviewer/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">15</div>
            <p className="text-xs text-muted-foreground mt-1">In your queue</p>
          </CardContent>
        </Card>

        <Card 
          className="border-status-rfi/20 cursor-pointer hover:border-status-rfi/40 transition-all"
          onClick={() => navigate('/reviewer/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RFIs Pending</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">6</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card 
          className="border-destructive/20 cursor-pointer hover:border-destructive/40 transition-all"
          onClick={() => navigate('/reviewer/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA at Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">Urgent attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/reviewer/incidents')}
            >
              <FileText className="mr-2 h-4 w-4" />
              View All Incidents
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/reviewer/incidents')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Priority Queue
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/reviewer/incidents')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              RFI Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reviewed Today</span>
              <span className="text-sm font-medium">12 incidents</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">RFIs Sent</span>
              <span className="text-sm font-medium">4 requests</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Escalated</span>
              <span className="text-sm font-medium">2 cases</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg. Review Time</span>
              <span className="text-sm font-medium">1.5 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Priority Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {priorityIncidents.map((incident) => (
              <div 
                key={incident.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/40 transition-all cursor-pointer"
                onClick={() => navigate(`/reporter/incidents/${incident.id}`)}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-primary">{incident.id}</span>
                    <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="font-medium">{incident.title}</p>
                  <p className="text-sm text-muted-foreground">{incident.licensee}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${incident.sla.includes('2h') || incident.sla.includes('3h') ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {incident.sla}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Review
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
