import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, User } from 'lucide-react';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';

const timelineEvents = [
  { date: '2025-06-09', time: '09:15', actor: 'System', action: 'Incident submitted by Licensee Reporter' },
  { date: '2025-06-09', time: '10:30', actor: 'System', action: 'Assigned to Case Officer Ahmad Razif' },
  { date: '2025-06-09', time: '14:00', actor: 'Ahmad Razif', action: 'Initial assessment completed – Severity: Critical' },
  { date: '2025-06-10', time: '09:00', actor: 'Ahmad Razif', action: 'Escalation request submitted to Supervisor' },
  { date: '2025-06-10', time: '11:45', actor: 'System', action: 'Status changed to Escalation Pending Approval' },
];

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident: CaseData = {
    id: id || 'PSIRP-2025-0042',
    title: 'High-value theft at KL Central Hub',
    incidentType: 'Theft or loss of postal items (non-dangerous)',
    category: 'Medium Severity Incident',
    dateReported: '2025-06-09 09:15',
    incidentDate: '2025-06-08',
    incidentTime: '02:15',
    branchName: 'KL Central Hub',
    address: 'Jalan Tun Razak, 50400 Kuala Lumpur',
    state: 'W.P. Kuala Lumpur',
    postalCode: '50400',
    companyName: 'Express Courier Sdn Bhd',
    reporterName: 'Ali Hassan',
    reporterDesignation: 'Facility Manager',
    status: 'Escalation Pending',
    severity: 'Critical',
    leaEscalation: 'Yes',
    description: 'Multiple high-value parcels reported missing from sorting facility during overnight shift. Security footage shows unauthorized access to restricted zone.',
    systemServiceAffected: 'Sorting Facility Security System',
    impactIndicators: ['Operational Disruption', 'Financial Impact', 'Safety Risk'],
    items: [
      { tracking: 'EC-2025-87654', type: 'Registered Parcel', declaration: 'Electronics – Laptop', weight: '3.2 kg', detectedItemType: 'Consumer Electronics', sender: { name: 'TechStore Online', address: 'Penang', stateCountry: 'Penang, Malaysia', contact: '+60124567890' }, receiver: { name: 'Ahmad Ismail', address: 'KL', stateCountry: 'KL, Malaysia', contact: '+60198765432' } },
      { tracking: 'EC-2025-87655', type: 'Insured Parcel', declaration: 'Jewelry – Gold necklace set', weight: '0.5 kg', detectedItemType: 'Precious Items', sender: { name: 'Jewel House', address: 'JB', stateCountry: 'Johor, Malaysia', contact: '+60127654321' }, receiver: { name: 'Siti Aminah', address: 'Shah Alam', stateCountry: 'Selangor, Malaysia', contact: '+60191234567' } },
    ],
    immediateActions: 'Secured facility, preserved CCTV footage, interviewed night shift staff.',
    incidentControlStatus: 'Under Monitoring',
    reportedToAuthority: 'No',
    parcelHandedOver: 'No',
    assistanceRequested: ['Investigation Support'],
    documents: [
      { name: 'CCTV_Footage_Screenshot.jpg', size: '2.1 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-09 09:10' },
      { name: 'Security_Log_20250608.pdf', size: '0.9 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-09 09:12' },
      { name: 'Missing_Parcel_List.xlsx', size: '0.3 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-09 09:14' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{incident.id}</h1>
          <p className="text-muted-foreground">Case Detail – Supervisor View</p>
        </div>
        <Badge variant="outline" className={`ml-auto text-sm px-3 py-1 ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="assessment">Officer Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="assessment">
          <Card>
            <CardHeader><CardTitle>Case Officer Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                ['Classification', 'Criminal – Theft'],
                ['Severity Level', 'Critical'],
                ['Preliminary Findings', 'Evidence suggests organised theft ring operating within the hub. Pattern matches 3 prior incidents in Q1. CCTV evidence confirms unauthorized entry at 02:15 AM.'],
                ['Risk Indicator', 'High – Potential for recurrence'],
              ].map(([l, v]) => (
                <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
              ))}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Internal Notes</p>
                <div className="space-y-2">
                  {[
                    { note: 'Spoke with facility manager – confirms 2 new hires had access cards issued without full vetting.', by: 'Ahmad Razif', date: '2025-06-09 15:30' },
                    { note: 'Cross-referenced with PSIRP-2025-0030 – similar MO. Recommend combined escalation.', by: 'Ahmad Razif', date: '2025-06-10 08:45' },
                  ].map((n, i) => (
                    <div key={i} className="p-3 border border-border/40 rounded-lg bg-accent/20">
                      <p className="text-sm">{n.note}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.by} · {n.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle>Case Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-role-validator border-2 border-background" />
                      {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{ev.date} {ev.time}</span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          <User className="h-3 w-3 mr-1" />{ev.actor}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{ev.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader><CardTitle>Escalation Request</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                ['Requesting Officer', 'Ahmad Razif (CO-2024-015)'],
                ['Request Date', '2025-06-10 09:00'],
                ['Selected LEA(s)', 'Royal Malaysia Police (PDRM) – Commercial Crime Division'],
                ['Justification', 'Strong evidence of organised theft pattern at KL Central Hub. CCTV footage confirms unauthorized access. Pattern matches prior incidents suggesting systematic operation. Recommend immediate LEA involvement for criminal investigation.'],
              ].map(([l, v]) => (
                <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
