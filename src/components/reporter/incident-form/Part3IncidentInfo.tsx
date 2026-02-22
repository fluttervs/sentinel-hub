import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IncidentFormData, StaffDetected, SenderRecipientInfo, postalIncidentTypeOptions } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part3IncidentInfo({ data, onChange }: Props) {
  const toggleType = (value: string) => {
    const current = data.postalIncidentTypes;
    if (current.includes(value)) {
      onChange('postalIncidentTypes', current.filter((v) => v !== value));
    } else {
      onChange('postalIncidentTypes', [...current, value]);
    }
  };

  const updateStaff = (field: keyof StaffDetected, value: string) => {
    onChange('staffDetected', { ...data.staffDetected, [field]: value });
  };

  const updateSender = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('senderInfo', { ...data.senderInfo, [field]: value });
  };

  const updateRecipient = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('recipientInfo', { ...data.recipientInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Type of Postal Security Incident */}
      <div className="space-y-3">
        <Label>Type of Postal Security Incident *</Label>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
        <div className="grid md:grid-cols-2 gap-3">
          {postalIncidentTypeOptions.map((opt) => (
            <div key={opt} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <Checkbox
                id={`postal-type-${opt}`}
                checked={data.postalIncidentTypes.includes(opt)}
                onCheckedChange={() => toggleType(opt)}
              />
              <Label htmlFor={`postal-type-${opt}`} className="cursor-pointer text-sm">{opt}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2 mt-2">
          <Label>Others (please specify)</Label>
          <Input value={data.postalIncidentOther} onChange={(e) => onChange('postalIncidentOther', e.target.value)} placeholder="Describe other incident type..." />
        </div>
      </div>

      {/* Incident Description */}
      <div className="space-y-2">
        <Label>Incident Description *</Label>
        <Textarea value={data.description} onChange={(e) => onChange('description', e.target.value)} placeholder="Provide a detailed description of the incident..." rows={5} />
      </div>

      {/* Date & Time */}
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

      {/* Incident Location */}
      <div className="space-y-2">
        <Label>Incident Location Address *</Label>
        <Textarea value={data.incidentLocation} onChange={(e) => onChange('incidentLocation', e.target.value)} placeholder="Full address of the incident location" rows={3} />
      </div>

      {/* Staff Detected */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Details of Officer/Staff Who Detected the Incident</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.staffDetected.name} onChange={(e) => updateStaff('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input value={data.staffDetected.designation} onChange={(e) => updateStaff('designation', e.target.value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.staffDetected.contactNumber} onChange={(e) => updateStaff('contactNumber', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={data.staffDetected.email} onChange={(e) => updateStaff('email', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Affected System/Service */}
      <div className="space-y-2">
        <Label>Affected System/Service</Label>
        <Input value={data.systemServiceAffected} onChange={(e) => onChange('systemServiceAffected', e.target.value)} placeholder="e.g. Parcel Tracking System, Sorting Hub Operations" />
      </div>

      {/* Estimated Impact */}
      <div className="space-y-3">
        <Label>Estimated Impact *</Label>
        <RadioGroup value={data.estimatedImpact} onValueChange={(v) => onChange('estimatedImpact', v)} className="flex gap-6">
          {['Low', 'Medium', 'High'].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <RadioGroupItem value={level} id={`impact-${level}`} />
              <Label htmlFor={`impact-${level}`} className="cursor-pointer">{level}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Sender Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Sender Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.senderInfo.name} onChange={(e) => updateSender('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.senderInfo.contact} onChange={(e) => updateSender('contact', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Textarea value={data.senderInfo.address} onChange={(e) => updateSender('address', e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>State / Country</Label>
          <Input value={data.senderInfo.stateCountry} onChange={(e) => updateSender('stateCountry', e.target.value)} />
        </div>
      </div>

      {/* Recipient Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Recipient Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.recipientInfo.name} onChange={(e) => updateRecipient('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.recipientInfo.contact} onChange={(e) => updateRecipient('contact', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Textarea value={data.recipientInfo.address} onChange={(e) => updateRecipient('address', e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>State / Country</Label>
          <Input value={data.recipientInfo.stateCountry} onChange={(e) => updateRecipient('stateCountry', e.target.value)} />
        </div>
      </div>

      {/* Tracking / Package Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tracking / Consignment Number</Label>
          <Input value={data.trackingNumber} onChange={(e) => onChange('trackingNumber', e.target.value)} placeholder="e.g. EC20250115-12345" />
        </div>
        <div className="space-y-2">
          <Label>Package Declaration</Label>
          <Input value={data.packageDeclaration} onChange={(e) => onChange('packageDeclaration', e.target.value)} placeholder="e.g. Electronic goods" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Package Weight (kg)</Label>
          <Input type="number" min="0" step="0.1" value={data.packageWeight} onChange={(e) => onChange('packageWeight', e.target.value)} placeholder="e.g. 2.5" />
        </div>
        <div className="space-y-2">
          <Label>Type of Prohibited Item Detected</Label>
          <Input value={data.prohibitedItemType} onChange={(e) => onChange('prohibitedItemType', e.target.value)} placeholder="e.g. Narcotics, Firearms" />
        </div>
      </div>

      {/* Other Related Information */}
      <div className="space-y-2">
        <Label>Other Related Information</Label>
        <Textarea value={data.otherRelatedInfo} onChange={(e) => onChange('otherRelatedInfo', e.target.value)} placeholder="Any additional relevant information..." rows={3} />
      </div>
    </div>
  );
}
