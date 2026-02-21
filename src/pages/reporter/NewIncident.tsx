import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { IncidentFormData, Step, emptyParcelItem, isParcelRelated } from '@/components/reporter/incident-form/types';
import SectionA from '@/components/reporter/incident-form/SectionA';
import SectionB from '@/components/reporter/incident-form/SectionB';
import SectionC from '@/components/reporter/incident-form/SectionC';
import SectionD from '@/components/reporter/incident-form/SectionD';
import SectionE from '@/components/reporter/incident-form/SectionE';
import SectionF from '@/components/reporter/incident-form/SectionF';
import SectionG from '@/components/reporter/incident-form/SectionG';
import SectionH from '@/components/reporter/incident-form/SectionH';

const initialFormData: IncidentFormData = {
  companyName: 'Pos Malaysia Berhad',
  licenseNumber: 'MCMC-L-2024-0012',
  registeredAddress: 'Dayabumi Complex, Jalan Sultan Hishamuddin, 50670 Kuala Lumpur',
  reporterName: 'Ahmad bin Ismail',
  designation: '',
  officialEmail: 'ahmad.ismail@posmalaysia.com.my',
  contactNumber: '+60 12-345 6789',
  incidentType: '',
  incidentDate: '',
  incidentTime: '',
  incidentLocation: '',
  incidentBranch: '',
  description: '',
  systemServiceAffected: '',
  staffDetected: { name: '', designation: '', contactNumber: '', email: '' },
  parcelItems: [{ ...emptyParcelItem }],
  impactAssessment: [],
  immediateActions: '',
  incidentStatus: '',
  reportedToAuthorities: '',
  authorityAgency: '',
  authorityReference: '',
  parcelHandedOver: '',
  assistanceRequired: [],
  assistanceOther: '',
  attachments: [],
  declaration: false,
};

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<IncidentFormData>(initialFormData);
  const [declaration, setDeclaration] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLastSaved(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic steps — skip Section D if incident type is not parcel-related
  const showParcelSection = isParcelRelated(formData.incidentType);

  const allSteps = [
    { number: 1, title: 'A – Reporter Information', short: 'Reporter' },
    { number: 2, title: 'B – Incident Classification', short: 'Classification' },
    { number: 3, title: 'C – Incident Details', short: 'Details' },
    { number: 4, title: 'D – Parcel Information', short: 'Parcel' },
    { number: 5, title: 'E – Impact Assessment', short: 'Impact' },
    { number: 6, title: 'F – Actions Taken', short: 'Actions' },
    { number: 7, title: 'G – Supporting Documents', short: 'Documents' },
    { number: 8, title: 'H – Declaration & Submit', short: 'Submit' },
  ];

  const steps = showParcelSection ? allSteps : allSteps.filter((s) => s.number !== 4);
  const stepNumbers = steps.map((s) => s.number);
  const currentIdx = stepNumbers.indexOf(currentStep);
  const isLastStep = currentIdx === steps.length - 1;
  const isFirstStep = currentIdx === 0;

  const nextStep = () => {
    if (!isLastStep) setCurrentStep(stepNumbers[currentIdx + 1] as Step);
  };
  const prevStep = () => {
    if (!isFirstStep) setCurrentStep(stepNumbers[currentIdx - 1] as Step);
  };

  const updateField = (field: keyof IncidentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    toast({ title: 'Draft Saved', description: 'Your incident report has been saved as a draft.' });
    navigate('/reporter/incidents');
  };

  const handleSubmit = () => {
    if (!declaration) {
      toast({ title: 'Declaration Required', description: 'Please agree to the declaration before submitting.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Incident Submitted', description: 'Reference: PSIRP-2025-0026. Submission timestamp recorded.' });
    navigate('/reporter/incidents/PSIRP-2025-0026');
  };

  const currentStepInfo = steps[currentIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Postal Security Incident Reporting Form</h1>
          <p className="text-muted-foreground">Complete all sections to submit your incident report</p>
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
                      : stepNumbers.indexOf(currentStep) > index
                      ? 'bg-status-closed text-status-closed-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">{step.title}</div>
                  <div className="text-xs mt-2 text-center md:hidden">{step.short}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${stepNumbers.indexOf(currentStep) > index ? 'bg-status-closed' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader><CardTitle>{currentStepInfo?.title}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && <SectionA data={formData} onChange={updateField} />}
          {currentStep === 2 && <SectionB data={formData} onChange={updateField} />}
          {currentStep === 3 && <SectionC data={formData} onChange={updateField} />}
          {currentStep === 4 && <SectionD parcelItems={formData.parcelItems} onUpdate={(items) => updateField('parcelItems', items)} />}
          {currentStep === 5 && <SectionE selected={formData.impactAssessment} onChange={(v) => updateField('impactAssessment', v)} />}
          {currentStep === 6 && <SectionF data={formData} onChange={updateField} />}
          {currentStep === 7 && <SectionG attachments={formData.attachments} onChange={(v) => updateField('attachments', v)} />}
          {currentStep === 8 && <SectionH data={formData} declaration={declaration} onDeclarationChange={setDeclaration} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={isFirstStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />Save Draft
              </Button>
              {!isLastStep ? (
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
