import { Role } from '@/lib/auth';
import { getRoleConfig } from '@/lib/roleConfig';
import { cn } from '@/lib/utils';

interface RoleChipProps {
  role: Role;
  className?: string;
}

export const RoleChip = ({ role, className }: RoleChipProps) => {
  const config = getRoleConfig(role);
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all",
        "border",
        className
      )}
      style={{
        borderColor: config.color,
        color: config.color,
        backgroundColor: `${config.color}15`,
      }}
    >
      {config.name}
    </span>
  );
};
