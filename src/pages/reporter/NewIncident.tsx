import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewIncident() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Incident Report</h1>
          <p className="text-muted-foreground">Complete the form to submit a new incident</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Multi-step incident wizard coming soon
            </p>
            <Button onClick={() => navigate('/reporter/incidents')} variant="outline">
              Return to Incidents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
