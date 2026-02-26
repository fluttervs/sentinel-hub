import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IncidentFormData, simplifiedIncidentTypes } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part2IncidentType({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Primary Incident Type *</Label>
        <p className="text-xs text-muted-foreground">Select the category that best describes the incident</p>
        <RadioGroup value={data.primaryIncidentType} onValueChange={(v) => onChange('primaryIncidentType', v)}>
          <div className="space-y-2">
            {simplifiedIncidentTypes.map((opt) => (
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
        </RadioGroup>
      </div>

      {data.primaryIncidentType === 'Others' && (
        <div className="space-y-2">
          <Label>Please specify *</Label>
          <Input
            value={data.otherRelatedInfo}
            onChange={(e) => onChange('otherRelatedInfo', e.target.value)}
            placeholder="Describe the incident type..."
          />
        </div>
      )}
    </div>
  );
}
