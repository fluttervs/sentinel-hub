import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LicenseeAdminTesting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Testing</h1>
        <p className="text-muted-foreground">Testing workspace</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is the Testing page. Content coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
