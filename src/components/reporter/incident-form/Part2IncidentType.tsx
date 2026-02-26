import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IncidentFormData, incidentTypeGroups } from './types';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part2IncidentType({ data, onChange }: Props) {
  const isOtherSelected = data.primaryIncidentType.startsWith('Other');

  const handleSelect = (value: string) => {
    onChange('primaryIncidentType', value);
    if (!value.startsWith('Other')) onChange('otherRelatedInfo', '');
  };

  return (
    <div className="space-y-8">
      <div>
        <Label className="text-base font-semibold">Primary Incident Type *</Label>
        <p className="text-xs text-muted-foreground mt-1">Select one that best describes the incident</p>
      </div>

      {incidentTypeGroups.map((group) => (
        <div key={group.label} className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{group.label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {group.options.map((opt) => {
              const selected = data.primaryIncidentType === opt;
              const isOtherOption = opt.startsWith('Other');
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`text-left p-3 border rounded-lg text-sm transition-colors ${
                    selected
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:bg-muted/30'
                  }`}
                >
                  {isOtherOption ? 'Other' : opt}
                </button>
              );
            })}
          </div>
          {/* Show text input if "Other" within this group is selected */}
          {group.options.some((o) => o.startsWith('Other') && data.primaryIncidentType === o) && (
            <div className="space-y-2 pt-2">
              <Label>Please specify the incident type *</Label>
              <Input
                value={data.otherRelatedInfo}
                onChange={(e) => onChange('otherRelatedInfo', e.target.value)}
                placeholder="Describe the incident type..."
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
