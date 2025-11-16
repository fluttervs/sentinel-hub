import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Printer, FileText, Clock, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function IncidentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const incident = {
    id: id || 'PSIRP-2025-0025',
    title: 'High-Value Package Theft',
    status: 'In Review',
    severity: 'High',
    type: 'Theft',
    category: 'High Value Items',
    location: 'Kuala Lumpur Distribution Center',
    organisation: 'Express Courier Sdn Bhd',
    consignmentId: 'EC20250115-12345',
    submitted: '2025-01-15 10:30',
    lastUpdated: '2025-01-15 14:45',
    assigned: 'MCMC Reviewer',
  };

  const timeline = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: '2025-01-15 10:30' },
    { event: 'Acknowledged', actor: 'MCMC System', time: '2025-01-15 10:32' },
    { event: 'Assigned to Reviewer', actor: 'MCMC System', time: '2025-01-15 11:00' },
    { event: 'Under Review', actor: 'MCMC Reviewer', time: '2025-01-15 14:45' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
    };
    return colors[status] || 'bg-secondary';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Incidents
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Summary */}
        <Card className="lg:w-1/3">
          <CardHeader>
            <CardTitle className="text-xl">Incident Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Incident ID</p>
              <p className="font-mono text-primary">{incident.id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Title</p>
              <p className="font-semibold">{incident.title}</p>
            </div>

            <div className="flex gap-2">
              <Badge variant="outline" className={getStatusColor(incident.status)}>
                {incident.status}
              </Badge>
              <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                {incident.severity}
              </Badge>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{incident.type}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-sm font-medium">{incident.submitted}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="text-sm font-medium">{incident.assigned}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Tabs */}
        <Card className="flex-1">
          <CardContent className="pt-6">
            <Tabs defaultValue="timeline">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="rfis">RFIs & Comments</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-6">
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium">{item.event}</p>
                        <p className="text-sm text-muted-foreground">{item.actor}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rfis" className="mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  No RFIs or comments yet
                </div>
              </TabsContent>

              <TabsContent value="ai" className="mt-6">
                <div className="space-y-4">
                  <Card className="border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium mb-2">Similar Incidents</p>
                      <p className="text-sm text-muted-foreground">3 similar incidents found in the past 30 days</p>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium mb-2">Risk Pattern</p>
                      <p className="text-sm text-muted-foreground">
                        High-value items via Route X show increased risk
                      </p>
                    </CardContent>
                  </Card>
                  <p className="text-xs text-muted-foreground text-center">
                    AI insights are for demonstration purposes only
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
