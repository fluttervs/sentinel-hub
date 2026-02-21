import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { IncidentFormData, getAutoCategory } from './types';

interface Props {
  data: IncidentFormData;
  declaration: boolean;
  onDeclarationChange: (checked: boolean) => void;
}

export default function SectionH({ data, declaration, onDeclarationChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="p-6 border border-border rounded-lg bg-muted/30 space-y-4">
        <h3 className="font-semibold">Declaration</h3>
        <p className="text-sm text-muted-foreground">
          I hereby declare that the information provided above is true and accurate to the best of my knowledge and understand that this report may be used for regulatory coordination and follow-up actions by the relevant authority.
        </p>
      </div>
      <div className="flex items-start gap-3 p-4 border border-primary/30 rounded-lg">
        <Checkbox id="declaration" checked={declaration} onCheckedChange={(c) => onDeclarationChange(c as boolean)} className="mt-1" />
        <Label htmlFor="declaration" className="cursor-pointer text-sm leading-relaxed">I agree to the above declaration. *</Label>
      </div>

      {/* Summary */}
      <div className="p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="font-medium mb-3 text-sm">Incident Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Company:</span><span className="font-medium truncate ml-4">{data.companyName || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Reporter:</span><span className="font-medium truncate ml-4">{data.reporterName || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{data.incidentDate || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Incident Type:</span><span className="font-medium truncate ml-4">{data.incidentType || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Category:</span><span className="font-medium">{data.incidentType ? getAutoCategory(data.incidentType) : '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Location:</span><span className="font-medium truncate ml-4">{data.incidentBranch || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Parcels:</span><span className="font-medium">{data.parcelItems.length}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Impact:</span><span className="font-medium truncate ml-4">{data.impactAssessment.join(', ') || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status:</span><span className="font-medium">{data.incidentStatus || '—'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Attachments:</span><span className="font-medium">{data.attachments.length} file(s)</span></div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground p-3 border border-border rounded-lg bg-muted/30">
        <p><strong>Incident ID:</strong> Will be auto-generated upon submission</p>
        <p><strong>Submission Timestamp:</strong> Will be recorded automatically</p>
      </div>
    </div>
  );
}
