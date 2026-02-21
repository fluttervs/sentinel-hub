import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ParcelItem, emptyParcelItem } from './types';

interface Props {
  parcelItems: ParcelItem[];
  onUpdate: (items: ParcelItem[]) => void;
}

export default function SectionD({ parcelItems, onUpdate }: Props) {
  const addItem = () => onUpdate([...parcelItems, { ...emptyParcelItem }]);
  const removeItem = (idx: number) => onUpdate(parcelItems.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof ParcelItem, value: string) => {
    onUpdate(parcelItems.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  return (
    <div className="space-y-4">
      {parcelItems.map((item, idx) => (
        <Card key={idx} className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Parcel {idx + 1}</CardTitle>
              {parcelItems.length > 1 && (
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeItem(idx)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tracking / Consignment Number *</Label>
                <Input value={item.trackingNumber} onChange={(e) => updateItem(idx, 'trackingNumber', e.target.value)} placeholder="EC20250115-12345" />
              </div>
              <div className="space-y-2">
                <Label>Parcel Weight</Label>
                <Input value={item.parcelWeight} onChange={(e) => updateItem(idx, 'parcelWeight', e.target.value)} placeholder="e.g. 2.5 kg" />
              </div>
              <div className="space-y-2">
                <Label>Detected Item Type</Label>
                <Input value={item.detectedItemType} onChange={(e) => updateItem(idx, 'detectedItemType', e.target.value)} placeholder="e.g. Contraband, Suspicious substance" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Parcel Declaration</Label>
              <Textarea value={item.parcelDeclaration} onChange={(e) => updateItem(idx, 'parcelDeclaration', e.target.value)} placeholder="As declared on the parcel..." rows={2} />
            </div>

            {/* Sender */}
            <div className="space-y-3 p-3 border border-border rounded-lg">
              <h5 className="text-sm font-medium">Sender Information</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={item.senderName} onChange={(e) => updateItem(idx, 'senderName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input value={item.senderContact} onChange={(e) => updateItem(idx, 'senderContact', e.target.value)} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={item.senderAddress} onChange={(e) => updateItem(idx, 'senderAddress', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>State / Country</Label>
                  <Input value={item.senderStateCountry} onChange={(e) => updateItem(idx, 'senderStateCountry', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="space-y-3 p-3 border border-border rounded-lg">
              <h5 className="text-sm font-medium">Recipient Information</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={item.recipientName} onChange={(e) => updateItem(idx, 'recipientName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input value={item.recipientContact} onChange={(e) => updateItem(idx, 'recipientContact', e.target.value)} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={item.recipientAddress} onChange={(e) => updateItem(idx, 'recipientAddress', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>State / Country</Label>
                  <Input value={item.recipientStateCountry} onChange={(e) => updateItem(idx, 'recipientStateCountry', e.target.value)} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Parcel
      </Button>
    </div>
  );
}
