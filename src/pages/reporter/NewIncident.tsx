import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Save, Send, Upload, X, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface ParcelItem {
  trackingNumber: string;
  parcelType: string;
  senderName: string;
  senderContact: string;
  receiverName: string;
  receiverContact: string;
  itemDescription: string;
}

const emptyParcelItem: ParcelItem = {
  trackingNumber: '', parcelType: '', senderName: '', senderContact: '',
  receiverName: '', receiverContact: '', itemDescription: '',
};

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Step 1
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Step 2
  const [locationType, setLocationType] = useState('');
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Step 3
  const [parcelItems, setParcelItems] = useState<ParcelItem[]>([{ ...emptyParcelItem }]);

  // Step 4
  const [violationType, setViolationType] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [supportingExplanation, setSupportingExplanation] = useState('');

  // Step 5
  const [attachments, setAttachments] = useState<Array<{ name: string; size: number }>>([]);

  // Step 6
  const [declaration, setDeclaration] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLastSaved(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { number: 1, title: 'Incident Information', short: 'Info' },
    { number: 2, title: 'Location Details', short: 'Location' },
    { number: 3, title: 'Affected Parcel/Items', short: 'Items' },
    { number: 4, title: 'Suspected Violation', short: 'Violation' },
    { number: 5, title: 'Supporting Documents', short: 'Documents' },
    { number: 6, title: 'Declaration & Submit', short: 'Submit' },
  ];

  const nextStep = () => { if (currentStep < 6) setCurrentStep((currentStep + 1) as Step); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep((currentStep - 1) as Step); };

  const handleSaveDraft = () => {
    toast({ title: 'Draft Saved', description: 'Your incident report has been saved as a draft.' });
    navigate('/reporter/incidents');
  };

  const handleSubmit = () => {
    if (!declaration) {
      toast({ title: 'Declaration Required', description: 'Please agree to the declaration before submitting.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Incident Submitted', description: 'Reference: PSIRP-2025-0026' });
    navigate('/reporter/incidents/PSIRP-2025-0026');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size <= 10 * 1024 * 1024);
    if (valid.length < files.length) toast({ title: 'Some files exceed 10MB limit', variant: 'destructive' });
    setAttachments((prev) => [...prev, ...valid.map((f) => ({ name: f.name, size: f.size }))]);
  };

  const addParcelItem = () => setParcelItems((prev) => [...prev, { ...emptyParcelItem }]);
  const removeParcelItem = (idx: number) => setParcelItems((prev) => prev.filter((_, i) => i !== idx));
  const updateParcelItem = (idx: number, field: keyof ParcelItem, value: string) => {
    setParcelItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">New Incident Report</h1>
          <p className="text-muted-foreground">Complete all steps to submit your incident</p>
        </div>
        {lastSaved && <div className="text-sm text-muted-foreground">Auto-saved {lastSaved.toLocaleTimeString()}</div>}
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step.number
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : currentStep > step.number
                      ? 'bg-status-closed text-status-closed-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.number}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">{step.title}</div>
                  <div className="text-xs mt-2 text-center md:hidden">{step.short}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${currentStep > step.number ? 'bg-status-closed' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader><CardTitle>{steps[currentStep - 1].title}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Incident Title *</Label>
                <Input value={incidentTitle} onChange={(e) => setIncidentTitle(e.target.value)} placeholder="Brief description of the incident" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Incident Date *</Label>
                  <Input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Incident Time *</Label>
                  <Input type="time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide a detailed description of what happened..." rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="suspicious-parcel">Suspicious Parcel</SelectItem>
                    <SelectItem value="prohibited-items">Prohibited Items</SelectItem>
                    <SelectItem value="security-breach">Security Breach</SelectItem>
                    <SelectItem value="tampering">Tampering</SelectItem>
                    <SelectItem value="loss">Loss</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Location Type *</Label>
                <Select value={locationType} onValueChange={setLocationType}>
                  <SelectTrigger><SelectValue placeholder="Select location type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="hub">Hub / Distribution Center</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="customer-premises">Customer Premises</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Branch / Hub Name *</Label>
                <Input value={branchName} onChange={(e) => setBranchName(e.target.value)} placeholder="e.g. KL Main Distribution Center" />
              </div>
              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address" rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya'].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Postal Code *</Label>
                  <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="e.g. 50000" maxLength={5} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              {parcelItems.map((item, idx) => (
                <Card key={idx} className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Item {idx + 1}</CardTitle>
                      {parcelItems.length > 1 && (
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeParcelItem(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tracking Number *</Label>
                        <Input value={item.trackingNumber} onChange={(e) => updateParcelItem(idx, 'trackingNumber', e.target.value)} placeholder="EC20250115-12345" />
                      </div>
                      <div className="space-y-2">
                        <Label>Parcel Type *</Label>
                        <Select value={item.parcelType} onValueChange={(v) => updateParcelItem(idx, 'parcelType', v)}>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="parcel">Parcel</SelectItem>
                            <SelectItem value="bulk">Bulk Shipment</SelectItem>
                            <SelectItem value="dangerous">Dangerous Goods</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Sender Name</Label>
                        <Input value={item.senderName} onChange={(e) => updateParcelItem(idx, 'senderName', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Sender Contact</Label>
                        <Input value={item.senderContact} onChange={(e) => updateParcelItem(idx, 'senderContact', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Receiver Name</Label>
                        <Input value={item.receiverName} onChange={(e) => updateParcelItem(idx, 'receiverName', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Receiver Contact</Label>
                        <Input value={item.receiverContact} onChange={(e) => updateParcelItem(idx, 'receiverContact', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Item Description</Label>
                      <Textarea value={item.itemDescription} onChange={(e) => updateParcelItem(idx, 'itemDescription', e.target.value)} placeholder="Describe the affected item..." rows={2} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addParcelItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Item
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Violation Type *</Label>
                <Select value={violationType} onValueChange={setViolationType}>
                  <SelectTrigger><SelectValue placeholder="Select violation type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postal-act">Postal Services Act 2012</SelectItem>
                    <SelectItem value="dangerous-goods">Dangerous Goods Regulation</SelectItem>
                    <SelectItem value="data-privacy">Data Privacy Violation</SelectItem>
                    <SelectItem value="customs">Customs Violation</SelectItem>
                    <SelectItem value="internal-policy">Internal Policy Breach</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Severity</Label>
                <Input value={severity} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Severity is system-assigned based on category and violation type.</p>
              </div>
              <div className="space-y-2">
                <Label>Supporting Explanation *</Label>
                <Textarea value={supportingExplanation} onChange={(e) => setSupportingExplanation(e.target.value)} placeholder="Explain why you suspect this violation..." rows={5} />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <Label htmlFor="fileUpload" className="cursor-pointer">
                  <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                </Label>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG, PDF, DOC, XLS — Max 10MB per file</p>
                <Input id="fileUpload" type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" className="hidden" onChange={handleFileUpload} />
              </div>
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({attachments.length})</Label>
                  {attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setAttachments((p) => p.filter((_, j) => j !== i))}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="p-6 border border-border rounded-lg bg-muted/30 space-y-4">
                <h3 className="font-semibold">Declaration</h3>
                <p className="text-sm text-muted-foreground">
                  I hereby declare that the information provided in this incident report is true, accurate, and complete to the best of my knowledge. I understand that submitting false information may result in disciplinary action.
                </p>
                <p className="text-sm text-muted-foreground">
                  I acknowledge that MCMC may contact me for additional information and that this report will be locked from further editing upon submission.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 border border-primary/30 rounded-lg">
                <Checkbox id="declaration" checked={declaration} onCheckedChange={(c) => setDeclaration(c as boolean)} className="mt-1" />
                <Label htmlFor="declaration" className="cursor-pointer text-sm leading-relaxed">I have read and agree to the declaration above. *</Label>
              </div>

              {/* Summary */}
              <div className="p-4 border border-border rounded-lg bg-muted/30">
                <h4 className="font-medium mb-3 text-sm">Incident Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Title:</span><span className="font-medium truncate ml-4">{incidentTitle || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{incidentDate || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Category:</span><span className="font-medium">{category || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location:</span><span className="font-medium">{branchName || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Items:</span><span className="font-medium">{parcelItems.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Violation:</span><span className="font-medium">{violationType || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Attachments:</span><span className="font-medium">{attachments.length} file(s)</span></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />Save Draft
              </Button>
              {currentStep < 6 ? (
                <Button onClick={nextStep} className="glow-cyan">Next<ArrowRight className="ml-2 h-4 w-4" /></Button>
              ) : (
                <Button onClick={handleSubmit} className="glow-cyan" disabled={!declaration}>
                  <Send className="mr-2 h-4 w-4" />Submit Incident
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
