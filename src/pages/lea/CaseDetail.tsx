import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, FileText, Lock, CheckCircle, Upload, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const timelineEvents = [
  { date: '2025-06-15', time: '08:00', actor: 'System', action: 'Case escalated to PDRM' },
  { date: '2025-06-15', time: '10:30', actor: 'LEA Officer', action: 'Case receipt acknowledged' },
  { date: '2025-06-16', time: '09:00', actor: 'LEA Officer', action: 'Investigation status: Under Investigation' },
  { date: '2025-06-18', time: '14:00', actor: 'LEA Officer', action: 'Evidence seized from sorting hub' },
  { date: '2025-06-19', time: '11:30', actor: 'LEA Officer', action: 'Clarification requested from MCMC' },
  { date: '2025-06-20', time: '09:15', actor: 'MCMC', action: 'Clarification response provided' },
  { date: '2025-06-22', time: '16:00', actor: 'LEA Officer', action: 'Investigation report uploaded' },
];

export default function LEACaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investigationStatus, setInvestigationStatus] = useState('Under Investigation');
  const [acknowledged, setAcknowledged] = useState(true);
  const [clarificationMsg, setClarificationMsg] = useState('');
  const [outcomeType, setOutcomeType] = useState('');
  const [outcomeSummary, setOutcomeSummary] = useState('');

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast({ title: 'Case Acknowledged', description: 'Receipt confirmed and logged in timeline.' });
  };

  const handleStatusUpdate = (status: string) => {
    setInvestigationStatus(status);
    toast({ title: 'Status Updated', description: `Investigation status changed to "${status}".` });
  };

  const handleUpload = () => {
    toast({ title: 'File Uploaded', description: 'Investigation report uploaded and logged.' });
  };

  const handleClarification = () => {
    if (!clarificationMsg.trim()) return;
    toast({ title: 'Clarification Sent', description: 'Request sent to MCMC. You will be notified when they respond.' });
    setClarificationMsg('');
  };

  const handleOutcome = () => {
    if (!outcomeType || !outcomeSummary.trim()) return;
    toast({ title: 'Outcome Submitted', description: `Outcome "${outcomeType}" submitted to MCMC for review.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/lea/cases')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cases
        </Button>
        <Badge variant="outline" className="gap-1" style={{ backgroundColor: 'hsl(220 70% 50% / 0.1)', color: 'hsl(220 70% 50%)', borderColor: 'hsl(220 70% 50% / 0.3)' }}>
          <Lock className="h-3 w-3" /> LEA Access — Read-Only Incident Data
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{id || 'ESC-2025-001'}</h1>
          <p className="text-muted-foreground">Theft of High-Value Consignment — Express Courier Sdn Bhd</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/50 text-primary text-sm px-3 py-1">{investigationStatus}</Badge>
          {!acknowledged && (
            <Button onClick={handleAcknowledge}>
              <CheckCircle className="h-4 w-4 mr-2" /> Acknowledge Receipt
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="investigation">Investigation</TabsTrigger>
          <TabsTrigger value="uploads">Reports & Evidence</TabsTrigger>
          <TabsTrigger value="clarification">Clarification</TabsTrigger>
          <TabsTrigger value="outcome">Outcome</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Incident Information</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">Title</p><p className="text-sm font-medium">Theft of High-Value Consignment</p></div>
              <div><p className="text-xs text-muted-foreground">Category</p><p className="text-sm font-medium">Package Theft / Missing</p></div>
              <div><p className="text-xs text-muted-foreground">Date of Incident</p><p className="text-sm font-medium">2025-06-08</p></div>
              <div><p className="text-xs text-muted-foreground">Organisation</p><p className="text-sm font-medium">Express Courier Sdn Bhd</p></div>
              <div><p className="text-xs text-muted-foreground">Severity</p><p className="text-sm font-medium">High</p></div>
              <div><p className="text-xs text-muted-foreground">Escalation Date</p><p className="text-sm font-medium">2025-06-15</p></div>
              <div className="md:col-span-2"><p className="text-xs text-muted-foreground">Description</p><p className="text-sm">A high-value consignment containing electronic goods went missing during transit. CCTV footage confirms the parcel entered sorting lane but did not reach dispatch area. Evidence suggests possible internal theft.</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Location Details</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">Location</p><p className="text-sm font-medium">KL Central Sorting Hub</p></div>
              <div><p className="text-xs text-muted-foreground">Address</p><p className="text-sm font-medium">Jalan Kuching, 51200 Kuala Lumpur</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Affected Items</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">Tracking Number</p><p className="text-sm font-medium">EC-2025-KL-89012</p></div>
              <div><p className="text-xs text-muted-foreground">Parcel Type</p><p className="text-sm font-medium">Standard Parcel</p></div>
              <div><p className="text-xs text-muted-foreground">Sender</p><p className="text-sm font-medium">TechStore Online — Penang</p></div>
              <div><p className="text-xs text-muted-foreground">Receiver</p><p className="text-sm font-medium">Ahmad bin Ismail — Kuala Lumpur</p></div>
              <div><p className="text-xs text-muted-foreground">Item Description</p><p className="text-sm font-medium">Wireless headphones (RM 450 declared value)</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Violation Details</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">Violation Type</p><p className="text-sm font-medium">Theft / Misappropriation</p></div>
              <div><p className="text-xs text-muted-foreground">Severity</p><p className="text-sm font-medium">High</p></div>
              <div className="md:col-span-2"><p className="text-xs text-muted-foreground">Explanation</p><p className="text-sm">CCTV confirms parcel entered sorting lane 3 at 14:22 but was not recorded at dispatch. Two staff members had access during the window.</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Supporting Documents</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {['CCTV_Screenshot_Hub3.png', 'Sorting_Log_20250608.pdf', 'Escalation_Justification.pdf'].map((f) => (
                <div key={f} className="flex items-center justify-between p-2 border border-border/40 rounded-lg">
                  <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{f}</span></div>
                  <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigation">
          <Card>
            <CardHeader><CardTitle>Update Investigation Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Investigation Status</Label>
                <Select value={investigationStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                    <SelectItem value="Evidence Seized">Evidence Seized</SelectItem>
                    <SelectItem value="Pending Further Information">Pending Further Information</SelectItem>
                    <SelectItem value="Case Referred for Prosecution">Case Referred for Prosecution</SelectItem>
                    <SelectItem value="No Further Action">No Further Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Current Status</p>
                <Badge variant="outline" className="border-primary/50 text-primary">{investigationStatus}</Badge>
                <p className="text-xs text-muted-foreground mt-2">All status changes are logged with timestamp and user ID.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads">
          <Card>
            <CardHeader><CardTitle>Upload Investigation Reports & Evidence</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Upload investigation reports, official correspondence, or supporting evidence</p>
                <p className="text-xs text-muted-foreground mb-4">Accepted: PDF, DOCX, PNG, JPG — Max 20MB per file</p>
                <Button variant="outline" onClick={handleUpload}>
                  <Upload className="h-4 w-4 mr-2" /> Select Files
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Files</p>
                {[
                  { name: 'Investigation_Report_ESC001.pdf', date: '2025-06-22', user: 'Insp. Razak' },
                  { name: 'Evidence_Photo_001.jpg', date: '2025-06-18', user: 'Insp. Razak' },
                  { name: 'Witness_Statement.pdf', date: '2025-06-20', user: 'Insp. Razak' },
                ].map((f) => (
                  <div key={f.name} className="flex items-center justify-between p-2 border border-border/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.date} — {f.user}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clarification">
          <Card>
            <CardHeader><CardTitle>Clarification Requests</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border border-border/40 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium">LEA Officer — 2025-06-19 11:30</p>
                    <Badge variant="outline" className="text-xs border-status-closed/50 text-status-closed">Responded</Badge>
                  </div>
                  <p className="text-sm">Can you confirm the exact time the parcel was last scanned in the sorting system? Also, please provide the shift roster for sorting lane 3 on that date.</p>
                </div>
                <div className="p-3 border border-primary/30 rounded-lg bg-primary/5 ml-6">
                  <p className="text-xs font-medium text-primary">MCMC Response — 2025-06-20 09:15</p>
                  <p className="text-sm mt-1">Last scan recorded at 14:22:45. Shift roster attached — 3 staff members were assigned to lane 3 between 14:00–16:00.</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <Label>New Clarification Request</Label>
                <Textarea placeholder="Enter your clarification request to MCMC or Licensee..." value={clarificationMsg} onChange={(e) => setClarificationMsg(e.target.value)} rows={3} />
                <Button onClick={handleClarification} disabled={!clarificationMsg.trim()}>
                  <Send className="h-4 w-4 mr-2" /> Send Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcome">
          <Card>
            <CardHeader><CardTitle>Investigation Outcome</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Outcome</Label>
                <Select value={outcomeType} onValueChange={setOutcomeType}>
                  <SelectTrigger><SelectValue placeholder="Select outcome" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prosecution Recommended">Prosecution Recommended</SelectItem>
                    <SelectItem value="No Further Action">No Further Action</SelectItem>
                    <SelectItem value="Ongoing Investigation">Ongoing Investigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Outcome Summary</Label>
                <Textarea placeholder="Provide a summary of the investigation findings and outcome..." value={outcomeSummary} onChange={(e) => setOutcomeSummary(e.target.value)} rows={4} />
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleOutcome} disabled={!outcomeType || !outcomeSummary.trim()}>Submit Outcome</Button>
                <Button variant="outline" onClick={() => toast({ title: 'Closure Recommendation', description: 'Recommendation sent to MCMC Supervisor for final closure.' })} disabled={!outcomeType}>
                  Recommend Case Closure to MCMC
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Final case closure authority remains with MCMC. Your recommendation will be reviewed by the MCMC Supervisor.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle>Case Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-0">
                {timelineEvents.map((ev, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full border-2 mt-1" style={{ backgroundColor: 'hsl(220 70% 50% / 0.6)', borderColor: 'hsl(220 70% 50%)' }} />
                      {idx < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-muted-foreground">{ev.date} at {ev.time} — <span className="font-medium text-foreground">{ev.actor}</span></p>
                      <p className="text-sm mt-0.5">{ev.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
