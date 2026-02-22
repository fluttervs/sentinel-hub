import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';

export default function IncidentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');

  const incident: CaseData = {
    id: id || 'PSIRP-2025-0025',
    title: 'High-Value Package Theft',
    status: 'In Review',
    severity: 'High',
    description: 'A high-value package containing electronic goods was reported missing from the KL Distribution Center during the morning shift. The package was last scanned at 08:45 AM and could not be located during the 10:00 AM audit.',
    incidentDate: '2025-01-15',
    incidentTime: '08:45',
    incidentLocation: 'Lot 5, Jalan Teknologi, Taman Sains Selangor, Shah Alam',
    dateReported: '2025-01-15 10:30',
    branchName: 'KL Main Distribution Center',
    address: 'Lot 5, Jalan Teknologi, Taman Sains Selangor',
    state: 'Selangor',
    postalCode: '47810',
    companyName: 'Pos Malaysia Berhad',
    registeredAddress: 'Dayabumi Complex, Jalan Sultan Hishamuddin, 50670 Kuala Lumpur',
    reporterName: 'Ahmad bin Ibrahim',
    reporterDesignation: 'Security Manager',
    reporterEmail: 'ahmad.ibrahim@posmalaysia.com.my',
    reporterPhone: '+60 12-345 6789',
    leaEscalation: 'No',
    systemServiceAffected: 'Parcel Tracking System',
    observedImpact: 'Financial Impact',
    primaryIncidentType: 'Theft or loss of postal items',
    staffDetected: { name: 'Ali bin Hassan', designation: 'Warehouse Supervisor', contactNumber: '+60 13-456 7890', email: 'ali.hassan@posmalaysia.com.my' },
    senderInfo: { name: 'TechCo Sdn Bhd', address: '12 Jalan Tech, KL', stateCountry: 'Kuala Lumpur, Malaysia', contact: '+60123456789' },
    recipientInfo: { name: 'Ahmad bin Ibrahim', address: '45 Jalan Mawar, Shah Alam', stateCountry: 'Selangor, Malaysia', contact: '+60198765432' },
    trackingNumber: 'EC20250115-12345',
    packageDeclaration: 'Electronic goods - Laptop',
    packageWeight: '2.5',
    prohibitedItemType: '',
    otherRelatedInfo: '',
    immediateActions: 'Area secured, CCTV footage preserved, internal investigation initiated. All staff on shift have been interviewed.',
    incidentContained: 'Ongoing',
    incidentControlStatus: 'Under Monitoring',
    reportedToAuthority: 'Yes',
    authorityDetails: 'PDRM — RPT-2025-KL-0045',
    parcelHandedOver: 'No',
    assistanceRequested: ['Investigation Support', 'Legal Advice'],
    documents: [
      { name: 'CCTV_Footage_Screenshot.png', size: '2.4 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:25' },
      { name: 'Incident_Report_Internal.pdf', size: '1.1 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:28' },
    ],
  };

  const timeline = [
    { event: 'Draft Created', actor: 'Reporter', time: '2025-01-15 09:00', type: 'system' },
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: '2025-01-15 10:30', type: 'submission' },
    { event: 'Acknowledged by System', actor: 'System', time: '2025-01-15 10:32', type: 'system' },
    { event: 'Assigned to Case Officer', actor: 'System', time: '2025-01-15 11:00', type: 'system' },
    { event: 'Clarification Requested', actor: 'MCMC Case Officer', time: '2025-01-15 15:30', type: 'rfi' },
    { event: 'Clarification Responded', actor: 'Reporter', time: '2025-01-15 16:15', type: 'response' },
    { event: 'Under Review', actor: 'MCMC Case Officer', time: '2025-01-15 14:45', type: 'update' },
  ];

  const communications = [
    { id: 1, type: 'rfi', from: 'MCMC Case Officer', fromRole: 'reviewer', message: 'Please provide additional information regarding the exact time the package was last seen at the distribution center. Also, clarify if CCTV footage is available.', timestamp: '2025-01-15 15:30', urgent: true },
    { id: 2, type: 'reply', from: 'Licensee Reporter', fromRole: 'reporter', message: 'The package was last scanned at 08:45 AM on January 15th. CCTV footage for the warehouse area from 08:00 AM to 10:00 AM has been secured.', timestamp: '2025-01-15 16:15', urgent: false },
    { id: 3, type: 'comment', from: 'MCMC Case Officer', fromRole: 'reviewer', message: 'Thank you. Please upload the CCTV footage and confirm insurance and declared value.', timestamp: '2025-01-15 16:45', urgent: false },
  ];

  const handleSendReply = () => {
    if (replyText.trim()) { setReplyText(''); }
  };

  const getTimelineDotColor = (type: string) => {
    const c: Record<string, string> = { submission: 'bg-primary', rfi: 'bg-status-rfi', response: 'bg-status-closed', update: 'bg-status-in-review', system: 'bg-muted-foreground' };
    return c[type] || 'bg-primary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />Back to Submissions
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{incident.title}</h1>
          <p className="font-mono text-sm text-primary">{incident.id}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={getStatusColor(incident.status)}>{incident.status}</Badge>
          <Badge variant="outline" className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CaseDetailsView incident={incident} />
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Badge variant="outline" className={`text-lg px-4 py-1 ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span>{incident.dateReported}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Updated</span><span>2025-01-15 14:45</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Assigned To</span><span>MCMC Case Officer</span></div>
              </div>
            </CardContent>
          </Card>

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
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {communications.map((comm) => (
                      <div key={comm.id} className={`flex ${comm.fromRole === 'reporter' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] rounded-lg p-3 ${
                          comm.fromRole === 'reporter'
                            ? 'bg-primary/10 border border-primary/20'
                            : comm.type === 'rfi'
                            ? 'bg-destructive/10 border border-destructive/20'
                            : 'bg-muted border border-border'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-semibold">{comm.from}</p>
                            {comm.type === 'rfi' && <Badge variant="destructive" className="text-[10px] px-1 py-0">RFI</Badge>}
                            {comm.urgent && <Badge variant="destructive" className="text-[10px] px-1 py-0">Action Required</Badge>}
                          </div>
                          <p className="text-xs leading-relaxed">{comm.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{comm.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <Textarea placeholder="Type your response..." value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className="resize-none text-sm" />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm"><Paperclip className="h-4 w-4 mr-1" />Attach</Button>
                      <Button onClick={handleSendReply} disabled={!replyText.trim()} size="sm" className="glow-cyan"><Send className="h-4 w-4 mr-1" />Send</Button>
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
