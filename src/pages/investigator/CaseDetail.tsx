import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Lock } from 'lucide-react';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';

const timelineEvents = [
  { date: '2025-06-10', time: '14:30', actor: 'System', action: 'Case assigned to Raj Kumar' },
  { date: '2025-06-10', time: '09:15', actor: 'System', action: 'Case submitted by Ali Hassan' },
  { date: '2025-06-11', time: '10:00', actor: 'Raj Kumar', action: 'Classification: Package Theft — Severity: Medium' },
  { date: '2025-06-12', time: '11:45', actor: 'Raj Kumar', action: 'Clarification requested from reporter' },
  { date: '2025-06-13', time: '09:30', actor: 'Ali Hassan', action: 'Clarification response submitted' },
  { date: '2025-06-14', time: '16:00', actor: 'Raj Kumar', action: 'Escalation proposed to PDRM' },
  { date: '2025-06-14', time: '17:30', actor: 'Supervisor', action: 'Escalation approved' },
  { date: '2025-06-15', time: '08:00', actor: 'System', action: 'Case escalated to PDRM' },
];

export default function InvestigatorCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident: CaseData = {
    id: id || 'PSIRP-2025-0063',
    title: 'Missing parcel from sorting hub',
    incidentType: 'Theft or loss of postal items (non-dangerous)',
    category: 'Medium Severity Incident',
    dateReported: '2025-06-10 09:15',
    incidentDate: '2025-06-08',
    incidentTime: '14:22',
    branchName: 'KL Central Sorting Hub',
    address: 'Jalan Kuching, 51200 KL',
    state: 'W.P. Kuala Lumpur',
    postalCode: '51200',
    companyName: 'Express Courier Sdn Bhd',
    reporterName: 'Ali Hassan',
    reporterDesignation: 'Hub Manager',
    status: 'Under Review',
    severity: 'Medium',
    leaEscalation: 'Yes',
    description: 'A parcel containing electronic goods went missing during the sorting process at KL Hub. CCTV footage shows the parcel entering the sorting lane but not arriving at the dispatch area.',
    systemServiceAffected: 'Sorting & Dispatch System',
    items: [
      { tracking: 'EC-2025-KL-89012', type: 'Standard Parcel', declaration: 'Wireless headphones (RM 450 declared value)', weight: '0.8 kg', detectedItemType: 'Consumer Electronics', sender: { name: 'TechStore Online', address: 'Penang', stateCountry: 'Penang, Malaysia', contact: '+60124567890' }, receiver: { name: 'Ahmad bin Ismail', address: 'Kuala Lumpur', stateCountry: 'KL, Malaysia', contact: '+60198765432' } },
    ],
    immediateActions: 'CCTV footage preserved, hub supervisor interviewed, sorting lane access restricted.',
    incidentControlStatus: 'Under Monitoring',
    reportedToAuthority: 'Yes',
    authorityAgency: 'PDRM',
    authorityReference: 'RPT-2025-KL-0063',
    parcelHandedOver: 'No',
    assistanceRequested: ['Investigation Support'],
    documents: [
      { name: 'CCTV_Screenshot_Hub3.png', size: '1.8 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-10 09:10' },
      { name: 'Sorting_Log_20250608.pdf', size: '0.6 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-10 09:12' },
      { name: 'Dispatch_Record.xlsx', size: '0.4 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-10 09:14' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/investigator/cases')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Cases
        </Button>
        <Badge variant="outline" className="bg-role-investigator/10 text-role-investigator border-role-investigator/30 gap-1">
          <Lock className="h-3 w-3" /> Read-Only
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.id}</h1>
          <p className="text-muted-foreground">Oversight view — no editing permitted</p>
        </div>
        <Badge variant="outline" className={`text-sm px-3 py-1 ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="assessment">Officer Assessment</TabsTrigger>
          <TabsTrigger value="escalation">Escalation History</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="assessment">
          <Card>
            <CardHeader><CardTitle>Officer Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Classification</p><p className="text-sm font-medium">Package Theft / Missing</p></div>
                <div><p className="text-xs text-muted-foreground">Severity</p><p className="text-sm font-medium">Medium</p></div>
                <div><p className="text-xs text-muted-foreground">Risk Indicator</p><p className="text-sm font-medium">Moderate</p></div>
                <div><p className="text-xs text-muted-foreground">Assigned Officer</p><p className="text-sm font-medium">Raj Kumar</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Preliminary Findings</p>
                <p className="text-sm">CCTV footage confirms the parcel entered sorting lane 3 at 14:22. No record of it reaching dispatch. Possible internal handling issue or theft. Awaiting further CCTV review from secondary cameras.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Internal Notes</p>
                <div className="space-y-2">
                  <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Raj Kumar — 2025-06-11 10:30</p>
                    <p className="text-sm mt-1">Checked with hub supervisor. Two staff members had access to lane 3 during the window.</p>
                  </div>
                  <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Raj Kumar — 2025-06-13 15:00</p>
                    <p className="text-sm mt-1">Reporter confirmed the parcel was properly labeled and scanned at intake.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader><CardTitle>Escalation History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-border/40 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Escalation to PDRM</p>
                  <Badge variant="outline" className="border-status-closed/50 text-status-closed">Approved</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Proposed by:</span> Raj Kumar</div>
                  <div><span className="text-muted-foreground">Date:</span> 2025-06-14</div>
                  <div><span className="text-muted-foreground">Approved by:</span> Supervisor Ahmad</div>
                  <div><span className="text-muted-foreground">Approval Date:</span> 2025-06-14</div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Justification</p>
                  <p className="text-sm mt-1">Evidence suggests possible internal theft. CCTV confirms parcel entered sorting area but did not reach dispatch. Recommend police investigation.</p>
                </div>
              </div>
              <div className="p-4 border border-border/40 rounded-lg">
                <p className="text-sm font-medium mb-2">LEA Updates</p>
                <p className="text-sm text-muted-foreground">PDRM acknowledged receipt of referral. Investigation pending assignment.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle>Full Case Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-0">
                {timelineEvents.map((ev, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-role-investigator/60 border-2 border-role-investigator mt-1" />
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
