import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface TimelineEvent {
    event: string;
    actor: string;
    time: string;
    type: 'submission' | 'system' | 'rfi' | 'response' | 'update' | 'escalation';
}

const dotColorMap: Record<string, string> = {
    submission: 'bg-primary',
    system: 'bg-muted-foreground',
    rfi: 'bg-status-rfi',
    response: 'bg-status-closed',
    update: 'bg-status-in-review',
    escalation: 'bg-destructive',
};

interface CaseTimelineProps {
    events: TimelineEvent[];
}

export default function CaseTimeline({ events }: CaseTimelineProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-0">
                    {events.map((item, index) => (
                        <div key={index} className="flex gap-4 pb-4 last:pb-0">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`h-3 w-3 rounded-full border-2 mt-1 ${dotColorMap[item.type] || 'bg-primary'}`}
                                />
                                {index < events.length - 1 && (
                                    <div className="w-px flex-1 bg-border mt-1" />
                                )}
                            </div>
                            <div className="pb-4">
                                <p className="text-xs text-muted-foreground">
                                    {item.time} — <span className="font-medium text-foreground">{item.actor}</span>
                                </p>
                                <p className="text-sm mt-0.5">{item.event}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
