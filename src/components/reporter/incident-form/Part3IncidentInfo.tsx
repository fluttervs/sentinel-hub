import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IncidentFormData, StaffDetected, SenderRecipientInfo, incidentTypeGroups, observedImpactOptions, parcelRelatedTypes } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part3IncidentInfo({ data, onChange }: Props) {
  const updateStaff = (field: keyof StaffDetected, value: string) => {
    onChange('staffDetected', { ...data.staffDetected, [field]: value });
  };

  const updateSender = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('senderInfo', { ...data.senderInfo, [field]: value });
  };

  const updateRecipient = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('recipientInfo', { ...data.recipientInfo, [field]: value });
  };

  const showParcelSection = parcelRelatedTypes.has(data.primaryIncidentType);

  return (
    <div className="space-y-6">
      {/* Primary Incident Type – Single Select, Grouped */}
      <div className="space-y-3">
        <Label>Primary Incident Type *</Label>
        <p className="text-xs text-muted-foreground">Select one that best describes the incident</p>
        <RadioGroup value={data.primaryIncidentType} onValueChange={(v) => onChange('primaryIncidentType', v)}>
          <div className="space-y-4">
            {incidentTypeGroups.map((group) => (
              <div key={group.label} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.label}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {group.options.map((opt) => (
                    <div
                      key={opt}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        data.primaryIncidentType === opt
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/30'
                      }`}
                      onClick={() => onChange('primaryIncidentType', opt)}
                    >
                      <RadioGroupItem value={opt} id={`incident-type-${opt}`} />
                      <Label htmlFor={`incident-type-${opt}`} className="cursor-pointer text-sm flex-1">{opt}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
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

      {/* Observed Impact */}
      <div className="space-y-3">
        <Label>Observed Impact (Reporter Assessment) *</Label>
        <p className="text-xs text-muted-foreground">Severity will be determined by MCMC upon review</p>
        <RadioGroup value={data.observedImpact} onValueChange={(v) => onChange('observedImpact', v)} className="grid md:grid-cols-2 gap-2">
          {observedImpactOptions.map((opt) => (
            <div
              key={opt}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                data.observedImpact === opt
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted/30'
              }`}
              onClick={() => onChange('observedImpact', opt)}
            >
              <RadioGroupItem value={opt} id={`impact-${opt}`} />
              <Label htmlFor={`impact-${opt}`} className="cursor-pointer text-sm">{opt}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Parcel Information — conditionally visible */}
      {showParcelSection && (
        <>
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
        </>
      )}

      {/* Other Related Information */}
      <div className="space-y-2">
        <Label>Other Related Information</Label>
        <Textarea value={data.otherRelatedInfo} onChange={(e) => onChange('otherRelatedInfo', e.target.value)} placeholder="Any additional relevant information..." rows={3} />
      </div>
    </div>
  );
}
