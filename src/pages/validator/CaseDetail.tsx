import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, MapPin, Package, AlertTriangle, Clock, User } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{id}</h1>
          <p className="text-muted-foreground">Case Detail – Supervisor View</p>
        </div>
        <Badge variant="outline" className="border-destructive/50 text-destructive ml-auto text-sm px-3 py-1">Escalation Pending</Badge>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="assessment">Officer Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" /> Incident Information</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ['Title', 'High-value theft at KL Central Hub'],
                  ['Date', '2025-06-08'],
                  ['Category', 'Theft / Pilferage'],
                  ['Description', 'Multiple high-value parcels reported missing from sorting facility during overnight shift. Security footage shows unauthorized access to restricted zone.'],
                ].map(([l, v]) => (
                  <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Location Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ['Type', 'Sorting Hub'],
                  ['Branch', 'KL Central Hub'],
                  ['Address', 'Jalan Tun Razak, 50400 Kuala Lumpur'],
                  ['State', 'W.P. Kuala Lumpur'],
                ].map(([l, v]) => (
                  <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-4 w-4" /> Affected Items</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tracking: 'EC-2025-87654', type: 'Registered Parcel', item: 'Electronics – Laptop' },
                  { tracking: 'EC-2025-87655', type: 'Insured Parcel', item: 'Jewelry – Gold necklace set' },
                ].map((p) => (
                  <div key={p.tracking} className="p-3 border border-border/40 rounded-lg">
                    <p className="text-sm font-medium">{p.tracking}</p>
                    <p className="text-xs text-muted-foreground">{p.type} · {p.item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Violation Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ['Violation Type', 'Theft / Unauthorized Access'],
                  ['Severity', 'Critical'],
                  ['Explanation', 'Unauthorized personnel accessed restricted sorting area. Evidence of systematic targeting of high-value parcels.'],
                ].map(([l, v]) => (
                  <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Supporting Documents</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {['CCTV_Footage_Screenshot.jpg', 'Security_Log_20250608.pdf', 'Missing_Parcel_List.xlsx'].map((f) => (
                <div key={f} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                  <span className="text-sm">{f}</span>
                  <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
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
