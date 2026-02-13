import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const closableCases = [
  { id: 'PSIRP-2025-0040', title: 'Minor packaging damage', officer: 'Lee Wei', severity: 'Low', status: 'Under Review', days: 10 },
  { id: 'PSIRP-2025-0038', title: 'Delayed delivery complaint', officer: 'Nurul Hana', severity: 'Low', status: 'Recommendation for Closure', days: 12 },
  { id: 'PSIRP-2025-0035', title: 'Address label tampering', officer: 'Ahmad Razif', severity: 'Medium', status: 'Under Review', days: 15 },
  { id: 'PSIRP-2025-0025', title: 'Contraband detection – Penang hub', officer: 'Farah Amin', severity: 'High', status: 'Escalated', days: 20 },
];

export default function CaseClosure() {
  const { toast } = useToast();
  const [closeDialog, setCloseDialog] = useState<string | null>(null);
  const [outcome, setOutcome] = useState('');
  const [summary, setSummary] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Case Closure</h1>
        <p className="text-muted-foreground">Close cases after investigation completion – Supervisor authority only</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Open</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closableCases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.officer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={c.severity === 'High' ? 'border-status-in-review/50 text-status-in-review' : 'border-muted-foreground/50 text-muted-foreground'}>
                      {c.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={c.status === 'Recommendation for Closure' ? 'border-status-closed/50 text-status-closed' : 'border-status-in-review/50 text-status-in-review'}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.days}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => setCloseDialog(c.id)}>
                      <Lock className="h-4 w-4 mr-1" /> Close
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!closeDialog} onOpenChange={() => { setCloseDialog(null); setOutcome(''); setSummary(''); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Close Case – {closeDialog}</DialogTitle>
            <DialogDescription>Select an outcome and provide a closure summary. This action is final and will lock the case from further modification.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Outcome</p>
              <Select value={outcome} onValueChange={setOutcome}>
                <SelectTrigger><SelectValue placeholder="Select closure outcome" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="action-taken">Closed – Action Taken</SelectItem>
                  <SelectItem value="no-further-action">Closed – No Further Action</SelectItem>
                  <SelectItem value="referred-lea">Closed – Referred to LEA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Closure Summary</p>
              <Textarea placeholder="Enter closure summary..." value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[120px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCloseDialog(null); setOutcome(''); setSummary(''); }}>Cancel</Button>
            <Button disabled={!outcome || !summary.trim()} onClick={() => {
              toast({ title: 'Case Closed', description: `${closeDialog} has been closed and locked.` });
              setCloseDialog(null); setOutcome(''); setSummary('');
            }}>
              <CheckCircle className="h-4 w-4 mr-2" /> Confirm Closure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
