import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, Download, Clock, Paperclip, MessageSquare, Send } from 'lucide-react';
import CaseDetailsView, { CaseData } from '@/components/shared/CaseDetailsView';

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

export default function LicenseeAdminIncidents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const filtered = incidents.filter(i =>
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mapToCaseData = (inc: typeof incidents[0]): CaseData => ({
    id: inc.id,
    title: inc.description,
    incidentType: inc.type,
    category: inc.type,
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

  const handleRowClick = (incident: typeof incidents[0]) => {
    setSelectedIncident(incident);
    setDetailOpen(true);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Case Monitoring</h1>
        <p className="text-muted-foreground">Read-only view of all organisation incidents</p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference, reporter, type..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Cases</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Case Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="suspicious">Suspicious Parcel</SelectItem>
                        <SelectItem value="prohibited">Prohibited Items</SelectItem>
                        <SelectItem value="breach">Security Breach</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="review">Under Review</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reporter</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All reporters" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="ahmad">Ahmad bin Abdullah</SelectItem>
                        <SelectItem value="siti">Siti Nurhaliza</SelectItem>
                        <SelectItem value="kamal">Kamal Hassan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Apply Filters</Button>
                    <Button variant="outline" className="flex-1">Reset</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reference No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reporter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Case Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Severity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submitted</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Escalated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleRowClick(incident)}>
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-primary">{incident.id}</span>
                    </td>
                    <td className="px-4 py-4 text-sm">{incident.reporter}</td>
                    <td className="px-4 py-4 text-sm">{incident.type}</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={severityColors[incident.severity]}>{incident.severity}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={statusColors[incident.status]}>{incident.status}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{incident.submitted}</td>
                    <td className="px-4 py-4">
                      {incident.escalated ? (
                        <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">Yes</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Case Detail Dialog with RFI */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="font-mono text-primary">{selectedIncident?.id}</span>
              {selectedIncident && <Badge variant="outline" className={statusColors[selectedIncident.status]}>{selectedIncident.status}</Badge>}
            </DialogTitle>
          </DialogHeader>

          {selectedIncident && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList>
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="rfi" className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  RFIs & Communication
                </TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details">
                <div className="grid lg:grid-cols-5 gap-6 mt-4">
                  <div className="lg:col-span-3">
                    <CaseDetailsView incident={mapToCaseData(selectedIncident)} />
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</h3>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                        <Badge variant="outline" className={`text-base px-4 py-1 ${statusColors[selectedIncident.status]}`}>{selectedIncident.status}</Badge>
                      </div>
                      {selectedIncident.escalated && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                          <span className="text-sm text-destructive font-medium">⚠ Escalated to LEA</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timeline
                      </h3>
                      <div className="space-y-0">
                        {timeline.map((event, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`h-3 w-3 rounded-full shrink-0 ${i === 0 ? 'bg-role-licensee-admin' : 'bg-border'}`} />
                              {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                            </div>
                            <div className="pb-4">
                              <p className="text-sm font-medium">{event.action}</p>
                              <p className="text-xs text-muted-foreground">{event.user} • {event.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* RFI & Communication Tab */}
              <TabsContent value="rfi">
                <div className="mt-4 space-y-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {rfiMessages.map((msg) => {
                      const isMCMC = msg.role === 'MCMC Case Officer';
                      return (
                        <div key={msg.id} className={`flex ${isMCMC ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[75%] p-3 rounded-lg border ${isMCMC ? 'bg-muted/50 border-border' : 'bg-role-licensee-admin/10 border-role-licensee-admin/20'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold">{msg.from}</span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{msg.role}</Badge>
                              {msg.status && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-status-rfi/20 text-status-rfi border-status-rfi/30">{msg.status}</Badge>
                              )}
                            </div>
                            <p className="text-sm">{msg.message}</p>
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

                  <Separator />

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type a message or clarification..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 min-h-[60px]"
                    />
                    <div className="flex flex-col gap-1">
                      <Button size="sm" disabled={!replyText.trim()}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
