import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IncidentFormData } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: string) => void;
}

export default function SectionA({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input value={data.companyName} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>License Number</Label>
          <Input value={data.licenseNumber} disabled className="bg-muted" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Registered Company Address</Label>
        <Input value={data.registeredAddress} disabled className="bg-muted" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Reporter Name</Label>
          <Input value={data.reporterName} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>Designation / Role</Label>
          <Input value={data.designation} onChange={(e) => onChange('designation', e.target.value)} placeholder="e.g. Security Officer" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Official Email Address</Label>
          <Input value={data.officialEmail} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>Contact Number</Label>
          <Input value={data.contactNumber} disabled className="bg-muted" />
        </div>
      </div>
    </div>
  );
}
