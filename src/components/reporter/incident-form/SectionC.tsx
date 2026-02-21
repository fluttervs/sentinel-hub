import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IncidentFormData, StaffDetected } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function SectionC({ data, onChange }: Props) {
  const updateStaff = (field: keyof StaffDetected, value: string) => {
    onChange('staffDetected', { ...data.staffDetected, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date of Incident *</Label>
          <Input type="date" value={data.incidentDate} onChange={(e) => onChange('incidentDate', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Time of Incident *</Label>
          <Input type="time" value={data.incidentTime} onChange={(e) => onChange('incidentTime', e.target.value)} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Incident Location (Full Address) *</Label>
          <Textarea value={data.incidentLocation} onChange={(e) => onChange('incidentLocation', e.target.value)} placeholder="Full address of the incident location" rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Branch / Hub Name *</Label>
          <Input value={data.incidentBranch} onChange={(e) => onChange('incidentBranch', e.target.value)} placeholder="e.g. KL Main Distribution Center" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Detailed Description of Incident *</Label>
        <Textarea value={data.description} onChange={(e) => onChange('description', e.target.value)} placeholder="Provide a detailed description of what happened..." rows={5} />
      </div>
      <div className="space-y-2">
        <Label>System / Service Affected (if applicable)</Label>
        <Input value={data.systemServiceAffected} onChange={(e) => onChange('systemServiceAffected', e.target.value)} placeholder="e.g. Parcel Tracking System, Sorting Hub Operations" />
      </div>

      {/* Staff who detected incident */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Details of Staff Who Detected Incident</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.staffDetected.name} onChange={(e) => updateStaff('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Designation</Label>
            <Input value={data.staffDetected.designation} onChange={(e) => updateStaff('designation', e.target.value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Contact Number</Label>
            <Input value={data.staffDetected.contactNumber} onChange={(e) => updateStaff('contactNumber', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={data.staffDetected.email} onChange={(e) => updateStaff('email', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
