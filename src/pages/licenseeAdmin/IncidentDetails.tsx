import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import CaseDetailsView, { CaseData, getStatusColor, getSeverityColor } from '@/components/shared/CaseDetailsView';

const incidents = [
  { id: 'PSIRP-2025-0025', reporter: 'Ahmad bin Abdullah', type: 'Theft', severity: 'High', status: 'Under Review', submitted: '2025-01-15', escalated: true, description: 'High-value package theft at sorting facility', attachments: ['evidence-photo.jpg', 'cctv-footage.mp4'] },
  { id: 'PSIRP-2025-0024', reporter: 'Mohd Zaki', type: 'Suspicious Parcel', severity: 'Medium', status: 'Submitted', submitted: '2025-01-14', escalated: false, description: 'Suspicious parcel detected during scanning', attachments: ['scan-report.pdf'] },
  { id: 'PSIRP-2025-0023', reporter: 'Kamal Hassan', type: 'Prohibited Items', severity: 'Low', status: 'Draft', submitted: '2025-01-13', escalated: false, description: 'Prohibited items found in shipment', attachments: [] },
  { id: 'PSIRP-2025-0022', reporter: 'Fatimah Zahra', type: 'Security Breach', severity: 'High', status: 'Escalated', submitted: '2025-01-12', escalated: true, description: 'Unauthorized access to secure area', attachments: ['access-log.csv', 'photo1.jpg'] },
  { id: 'PSIRP-2025-0021', reporter: 'Azman Ali', type: 'Theft', severity: 'Critical', status: 'Closed', submitted: '2025-01-11', escalated: true, description: 'Serial theft case across multiple branches', attachments: ['police-report.pdf'] },
  { id: 'PSIRP-2025-0020', reporter: 'Ahmad bin Abdullah', type: 'Others', severity: 'Low', status: 'Under Review', submitted: '2025-01-10', escalated: false, description: 'Equipment tampering report', attachments: [] },
];

const statusColors: Record<string, string> = {
  'Draft': 'bg-status-draft/20 text-status-draft border-status-draft/30',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'Escalated': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
};

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30',
};

const timeline = [
  { date: '2025-01-15 14:30', action: 'Submitted by Reporter', user: 'Ahmad bin Abdullah' },
  { date: '2025-01-15 16:00', action: 'Assigned to Case Officer', user: 'System' },
  { date: '2025-01-16 09:15', action: 'Under Review', user: 'Officer Lim' },
  { date: '2025-01-17 11:00', action: 'RFI Sent to Reporter', user: 'Officer Lim' },
  { date: '2025-01-18 14:30', action: 'Escalated to LEA', user: 'Supervisor Wong' },
];

const rfiMessages = [
  { id: 1, from: 'Officer Lim', role: 'MCMC Case Officer', date: '2025-01-17 11:00', message: 'Please provide additional CCTV footage from the loading bay area for the period 10:00–14:00 on 14 Jan 2025.', status: 'Action Required' },
  { id: 2, from: 'Ahmad bin Abdullah', role: 'Reporter', date: '2025-01-17 15:30', message: 'Attached the requested CCTV footage. The footage covers cameras 3 and 5 at the loading bay.', attachment: 'cctv-bay-14jan.mp4' },
  { id: 3, from: 'Officer Lim', role: 'MCMC Case Officer', date: '2025-01-18 09:00', message: 'Thank you. Can you also confirm the shift schedule for the security personnel on duty during that time?', status: 'Action Required' },
  { id: 4, from: 'Licensee Admin', role: 'Licensee Admin', date: '2025-01-18 11:45', message: 'The shift schedule has been attached. Security personnel on duty were Mohd Rizal (06:00–14:00) and Tan Wei Ming (14:00–22:00).', attachment: 'shift-schedule-jan.pdf' },
];

const mapToCaseData = (inc: typeof incidents[0]): CaseData => ({
  id: inc.id,
  title: inc.description,
  dateReported: inc.submitted,
  incidentDate: inc.submitted,
  incidentTime: '—',
  branchName: '—',
  address: '—',
  state: '—',
  postalCode: '—',
  companyName: 'Express Courier Sdn Bhd',
  reporterName: inc.reporter,
  reporterDesignation: 'Reporter',
  status: inc.status,
  severity: inc.severity,
  leaEscalation: inc.escalated ? 'Yes' : 'No',
  description: inc.description,
  immediateActions: '—',
  incidentControlStatus: '—',
  reportedToAuthority: inc.escalated ? 'Yes' : 'No',
  parcelHandedOver: '—',
  assistanceRequested: [],
  documents: inc.attachments.map(f => ({ name: f, size: '—', uploadedBy: inc.reporter, uploadDate: inc.submitted })),
  items: ['Theft', 'Suspicious Parcel', 'Prohibited Items'].includes(inc.type) ? [{
    tracking: '—', type: 'Standard', declaration: '—', weight: '—', detectedItemType: inc.type,
    sender: { name: '—', address: '—', stateCountry: '—', contact: '—' },
    receiver: { name: '—', address: '—', stateCountry: '—', contact: '—' },
  }] : undefined,
});

export default function LicenseeAdminIncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState('');

  const incident = incidents.find(i => i.id === id);

  if (!incident) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-admin/incidents')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <p className="text-muted-foreground">Incident not found.</p>
      </div>
    );
  }

  const caseData = mapToCaseData(incident);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-admin/incidents')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{incident.description}</h1>
          <p className="font-mono text-sm text-primary">{incident.id}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={statusColors[incident.status]}>{incident.status}</Badge>
          <Badge variant="outline" className={severityColors[incident.severity]}>{incident.severity}</Badge>
        </div>
      </div>

      {/* 3-column layout matching Reporter's IncidentDetails */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Case Details (2 cols) */}
        <div className="lg:col-span-2">
          <CaseDetailsView incident={caseData} />
        </div>

        {/* Right — Status card + Timeline/RFI tabs */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Badge variant="outline" className={`text-lg px-4 py-1 ${statusColors[incident.status]}`}>{incident.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span>{incident.submitted}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Updated</span><span>{timeline[timeline.length - 1]?.date || '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reporter</span><span>{incident.reporter}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Assigned To</span><span>MCMC Case Officer</span></div>
              </div>
              {incident.escalated && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                  <span className="text-sm text-destructive font-medium">⚠ Escalated to LEA</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline & RFI Tabs */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="timeline">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="rfis">RFIs</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-4">
                    {timeline.map((event, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`h-3 w-3 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground'}`} />
                          {i < timeline.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-medium">{event.action}</p>
                          <p className="text-xs text-muted-foreground">{event.user}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rfis" className="mt-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {rfiMessages.map((msg) => {
                      const isMCMC = msg.role === 'MCMC Case Officer';
                      return (
                        <div key={msg.id} className={`flex ${isMCMC ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[90%] rounded-lg p-3 ${
                            isMCMC
                              ? 'bg-muted border border-border'
                              : 'bg-primary/10 border border-primary/20'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs font-semibold">{msg.from}</p>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{msg.role}</Badge>
                              {msg.status && (
                                <Badge variant="destructive" className="text-[10px] px-1 py-0">Action Required</Badge>
                              )}
                            </div>
                            <p className="text-xs leading-relaxed">{msg.message}</p>
                            {msg.attachment && (
                              <div className="mt-2 flex items-center gap-2 p-1.5 rounded bg-background/60 border border-border text-xs">
                                <Paperclip className="h-3 w-3 text-muted-foreground" />
                                <span>{msg.attachment}</span>
                                <Button size="sm" variant="ghost" className="h-5 text-[10px] px-1.5 ml-auto">Download</Button>
                              </div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">{msg.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <Textarea placeholder="Type your response..." value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className="resize-none text-sm" />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm"><Paperclip className="h-4 w-4 mr-1" />Attach</Button>
                      <Button onClick={() => { if (replyText.trim()) setReplyText(''); }} disabled={!replyText.trim()} size="sm"><Send className="h-4 w-4 mr-1" />Send</Button>
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
