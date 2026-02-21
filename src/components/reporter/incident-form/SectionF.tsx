import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncidentFormData } from './types';

const assistanceOptions = [
  'Investigation Support',
  'Parcel Inspection',
  'Legal Advice',
  'Service Recovery Guidance',
  'Other',
];

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function SectionF({ data, onChange }: Props) {
  const toggleAssistance = (value: string) => {
    const current = data.assistanceRequired;
    if (current.includes(value)) {
      onChange('assistanceRequired', current.filter((v) => v !== value));
    } else {
      onChange('assistanceRequired', [...current, value]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Immediate Actions Taken *</Label>
        <Textarea value={data.immediateActions} onChange={(e) => onChange('immediateActions', e.target.value)} placeholder="Describe the immediate actions taken in response to the incident..." rows={4} />
      </div>

      <div className="space-y-2">
        <Label>Incident Status *</Label>
        <Select value={data.incidentStatus} onValueChange={(v) => onChange('incidentStatus', v)}>
          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="contained">Contained</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="under-monitoring">Under Monitoring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Has the incident been reported to authorities? *</Label>
        <Select value={data.reportedToAuthorities} onValueChange={(v) => onChange('reportedToAuthorities', v)}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.reportedToAuthorities === 'yes' && (
        <div className="grid md:grid-cols-2 gap-4 p-3 border border-border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <Label>Agency Name</Label>
            <Input value={data.authorityAgency} onChange={(e) => onChange('authorityAgency', e.target.value)} placeholder="e.g. PDRM" />
          </div>
          <div className="space-y-2">
            <Label>Report Reference Number</Label>
            <Input value={data.authorityReference} onChange={(e) => onChange('authorityReference', e.target.value)} placeholder="e.g. RPT-2025-001" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Has the parcel been handed over to authorities?</Label>
        <Select value={data.parcelHandedOver} onValueChange={(v) => onChange('parcelHandedOver', v)}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Assistance Required from Regulator</Label>
        <div className="grid md:grid-cols-2 gap-3">
          {assistanceOptions.map((opt) => (
            <div key={opt} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <Checkbox
                id={`assist-${opt}`}
                checked={data.assistanceRequired.includes(opt)}
                onCheckedChange={() => toggleAssistance(opt)}
              />
              <Label htmlFor={`assist-${opt}`} className="cursor-pointer text-sm">{opt}</Label>
            </div>
          ))}
        </div>
      </div>

      {data.assistanceRequired.includes('Other') && (
        <div className="space-y-2">
          <Label>Please specify</Label>
          <Input value={data.assistanceOther} onChange={(e) => onChange('assistanceOther', e.target.value)} placeholder="Describe the assistance needed..." />
        </div>
      )}
    </div>
  );
}
