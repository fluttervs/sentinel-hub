import { useMemo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

/* ──────── Password Criteria ──────── */

export interface PasswordCriteria {
    label: string;
    met: boolean;
}

export function evaluatePassword(password: string): PasswordCriteria[] {
    return [
        { label: 'At least 8 characters', met: /.{8,}/.test(password) },
        { label: 'At least 1 lowercase letter', met: /[a-z]/.test(password) },
        { label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'At least 1 number', met: /[0-9]/.test(password) },
        { label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(password) },
    ];
}

export function getStrengthMeta(metCount: number) {
    if (metCount <= 1) return { level: 'Weak', color: 'bg-red-500', segments: 1 };
    if (metCount === 2) return { level: 'Fair', color: 'bg-orange-500', segments: 2 };
    if (metCount === 3) return { level: 'Moderate', color: 'bg-yellow-500', segments: 3 };
    if (metCount === 4) return { level: 'Strong', color: 'bg-green-500', segments: 4 };
    return { level: 'Very Strong', color: 'bg-green-500', segments: 5 };
}

/* ──────── Hook ──────── */

export function usePasswordStrength(password: string) {
    return useMemo(() => {
        const criteria = evaluatePassword(password);
        const metCount = criteria.filter((c) => c.met).length;
        const strength = getStrengthMeta(metCount);
        const allMet = metCount === 5;
        return { criteria, metCount, strength, allMet };
    }, [password]);
}

/* ──────── Visual Components ──────── */

interface StrengthBarProps {
    metCount: number;
}

export function PasswordStrengthBar({ metCount }: StrengthBarProps) {
    const totalSegments = 5;
    const { level, color, segments } = getStrengthMeta(metCount);

    return (
        <div className="space-y-1">
            <div
                role="progressbar"
                aria-valuenow={metCount}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-label={`Password strength: ${level}`}
                className="flex gap-1"
            >
                {Array.from({ length: totalSegments }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < segments ? color : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
            {metCount > 0 && (
                <p className="text-xs text-muted-foreground">
                    Strength: <span className="font-medium">{level}</span>
                </p>
            )}
        </div>
    );
}

interface RequirementChecklistProps {
    criteria: PasswordCriteria[];
    id: string;
}

export function PasswordRequirementChecklist({ criteria, id }: RequirementChecklistProps) {
    return (
        <ul id={id} className="space-y-1 mt-2" aria-label="Password requirements">
            {criteria.map((rule, idx) => (
                <li
                    key={idx}
                    className={`flex items-center gap-2 text-xs transition-colors duration-200 ${rule.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                        }`}
                >
                    {rule.met ? (
                        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    ) : (
                        <Circle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    )}
                    <span>{rule.label}</span>
                </li>
            ))}
        </ul>
    );
}

/* ──────── Live region (screen‑reader only) ──────── */

interface StrengthAnnouncerProps {
    level: string;
}

export function PasswordStrengthAnnouncer({ level }: StrengthAnnouncerProps) {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
        >
            {level ? `Password strength: ${level}` : ''}
        </div>
    );
}
