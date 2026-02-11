import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download, Printer, FileText, Clock, User, Paperclip, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function IncidentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');

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

  const communications = [
    {
      id: 1,
      type: 'rfi',
      from: 'MCMC Reviewer',
      fromRole: 'reviewer',
      message: 'Please provide additional information regarding the exact time the package was last seen at the distribution center. Also, clarify if CCTV footage is available for the timeframe in question.',
      timestamp: '2025-01-15 15:30',
      urgent: true
    },
    {
      id: 2,
      type: 'reply',
      from: 'Licensee Reporter',
      fromRole: 'reporter',
      message: 'The package was last scanned at 08:45 AM on January 15th. CCTV footage for the warehouse area from 08:00 AM to 10:00 AM has been secured and is available for review. We can provide the footage via secure file transfer.',
      timestamp: '2025-01-15 16:15',
      urgent: false
    },
    {
      id: 3,
      type: 'comment',
      from: 'MCMC Reviewer',
      fromRole: 'reviewer',
      message: 'Thank you for the prompt response. Please upload the CCTV footage through the evidence section. Also, confirm if the package had insurance and its declared value.',
      timestamp: '2025-01-15 16:45',
      urgent: false
    }
  ];

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send to backend
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  const timeline = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: '2025-01-15 10:30', dueIn: new Date('2025-01-22T10:30:00') },
    { event: 'Acknowledged', actor: 'MCMC System', time: '2025-01-15 10:32', dueIn: new Date('2025-01-22T10:32:00') },
    { event: 'Assigned to Reviewer', actor: 'MCMC System', time: '2025-01-15 11:00', dueIn: new Date('2025-01-22T11:00:00') },
    { event: 'Under Review', actor: 'MCMC Reviewer', time: '2025-01-15 14:45', dueIn: new Date('2025-01-22T14:45:00') },
  ];

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (due: Date) => {
    const diff = due.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

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
                        <div className={`flex items-center gap-1.5 mt-1.5 text-xs font-mono font-medium ${
                          item.dueIn.getTime() - now.getTime() <= 86400000 
                            ? 'text-destructive' 
                            : item.dueIn.getTime() - now.getTime() <= 259200000 
                              ? 'text-amber-500' 
                              : 'text-primary'
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span>Due in: {formatCountdown(item.dueIn)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rfis" className="mt-6">
                <div className="space-y-4">
                  {/* Communication Thread */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {communications.map((comm) => (
                      <div
                        key={comm.id}
                        className={`flex ${comm.fromRole === 'reporter' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            comm.fromRole === 'reporter'
                              ? 'bg-primary/10 border border-primary/20'
                              : comm.type === 'rfi'
                              ? 'bg-destructive/10 border border-destructive/20'
                              : 'bg-muted border border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold">{comm.from}</p>
                              {comm.type === 'rfi' && (
                                <Badge variant="destructive" className="text-xs">
                                  RFI
                                </Badge>
                              )}
                              {comm.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed">{comm.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{comm.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Box */}
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Type your response or clarification..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attach File
                        </Button>
                        <Button 
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="glow-cyan"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
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
