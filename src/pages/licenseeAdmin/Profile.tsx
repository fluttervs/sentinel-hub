import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function LicenseeAdminProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Organisation profile has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/licensee-admin/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">Organisation Profile</h1>
        <p className="text-muted-foreground">Update your organisation information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation Name</Label>
              <Input id="orgName" defaultValue="Express Courier Sdn Bhd" disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenceNo">Licence Number</Label>
              <Input id="licenceNo" defaultValue="PL-2024-001234" disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Cannot be changed</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address *</Label>
            <Textarea
              id="address"
              defaultValue="123 Jalan Utama, Taman Perindustrian, 47100 Puchong, Selangor"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Main Contact Person *</Label>
              <Input id="contact" defaultValue="Ahmad bin Abdullah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone *</Label>
              <Input id="phone" type="tel" defaultValue="+60 3-8023 4567" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email *</Label>
            <Input id="email" type="email" defaultValue="admin@expresscourier.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Operating Hours</Label>
            <Input id="hours" defaultValue="Monday - Friday: 9:00 AM - 6:00 PM" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organisation Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
              <span className="text-xs text-muted-foreground">No logo</span>
            </div>
            <div className="space-y-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <p className="text-xs text-muted-foreground">
                Recommended: PNG or JPG, max 2MB, 400x400px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/licensee-admin/dashboard')}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="glow-purple">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
