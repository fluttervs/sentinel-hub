import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const impactOptions = [
  'Operational Disruption',
  'Safety Risk',
  'Legal Risk',
  'Reputational Risk',
  'Financial Impact',
  'No Significant Impact',
];

interface Props {
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function SectionE({ selected, onChange }: Props) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Estimated Impact (Select all that apply) *</Label>
        <p className="text-xs text-muted-foreground">This assessment is for internal review purposes only.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {impactOptions.map((opt) => (
          <div key={opt} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
            <Checkbox
              id={`impact-${opt}`}
              checked={selected.includes(opt)}
              onCheckedChange={() => toggle(opt)}
            />
            <Label htmlFor={`impact-${opt}`} className="cursor-pointer text-sm">{opt}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
