import { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { IncidentFormData, incidentTypeGroups, getAutoCategory } from './types';
import { AlertTriangle, Search, CheckCircle2, X } from 'lucide-react';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: string) => void;
}

const categoryColors: Record<string, string> = {
  'PROHIBITED POSTAL ITEMS': 'bg-destructive/10 text-destructive border-destructive/30',
  'SERIOUS THREAT': 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
  'MEDIUM SEVERITY INCIDENT': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
  'OPERATIONAL ISSUES (LOW)': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
};

export default function SectionB({ data, onChange }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const autoCategory = data.incidentType ? getAutoCategory(data.incidentType) : '';

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: { type: string; category: string }[] = [];
    for (const group of incidentTypeGroups) {
      for (const opt of group.options) {
        if (opt.toLowerCase().includes(q) || group.label.toLowerCase().includes(q)) {
          results.push({ type: opt, category: group.label });
        }
      }
    }
    return results;
  }, [searchQuery]);

  const handleSelect = (type: string) => {
    onChange('incidentType', type);
    setSearchQuery('');
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('incidentType', '');
    setSearchQuery('');
  };

  return (
    <div className="space-y-5">
      {/* Selected Display */}
      {data.incidentType ? (
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-status-closed" />
              <span className="font-semibold text-sm">Selected Incident Type</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClear} className="h-7 px-2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4 mr-1" />Change
            </Button>
          </div>
          <p className="text-sm">{data.incidentType}</p>
          {autoCategory && (
            <Badge variant="outline" className={categoryColors[autoCategory] || ''}>
              {autoCategory}
            </Badge>
          )}
        </div>
      ) : (
        <>
          {/* Search Field */}
          <div className="space-y-2 relative">
            <Label>Search or describe the incident type *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Type keywords like drugs, fire, cash, delay, fraud, system outage…"
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Suggestions Dropdown */}
            {isFocused && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 border border-border rounded-lg bg-popover shadow-lg max-h-64 overflow-y-auto">
                {suggestions.map((s) => (
                  <button
                    key={s.type}
                    type="button"
                    onMouseDown={() => handleSelect(s.type)}
                    className="w-full text-left px-4 py-3 hover:bg-accent flex items-center justify-between gap-3 border-b border-border last:border-b-0 transition-colors"
                  >
                    <span className="text-sm">{s.type}</span>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${categoryColors[s.category] || ''}`}>
                      {s.category}
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {isFocused && searchQuery.trim() && suggestions.length === 0 && (
              <div className="absolute z-50 w-full mt-1 border border-border rounded-lg bg-popover shadow-lg p-4 text-center text-sm text-muted-foreground">
                No matching incident types found. Browse categories below.
              </div>
            )}
          </div>

          {/* Accordion Fallback */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Or browse by category</Label>
            <Accordion type="single" collapsible className="border border-border rounded-lg overflow-hidden">
              {incidentTypeGroups.map((group) => (
                <AccordionItem key={group.label} value={group.label} className="border-b border-border last:border-b-0">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[10px] ${categoryColors[group.label] || ''}`}>
                        {group.options.length}
                      </Badge>
                      <span className="text-sm font-semibold">{group.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="space-y-0.5">
                      {group.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelect(opt)}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-md hover:bg-accent transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      )}

      {/* Auto-category info */}
      {autoCategory && (
        <div className="text-sm text-muted-foreground p-3 border border-border rounded-lg bg-muted/30">
          <span className="font-medium">Auto-classified Category:</span> {autoCategory}
          <p className="text-xs mt-1">Severity will be determined by MCMC Case Officer.</p>
        </div>
      )}

      {/* Classification Note */}
      <div className="p-4 border border-primary/30 rounded-lg bg-primary/5 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Classification Note
        </div>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
          <li><strong>Prohibited Postal Items</strong> → Auto-flag as High / Critical, LEA Escalation = Yes</li>
          <li><strong>Serious Threat</strong> → High / Critical, immediate action and escalation</li>
          <li><strong>Medium Severity Incident</strong> → Monitoring, follow-up, or further action; escalation case-by-case</li>
          <li><strong>Operational Issues (Low Severity)</strong> → Routine handling, usually no escalation</li>
        </ul>
        <p className="text-xs text-muted-foreground italic">
          Final severity, case status, and escalation decision remain subject to validation or reclassification by MCMC.
        </p>
      </div>
    </div>
  );
}
