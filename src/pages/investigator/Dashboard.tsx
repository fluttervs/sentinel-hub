import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, AlertTriangle, Clock, FileSearch, TrendingUp, Activity } from 'lucide-react';

export default function InvestigatorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Investigator Dashboard</h1>
        <p className="text-muted-foreground">MCMC Investigator workspace</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-role-investigator/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned To Me</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-investigator">7</div>
            <p className="text-xs text-muted-foreground mt-1">Active cases</p>
          </CardContent>
        </Card>

        <Card className="border-status-rfi/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Investigation</CardTitle>
            <FileSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">4</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting findings</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Severity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">Priority cases</p>
          </CardContent>
        </Card>

        <Card className="border-role-validator/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA at Risk</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">2</div>
            <p className="text-xs text-muted-foreground mt-1">Nearing deadline</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'PSIRP-2025-0048', title: 'Lithium battery incident', severity: 'Critical', status: 'In Investigation' },
              { id: 'PSIRP-2025-0046', title: 'Organised theft pattern', severity: 'High', status: 'In Investigation' },
              { id: 'PSIRP-2025-0044', title: 'Package tampering case', severity: 'Medium', status: 'Findings Submitted' },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between p-3 border border-border/40 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.id}</p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Status: {item.status}</p>
                </div>
                <Button size="sm" variant="outline">Open</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Investigation Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-1">Pattern Detection</p>
              <p className="text-xs text-muted-foreground">
                Similar case pattern detected from last month involving Route 5
              </p>
            </div>
            <div className="p-3 border border-role-validator/20 rounded-lg bg-role-validator/5">
              <p className="text-sm font-medium mb-1">Investigation Tip</p>
              <p className="text-xs text-muted-foreground">
                AI suggests checking CCTV footage around 15:00–16:00 for PSIRP-2025-0048
              </p>
            </div>
            <div className="p-3 border border-status-rfi/20 rounded-lg bg-status-rfi/5">
              <p className="text-sm font-medium mb-1">Risk Assessment</p>
              <p className="text-xs text-muted-foreground">
                Risk of repeat incident: Medium
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              * AI insights are for demonstration purposes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investigation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <TrendingUp className="h-16 w-16 text-muted-foreground/30" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Case volume and resolution time trends
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
