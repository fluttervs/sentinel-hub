import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Upload, CheckCircle2, Clock, AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LEADashboard() {
  const navigate = useNavigate();

  const escalatedCases = [
    { id: 'ESC-2025-001', title: 'Theft of High-Value Consignment', status: 'Under Investigation', escalatedDate: '2025-01-10', agency: 'PDRM' },
    { id: 'ESC-2025-002', title: 'Tampering with Postal Items', status: 'Evidence Seized', escalatedDate: '2025-01-12', agency: 'PDRM' },
    { id: 'ESC-2025-003', title: 'Narcotics via Postal Channel', status: 'Pending Further Information', escalatedDate: '2025-01-14', agency: 'AADK' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">LEA Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, LEA Case Viewer</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/choose-role')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Role
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[hsl(220,70%,50%)]/20 hover:border-[hsl(220,70%,50%)]/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Escalated</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'hsl(220 70% 50%)' }}>8</div>
          </CardContent>
        </Card>

        <Card className="border-role-validator/20 hover:border-role-validator/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-validator">5</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evidence Uploaded</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outcomes Submitted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Escalated Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Escalated Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {escalatedCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-[hsl(220,70%,50%)]/40 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{caseItem.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{caseItem.agency}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-muted-foreground">Ref: {caseItem.id}</p>
                    <p className="text-sm text-muted-foreground">Escalated: {caseItem.escalatedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    caseItem.status === 'Evidence Seized'
                      ? 'bg-destructive/15 text-destructive'
                      : caseItem.status === 'Pending Further Information'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'bg-primary/15 text-primary'
                  }`}>
                    {caseItem.status}
                  </span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
