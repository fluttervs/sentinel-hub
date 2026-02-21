import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface ParcelItem {
  tracking: string;
  type: string;
  declaration: string;
  weight: string;
  detectedItemType: string;
  sender: { name: string; address: string; stateCountry: string; contact: string };
  receiver: { name: string; address: string; stateCountry: string; contact: string };
}

interface Props {
  items: ParcelItem[];
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function ParcelInformation({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Parcel Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 border border-border rounded-lg space-y-4">
            {items.length > 1 && <p className="text-xs font-semibold text-primary">Parcel {i + 1}</p>}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Tracking / Consignment Number" value={item.tracking} />
              <Field label="Parcel Declaration" value={item.declaration} />
              <Field label="Parcel Weight" value={item.weight} />
              <Field label="Detected Item Type" value={item.detectedItemType} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Sender Information</p>
                <Field label="Name" value={item.sender.name} />
                <Field label="Address" value={item.sender.address} />
                <Field label="State / Country" value={item.sender.stateCountry} />
                <Field label="Contact" value={item.sender.contact} />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Recipient Information</p>
                <Field label="Name" value={item.receiver.name} />
                <Field label="Address" value={item.receiver.address} />
                <Field label="State / Country" value={item.receiver.stateCountry} />
                <Field label="Contact" value={item.receiver.contact} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
