import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  attachments: Array<{ name: string; size: number }>;
  onChange: (attachments: Array<{ name: string; size: number }>) => void;
  linkDescription: string;
  onLinkDescriptionChange: (value: string) => void;
}

export default function SectionG({ attachments, onChange, linkDescription, onLinkDescriptionChange }: Props) {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size <= 10 * 1024 * 1024);
    if (valid.length < files.length) toast({ title: 'Some files exceed 10MB limit', variant: 'destructive' });
    onChange([...attachments, ...valid.map((f) => ({ name: f.name, size: f.size }))]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload supporting documents such as Photos, Internal Reports, System Logs, Police Reports, Video Evidence, or Other Documents.
      </p>
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <Label htmlFor="fileUpload" className="cursor-pointer">
          <span className="text-primary hover:underline">Click to upload</span> or drag and drop
        </Label>
        <p className="text-xs text-muted-foreground mt-2">JPG, PNG, PDF, DOC, XLS, MP4 — Max 10MB per file</p>
        <Input id="fileUpload" type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.mp4,.avi" className="hidden" onChange={handleFileUpload} />
      </div>
      {attachments.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files ({attachments.length})</Label>
          {attachments.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onChange(attachments.filter((_, j) => j !== i))}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Link or Description */}
      <div className="space-y-2">
        <Label>Link or Description</Label>
        <Textarea
          value={linkDescription}
          onChange={(e) => onLinkDescriptionChange(e.target.value)}
          placeholder="Provide a URL link to external evidence or a description of supporting documents..."
          rows={3}
        />
      </div>
    </div>
  );
}
