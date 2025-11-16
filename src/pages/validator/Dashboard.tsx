import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertTriangle, FileText, XCircle, BarChart3 } from 'lucide-react';

export default function ValidatorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Validator Dashboard</h1>
        <p className="text-muted-foreground">MCMC Validator / Approver workspace</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-role-validator/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">9</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready To Close</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">5</div>
            <p className="text-xs text-muted-foreground mt-1">Completed investigations</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Severity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">4</div>
            <p className="text-xs text-muted-foreground mt-1">Requiring approval</p>
          </CardContent>
        </Card>

        <Card className="border-status-rfi/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Re-opened</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">2</div>
            <p className="text-xs text-muted-foreground mt-1">Cases needing review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'PSIRP-2025-0045', title: 'High-value theft case', severity: 'High', from: 'Investigator A' },
              { id: 'PSIRP-2025-0043', title: 'Dangerous goods incident', severity: 'Critical', from: 'Investigator B' },
              { id: 'PSIRP-2025-0041', title: 'Package tampering report', severity: 'Medium', from: 'Reviewer C' },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between p-3 border border-border/40 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.id}</p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">From: {item.from}</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Closure Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-1">PSIRP-2025-0045</p>
              <p className="text-xs text-muted-foreground">
                AI suggests: <span className="text-foreground">Close with advisory</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Risk implication: Medium
              </p>
            </div>
            <div className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
              <p className="text-sm font-medium mb-1">PSIRP-2025-0043</p>
              <p className="text-xs text-muted-foreground">
                AI suggests: <span className="text-foreground">Recommend further investigation</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Risk implication: High
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
          <CardTitle>Severity Distribution (Pending)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Breakdown by severity level
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
