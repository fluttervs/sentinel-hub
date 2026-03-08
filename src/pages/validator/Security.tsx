import { ProfileInformationCard, ChangePasswordCard } from '@/components/shared/ProfileSecurityCards';

export default function SupervisorSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile &amp; Security</h1>
        <p className="text-muted-foreground">Manage your profile and account security</p>
      </div>

      <ProfileInformationCard role="validator" iconColor="text-role-validator" />
      <ChangePasswordCard idPrefix="val" iconColor="text-role-validator" />
    </div>
  );
}
