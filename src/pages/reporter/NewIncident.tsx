import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Save, Send, Upload, X, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/auth';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  organisationName: string;
  licenceNo: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  incidentType: string;
  incidentTitle: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  consignmentId: string;
  partiesInvolved: string;
  estimatedValue?: string;
  policeReportNo?: string;
  description: string;
  immediateActions: string;
  suspectedOffence: string;
  impact: string;
  impactDetails: string;
  severity: string;
  category: string;
  subCategory: string;
  useAiSuggestion: boolean;
  attachments: Array<{ name: string; size: number; type: string }>;
  declaration: boolean;
  digitalSignature: string;
}

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    organisationName: user?.organisationName || 'Express Courier Sdn Bhd',
    licenceNo: 'PL-2024-001234',
    address: '',
    contactPerson: user?.name || '',
    phone: '',
    email: user?.email || '',
    incidentType: '',
    incidentTitle: '',
    incidentDate: '',
    incidentTime: '',
    location: '',
    consignmentId: '',
    partiesInvolved: '',
    description: '',
    immediateActions: '',
    suspectedOffence: '',
    impact: '',
    impactDetails: '',
    severity: '',
    category: '',
    subCategory: '',
    useAiSuggestion: false,
    attachments: [],
    declaration: false,
    digitalSignature: '',
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 15000);
    return () => clearInterval(interval);
  }, [formData]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your incident report has been saved as a draft.",
    });
    navigate('/reporter/incidents');
  };

  const handleSubmit = () => {
    if (!formData.declaration) {
      toast({
        title: "Declaration Required",
        description: "Please agree to the declaration before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Incident Submitted",
      description: "Your incident report has been submitted successfully. Reference: PSIRP-2025-0026",
    });
    navigate('/reporter/incidents/PSIRP-2025-0026');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    updateField('attachments', [...formData.attachments, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    updateField('attachments', formData.attachments.filter((_, i) => i !== index));
  };

  const steps = [
    { number: 1, title: 'Reporter & Organisation', shortTitle: 'Reporter' },
    { number: 2, title: 'Incident Basics', shortTitle: 'Basics' },
    { number: 3, title: 'Description & Impact', shortTitle: 'Description' },
    { number: 4, title: 'Severity & Classification', shortTitle: 'Classification' },
    { number: 5, title: 'Evidence & Attachments', shortTitle: 'Evidence' },
    { number: 6, title: 'Declaration & Submit', shortTitle: 'Submit' },
  ];

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
        {lastSaved && (
          <div className="text-sm text-muted-foreground">
            Auto-saved {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep === step.number
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : currentStep > step.number
                        ? 'bg-status-closed text-status-closed-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">{step.title}</div>
                  <div className="text-xs mt-2 text-center md:hidden">{step.shortTitle}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${currentStep > step.number ? 'bg-status-closed' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Organisation Name</Label>
                  <Input value={formData.organisationName} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Licence Number</Label>
                  <Input value={formData.licenceNo} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Enter full business address"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => updateField('contactPerson', e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="email@company.com"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="incidentType">Incident Type *</Label>
                <Select value={formData.incidentType} onValueChange={(value) => updateField('incidentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="loss">Loss</SelectItem>
                    <SelectItem value="tampering">Tampering</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="dangerous-goods">Dangerous Goods</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentTitle">Incident Title *</Label>
                <Input
                  id="incidentTitle"
                  value={formData.incidentTitle}
                  onChange={(e) => updateField('incidentTitle', e.target.value)}
                  placeholder="Brief description of the incident"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Incident Date *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => updateField('incidentDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentTime">Incident Time *</Label>
                  <Input
                    id="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => updateField('incidentTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="City, State or specific address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consignmentId">Consignment/Tracking ID *</Label>
                  <Input
                    id="consignmentId"
                    value={formData.consignmentId}
                    onChange={(e) => updateField('consignmentId', e.target.value)}
                    placeholder="Multiple IDs separated by comma"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partiesInvolved">Parties Involved</Label>
                  <Input
                    id="partiesInvolved"
                    value={formData.partiesInvolved}
                    onChange={(e) => updateField('partiesInvolved', e.target.value)}
                    placeholder="Names or references"
                  />
                </div>
              </div>

              {formData.incidentType === 'theft' && (
                <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5 space-y-4">
                  <p className="text-sm font-medium text-destructive">Additional Information Required for Theft</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">Estimated Item Value (RM) *</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        value={formData.estimatedValue || ''}
                        onChange={(e) => updateField('estimatedValue', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policeReportNo">Police Report Number *</Label>
                      <Input
                        id="policeReportNo"
                        value={formData.policeReportNo || ''}
                        onChange={(e) => updateField('policeReportNo', e.target.value)}
                        placeholder="Police report reference"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Incident Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Provide a detailed description of what happened..."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">Be as detailed as possible. Include timeline of events.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="immediateActions">Immediate Actions Taken *</Label>
                <Textarea
                  id="immediateActions"
                  value={formData.immediateActions}
                  onChange={(e) => updateField('immediateActions', e.target.value)}
                  placeholder="What steps were taken immediately after the incident?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suspectedOffence">Suspected Offence</Label>
                <Input
                  id="suspectedOffence"
                  value={formData.suspectedOffence}
                  onChange={(e) => updateField('suspectedOffence', e.target.value)}
                  placeholder="What law or regulation may have been violated?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Impact Type *</Label>
                <Select value={formData.impact} onValueChange={(value) => updateField('impact', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="reputational">Reputational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="impactDetails">Impact Details</Label>
                <Textarea
                  id="impactDetails"
                  value={formData.impactDetails}
                  onChange={(e) => updateField('impactDetails', e.target.value)}
                  placeholder="Describe the impact of this incident..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-primary/30 rounded-lg bg-primary/5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Use AI Suggestion (Demo)</p>
                    <p className="text-xs text-muted-foreground">Let AI analyze and suggest classification</p>
                  </div>
                </div>
                <Switch
                  checked={formData.useAiSuggestion}
                  onCheckedChange={(checked) => updateField('useAiSuggestion', checked)}
                />
              </div>

              {formData.useAiSuggestion && (
                <div className="p-4 border border-role-validator/30 rounded-lg bg-role-validator/5 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-role-validator mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-medium">AI Analysis Results</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Suggested Severity:</span> <Badge variant="destructive">High</Badge></p>
                        <p><span className="text-muted-foreground">Suggested Category:</span> <Badge>Dangerous Goods</Badge></p>
                        <p className="text-xs text-muted-foreground italic">Based on keywords: "lithium battery", "damaged package", "safety risk"</p>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        * AI suggestions are for demonstration purposes only
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select value={formData.severity} onValueChange={(value) => updateField('severity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minor impact, routine handling</SelectItem>
                    <SelectItem value="medium">Medium - Moderate impact, requires attention</SelectItem>
                    <SelectItem value="high">High - Significant impact, urgent attention</SelectItem>
                    <SelectItem value="critical">Critical - Major impact, immediate action required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft & Loss</SelectItem>
                    <SelectItem value="tampering">Tampering & Damage</SelectItem>
                    <SelectItem value="fraud">Fraud & Misrepresentation</SelectItem>
                    <SelectItem value="dangerous">Dangerous Goods</SelectItem>
                    <SelectItem value="operational">Operational Issues</SelectItem>
                    <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub-Category</Label>
                <Select value={formData.subCategory} onValueChange={(value) => updateField('subCategory', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal Theft</SelectItem>
                    <SelectItem value="external">External Theft</SelectItem>
                    <SelectItem value="in-transit">In-Transit Loss</SelectItem>
                    <SelectItem value="warehouse">Warehouse Issue</SelectItem>
                    <SelectItem value="documentation">Documentation Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <Label htmlFor="fileUpload" className="cursor-pointer">
                    <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Supported: Images (JPG, PNG), PDF, DOC, XLS (Max 10MB per file)
                  </p>
                </div>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="p-4 border border-role-validator/30 rounded-lg bg-role-validator/5">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-role-validator mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Please ensure sensitive data is redacted before upload.
                  </p>
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({formData.attachments.length})</Label>
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Upload className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="p-6 border border-border rounded-lg bg-muted/30 space-y-4">
                <h3 className="font-semibold">Declaration</h3>
                <p className="text-sm text-muted-foreground">
                  I hereby declare that the information provided in this incident report is true, accurate, and complete to the best of my knowledge.
                </p>
                <p className="text-sm text-muted-foreground">
                  I acknowledge that MCMC may contact me for additional information.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 border border-primary/30 rounded-lg">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration}
                  onCheckedChange={(checked) => updateField('declaration', checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="declaration" className="cursor-pointer text-sm leading-relaxed">
                  I have read and agree to the declaration above. *
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="digitalSignature">Digital Signature (Optional)</Label>
                <Input
                  id="digitalSignature"
                  value={formData.digitalSignature}
                  onChange={(e) => updateField('digitalSignature', e.target.value)}
                  placeholder="Type your full name"
                />
              </div>

              <div className="p-4 border border-border rounded-lg bg-muted/30">
                <h4 className="font-medium mb-3 text-sm">Incident Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{formData.incidentType || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium truncate ml-4">{formData.incidentTitle || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Severity:</span>
                    <span className="font-medium">{formData.severity || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attachments:</span>
                    <span className="font-medium">{formData.attachments.length} file(s)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>

              {currentStep < 6 ? (
                <Button onClick={nextStep} className="glow-cyan">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="glow-cyan" disabled={!formData.declaration}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Incident
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
