import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileBarChart, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const caseSummary = [
  { id: 'PSIRP-2025-0028', status: 'Under Review', severity: 'Critical', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015', sla: 'At Risk' },
  { id: 'PSIRP-2025-0027', status: 'Pending Review', severity: 'High', organisation: 'Swift Logistics Sdn Bhd', officer: 'CO-2024-015', sla: 'On Track' },
  { id: 'PSIRP-2025-0026', status: 'Clarification Requested', severity: 'High', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015', sla: 'On Track' },
  { id: 'PSIRP-2025-0025', status: 'Under Review', severity: 'Medium', organisation: 'Fast Delivery Enterprise', officer: 'CO-2024-015', sla: 'On Track' },
  { id: 'PSIRP-2025-0022', status: 'Escalated', severity: 'Critical', organisation: 'Express Courier Sdn Bhd', officer: 'CO-2024-015', sla: 'Breached' },
  { id: 'PSIRP-2025-0019', status: 'Closed', severity: 'High', organisation: 'Pos Malaysia Berhad', officer: 'CO-2024-015', sla: 'Met' },
];

export default function CaseOfficerReports() {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({ title: `Exporting as ${format}`, description: 'Your report is being generated.' });
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'Clarification Requested': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Escalated': 'bg-destructive/20 text-destructive border-destructive/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[s] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and export case summary reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('PDF')}><Download className="mr-2 h-4 w-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => handleExport('Excel')}><Download className="mr-2 h-4 w-4" />Export Excel</Button>
          <Button variant="outline" onClick={() => handleExport('Print')}><Printer className="mr-2 h-4 w-4" />Print</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-role-reviewer">{caseSummary.length}</p><p className="text-sm text-muted-foreground">Total Cases</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-destructive">{caseSummary.filter((c) => c.severity === 'Critical').length}</p><p className="text-sm text-muted-foreground">Critical</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-status-closed">{caseSummary.filter((c) => c.status === 'Closed').length}</p><p className="text-sm text-muted-foreground">Closed</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-status-in-review">{caseSummary.filter((c) => c.sla === 'Breached').length}</p><p className="text-sm text-muted-foreground">SLA Breached</p></CardContent></Card>
      </div>

      {/* Case Summary Table */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><FileBarChart className="h-5 w-5 text-role-reviewer" />Case Summary Report</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference No</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Officer</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">SLA Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {caseSummary.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-role-reviewer">{c.id}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3">{c.severity}</td>
                    <td className="px-4 py-3">{c.organisation}</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.officer}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={c.sla === 'Breached' ? 'bg-destructive/20 text-destructive border-destructive/30' : c.sla === 'At Risk' ? 'bg-status-in-review/20 text-status-in-review border-status-in-review/30' : 'bg-status-closed/20 text-status-closed border-status-closed/30'}>
                        {c.sla}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
