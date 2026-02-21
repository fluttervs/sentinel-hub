import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface Doc {
  name: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

interface Props {
  documents: Doc[];
}

export default function SupportingDocuments({ documents }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporting Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · Uploaded by {doc.uploadedBy} · {doc.uploadDate}</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
