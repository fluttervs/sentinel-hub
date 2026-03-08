import * as React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, 'type'>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [visible, setVisible] = useState(false);

        return (
            <div className="relative">
                <Input
                    type={visible ? 'text' : 'password'}
                    className={cn('pr-10', className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    onClick={() => setVisible((v) => !v)}
                    className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                    {visible ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                </button>
            </div>
        );
    },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
