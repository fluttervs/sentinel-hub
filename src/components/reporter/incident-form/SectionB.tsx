import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncidentFormData, incidentTypeGroups, getAutoCategory } from './types';
import { AlertTriangle } from 'lucide-react';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: string) => void;
}

export default function SectionB({ data, onChange }: Props) {
  const autoCategory = data.incidentType ? getAutoCategory(data.incidentType) : '';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Incident Type *</Label>
        <Select value={data.incidentType} onValueChange={(v) => onChange('incidentType', v)}>
          <SelectTrigger><SelectValue placeholder="Select incident type" /></SelectTrigger>
          <SelectContent className="max-h-80">
            {incidentTypeGroups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel className="text-xs font-bold uppercase tracking-wide text-muted-foreground px-2 py-1.5">{group.label}</SelectLabel>
                {group.options.map((opt) => (
                  <SelectItem key={opt} value={opt} className="pl-4">{opt}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {autoCategory && (
        <div className="text-sm text-muted-foreground p-3 border border-border rounded-lg bg-muted/30">
          <span className="font-medium">Auto-classified Category:</span> {autoCategory}
          <p className="text-xs mt-1">Severity will be determined by MCMC Case Officer.</p>
        </div>
      )}

      {/* Classification Note */}
      <div className="p-4 border border-primary/30 rounded-lg bg-primary/5 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Classification Note
        </div>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
          <li><strong>Prohibited Postal Items</strong> → Auto-flag as High / Critical, LEA Escalation = Yes</li>
          <li><strong>Serious Threat</strong> → High / Critical, immediate action and escalation</li>
          <li><strong>Medium Severity Incident</strong> → Monitoring, follow-up, or further action; escalation case-by-case</li>
          <li><strong>Operational Issues (Low Severity)</strong> → Routine handling, usually no escalation</li>
        </ul>
        <p className="text-xs text-muted-foreground italic">
          Final severity, case status, and escalation decision remain subject to validation or reclassification by MCMC.
        </p>
      </div>
    </div>
  );
}
