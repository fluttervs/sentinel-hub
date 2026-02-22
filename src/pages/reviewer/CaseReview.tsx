import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import {
  ArrowLeft, Download, FileText, MapPin, Package, ShieldAlert, Clock, User,
  Send, Paperclip, MessageSquare, ArrowUpRight, CheckCircle2, StickyNote,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';

export default function CaseReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  
  const [severityLevel, setSeverityLevel] = useState('high');
  const [preliminaryFindings, setPreliminaryFindings] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [clarificationMessage, setClarificationMessage] = useState('');
  const [escalationJustification, setEscalationJustification] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [replyText, setReplyText] = useState('');

  const incident: CaseData = {
    id: id || 'PSIRP-2025-0028',
    title: 'Critical Security Breach',
    status: 'Under Review',
    severity: 'Critical',
    description: 'A critical security breach was detected at the main sorting facility. Unauthorized access to restricted areas was recorded by security systems during the early morning hours of January 16th.',
    incidentDate: '2025-01-16',
    incidentTime: '03:15',
    dateReported: '2025-01-16 06:30',
    branchName: 'KL Main Sorting Facility',
    address: 'Lot 12, Jalan Perusahaan, Shah Alam',
    state: 'Selangor',
    postalCode: '40150',
    companyName: 'Express Courier Sdn Bhd',
    reporterName: 'Ahmad bin Abdullah',
    reporterDesignation: 'Security Manager',
    leaEscalation: 'No',
    systemServiceAffected: 'Access Control System',
    impactIndicators: ['Safety Risk', 'Operational Disruption'],
    items: [
      { tracking: 'EC20250116-99001', type: 'Bulk Shipment', declaration: 'Multiple high-value consignments in restricted zone', weight: 'N/A', detectedItemType: 'Mixed consignments', sender: { name: 'Various', address: 'Various', stateCountry: 'Malaysia', contact: 'N/A' }, receiver: { name: 'Various', address: 'Various', stateCountry: 'Malaysia', contact: 'N/A' } },
    ],
    immediateActions: 'Facility locked down, security protocols activated, CCTV footage secured.',
    incidentControlStatus: 'Contained',
    reportedToAuthority: 'No',
    parcelHandedOver: 'No',
    assistanceRequested: ['Investigation Support', 'Legal Advice'],
    documents: [
      { name: 'Security_Camera_Log.pdf', size: '3.2 MB', uploadedBy: 'Ahmad bin Abdullah', uploadDate: '2025-01-16 06:25' },
      { name: 'Access_Control_Report.xlsx', size: '0.8 MB', uploadedBy: 'Ahmad bin Abdullah', uploadDate: '2025-01-16 06:27' },
      { name: 'Incident_Photo_01.jpg', size: '2.1 MB', uploadedBy: 'Ahmad bin Abdullah', uploadDate: '2025-01-16 06:29' },
    ],
  };

  const sla = '2h remaining';
  const agingDays = 0;

  const timeline = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: '2025-01-16 06:30', type: 'submission' },
    { event: 'Acknowledged by System', actor: 'System', time: '2025-01-16 06:32', type: 'system' },
    { event: 'Assigned to Case Officer', actor: 'System', time: '2025-01-16 07:00', type: 'system' },
    { event: 'Under Review', actor: 'Case Officer', time: '2025-01-16 09:15', type: 'update' },
  ];

  const communications = [
    { id: 1, from: 'Case Officer', fromRole: 'reviewer', type: 'rfi', message: 'Please provide the access control logs for the past 48 hours and confirm whether any CCTV footage from Camera 3 and 7 is available.', timestamp: '2025-01-16 09:30', urgent: true },
    { id: 2, from: 'Licensee Reporter', fromRole: 'reporter', type: 'reply', message: 'Access control logs attached. CCTV footage from Camera 3 is available and being prepared for secure transfer.', timestamp: '2025-01-16 10:15', urgent: false },
  ];

  const getTimelineDotColor = (type: string) => {
    const c: Record<string, string> = { submission: 'bg-role-reviewer', rfi: 'bg-status-rfi', response: 'bg-status-closed', update: 'bg-status-in-review', system: 'bg-muted-foreground' };
    return c[type] || 'bg-role-reviewer';
  };

  const handleRequestClarification = () => {
    if (!clarificationMessage.trim()) return;
    toast({ title: 'Clarification Requested', description: 'The reporter has been notified.' });
    setClarificationMessage('');
  };

  const handleUpdateStatus = (newStatus: string) => {
    toast({ title: 'Status Updated', description: `Case moved to "${newStatus}".` });
  };

  const handleSubmitEscalation = () => {
    if (!escalationJustification.trim() || selectedAgencies.length === 0) {
      toast({ title: 'Missing Information', description: 'Select at least one agency and provide justification.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Escalation Submitted', description: 'Awaiting Supervisor approval.' });
    setEscalationJustification('');
    setSelectedAgencies([]);
  };

  const handleSaveAssessment = () => {
    toast({ title: 'Assessment Saved', description: 'Findings have been recorded.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/reviewer/inbox')}>
          <ArrowLeft className="mr-2 h-4 w-4" />Back to Inbox
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{incident.title}</h1>
          <p className="font-mono text-sm text-role-reviewer">{incident.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(incident.status)}>{incident.status}</Badge>
          <Badge variant="outline" className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
          <Badge variant="outline" className={`${sla.includes('2h') ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-muted'}`}>
            <Clock className="h-3 w-3 mr-1" />{sla}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left - Incident details (read-only) + Assessment (editable) */}
        <div className="lg:col-span-2 space-y-6">
          <CaseDetailsView incident={incident} />

          {/* Initial Assessment (editable) */}
          <Card className="border-role-reviewer/20">
            <CardHeader><CardTitle className="flex items-center gap-2 text-role-reviewer"><ShieldAlert className="h-5 w-5" />Initial Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Severity Level *</Label>
                  <Select value={severityLevel} onValueChange={setSeverityLevel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preliminary Findings *</Label>
                <Textarea value={preliminaryFindings} onChange={(e) => setPreliminaryFindings(e.target.value)} placeholder="Document your initial assessment findings..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><StickyNote className="h-4 w-4" />Internal Notes (private)</Label>
                <Textarea value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} placeholder="Private notes — not visible to the reporter..." rows={3} className="border-role-reviewer/20" />
              </div>
              <Button onClick={handleSaveAssessment} className="glow-blue">Save Assessment</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-6">
          {/* Status & SLA */}
          <Card className="border-role-reviewer/20">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1 bg-status-in-review/20 text-status-in-review border-status-in-review/30">{incident.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Case Age</span><span>{agingDays} days</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">SLA</span><span className="text-destructive font-medium">{sla}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reporter</span><span>{incident.reporterName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span>{incident.dateReported}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Status Actions */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Case Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => handleUpdateStatus('Under Review')}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-status-submitted" />Under Review
              </Button>

              {/* Request Clarification */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4 text-status-rfi" />Request Clarification
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Request Clarification</DialogTitle></DialogHeader>
                  <Textarea value={clarificationMessage} onChange={(e) => setClarificationMessage(e.target.value)} placeholder="Enter your clarification request..." rows={4} />
                  <DialogFooter>
                    <Button onClick={handleRequestClarification} disabled={!clarificationMessage.trim()}>
                      <Send className="mr-2 h-4 w-4" />Send Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full justify-start" onClick={() => handleUpdateStatus('Recommendation for Closure')}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-status-closed" />Recommend Closure
              </Button>

              {/* Escalation */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive/30">
                    <ArrowUpRight className="mr-2 h-4 w-4" />Propose Escalation to LEA
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Propose Escalation to LEA</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select LEA Agency(s) *</Label>
                      <div className="relative">
                        <Input
                          placeholder="Search agencies..."
                          className="mb-2"
                          onChange={(e) => {
                            const el = e.target.nextElementSibling as HTMLElement;
                            if (el) {
                              const items = el.querySelectorAll('[data-agency]');
                              items.forEach((item) => {
                                const name = (item as HTMLElement).dataset.agency || '';
                                (item as HTMLElement).style.display = name.toLowerCase().includes(e.target.value.toLowerCase()) ? '' : 'none';
                              });
                            }
                          }}
                        />
                        <div className="max-h-48 overflow-y-auto space-y-1 border border-border rounded-lg p-2">
                          {[
                            'Ministry of Communications and Digital',
                            'Ministry of Health',
                            'Ministry of Natural Resources and Environmental Sustainability',
                            'KPDNKK',
                            'MKN',
                            'PDRM',
                            'KASTAM',
                            'KDN',
                            'MOT',
                            'AKPS',
                            'Jabatan Perhilitan',
                          ].map((agency) => (
                            <div key={agency} data-agency={agency} className="flex items-center gap-2 py-1">
                              <Checkbox
                                checked={selectedAgencies.includes(agency)}
                                onCheckedChange={(checked) => {
                                  if (checked) setSelectedAgencies((prev) => [...prev, agency]);
                                  else setSelectedAgencies((prev) => prev.filter((a) => a !== agency));
                                }}
                              />
                              <Label className="text-sm cursor-pointer">{agency}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selectedAgencies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedAgencies.map((a) => (
                            <Badge key={a} variant="outline" className="text-xs cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedAgencies((prev) => prev.filter((x) => x !== a))}>
                              {a} ✕
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Justification *</Label>
                      <Textarea value={escalationJustification} onChange={(e) => setEscalationJustification(e.target.value)} placeholder="Provide justification for escalation..." rows={4} />
                    </div>
                    <p className="text-xs text-muted-foreground">This will be routed to MCMC Supervisor for approval.</p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitEscalation} variant="destructive">
                      <ArrowUpRight className="mr-2 h-4 w-4" />Submit Escalation Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Tabs: Timeline + RFIs */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="timeline">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="rfis">RFIs</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`h-3 w-3 rounded-full ${getTimelineDotColor(item.type)}`} />
                          {index < timeline.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">{item.event}</p>
                          <p className="text-xs text-muted-foreground">{item.actor}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rfis" className="mt-4">
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {communications.map((comm) => (
                      <div key={comm.id} className={`flex ${comm.fromRole === 'reviewer' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] rounded-lg p-3 ${
                          comm.fromRole === 'reviewer' ? 'bg-role-reviewer/10 border border-role-reviewer/20' :
                          'bg-muted border border-border'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-semibold">{comm.from}</p>
                            {comm.type === 'rfi' && <Badge variant="destructive" className="text-[10px] px-1 py-0">RFI</Badge>}
                          </div>
                          <p className="text-xs leading-relaxed">{comm.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{comm.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <Textarea placeholder="Send a message..." value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className="resize-none text-sm" />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm"><Paperclip className="h-4 w-4 mr-1" />Attach</Button>
                      <Button onClick={() => { if (replyText.trim()) setReplyText(''); }} disabled={!replyText.trim()} size="sm" className="glow-blue"><Send className="h-4 w-4 mr-1" />Send</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
