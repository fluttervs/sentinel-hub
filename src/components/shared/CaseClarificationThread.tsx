import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Paperclip, Send, MessageCircle } from 'lucide-react';

export interface ClarificationMessage {
    id: number;
    from: string;
    role: 'officer' | 'reporter' | 'admin' | 'supervisor' | 'lea';
    timestamp: string;
    message: string;
    status?: string;
    isNew?: boolean;
}

interface CaseClarificationThreadProps {
    messages: ClarificationMessage[];
    replyPlaceholder?: string;
    currentRole?: string;
    /** CSS class for "glow" button variant, e.g. glow-cyan / glow-blue */
    glowClass?: string;
}

/** Roles that are treated as "requester" (left-aligned, neutral border) */
const requesterRoles = new Set<string>(['officer', 'supervisor']);

export default function CaseClarificationThread({
    messages,
    replyPlaceholder = 'Type your response to the clarification request...',
    glowClass = 'glow-cyan',
}: CaseClarificationThreadProps) {
    const [replyText, setReplyText] = useState('');

    const handleSendReply = () => {
        if (replyText.trim()) setReplyText('');
    };

    const hasNewMessages = messages.some((m) => m.isNew);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Clarification Requests
                    {hasNewMessages && (
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Thread history */}
                <div className="space-y-3">
                    {messages.map((msg) =>
                        requesterRoles.has(msg.role) ? (
                            /* Officer / Supervisor message — left-aligned, neutral border */
                            <div key={msg.id} className="p-3 border border-border/40 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-medium">{msg.from} — {msg.timestamp}</p>
                                        {msg.isNew && (
                                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 gap-1">
                                                <MessageCircle className="h-3 w-3" />New
                                            </Badge>
                                        )}
                                    </div>
                                    {msg.status && (
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${msg.status === 'Responded'
                                                    ? 'border-status-closed/50 text-status-closed'
                                                    : 'border-status-rfi/50 text-status-rfi'
                                                }`}
                                        >
                                            {msg.status}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm">{msg.message}</p>
                            </div>
                        ) : (
                            /* Reporter / Admin / LEA response — indented, primary tint */
                            <div key={msg.id} className="p-3 border border-primary/30 rounded-lg bg-primary/5 ml-6">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-xs font-medium text-primary">{msg.from} — {msg.timestamp}</p>
                                    {msg.isNew && (
                                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0 gap-1">
                                            <MessageCircle className="h-3 w-3" />New
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm mt-1">{msg.message}</p>
                            </div>
                        ),
                    )}
                </div>

                {/* Reply input */}
                <div className="border-t border-border pt-4 space-y-3">
                    <Label>Reply</Label>
                    <Textarea
                        placeholder={replyPlaceholder}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                        className="resize-none text-sm"
                    />
                    <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                            <Paperclip className="h-4 w-4 mr-1" /> Attach
                        </Button>
                        <Button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            size="sm"
                            className={glowClass}
                        >
                            <Send className="h-4 w-4 mr-1" /> Reply
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
