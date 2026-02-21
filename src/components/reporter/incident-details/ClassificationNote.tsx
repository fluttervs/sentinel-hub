import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function ClassificationNote() {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="text-xs text-muted-foreground leading-relaxed space-y-1">
        <p className="font-semibold text-foreground mb-1">Classification Note</p>
        <p><span className="font-medium text-foreground">Prohibited Postal Items</span> → Auto-flag as High / Critical, LEA Escalation = Yes</p>
        <p><span className="font-medium text-foreground">Serious Threat</span> → High / Critical, immediate action and escalation</p>
        <p><span className="font-medium text-foreground">Medium Severity Incident</span> → Monitoring, follow-up, or further action; escalation case-by-case</p>
        <p><span className="font-medium text-foreground">Operational Issues (Low Severity)</span> → Routine handling, usually no escalation</p>
        <p className="pt-1 italic">Final severity, case status, and escalation decision remain subject to validation or reclassification by MCMC.</p>
      </AlertDescription>
    </Alert>
  );
}
