import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileBarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reports = [
  { title: 'Case Volume Report', desc: 'Total cases by organisation, severity, and period' },
  { title: 'SLA Compliance Report', desc: 'Compliance rates, breach counts by officer and organisation' },
  { title: 'Escalation Report', desc: 'Escalation statistics, LEA referrals, approval turnaround' },
  { title: 'Incident Type Analysis', desc: 'Category distribution, trends, and anomaly detection' },
  { title: 'Organisation Comparison', desc: 'Cross-organisation risk profiles and benchmarks' },
  { title: 'Officer Performance Report', desc: 'Individual officer metrics, caseload, and efficiency' },
];

export default function InvestigatorReports() {
  const { toast } = useToast();

  const handleExport = (title: string, format: string) => {
    toast({ title: 'Export Started', description: `${title} – ${format} export queued.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Management Reports</h1>
        <p className="text-muted-foreground">Generate and export governance-level reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><FileBarChart className="h-4 w-4" /> {r.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleExport(r.title, 'PDF')}>
                  <Download className="h-4 w-4 mr-1" /> PDF
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleExport(r.title, 'Excel')}>
                  <Download className="h-4 w-4 mr-1" /> Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
