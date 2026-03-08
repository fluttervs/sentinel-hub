import { ProfileInformationCard, ChangePasswordCard } from '@/components/shared/ProfileSecurityCards';

export default function CaseOfficerSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile &amp; Security</h1>
        <p className="text-muted-foreground">Manage your profile and account security</p>
      </div>

      <ProfileInformationCard role="reviewer" iconColor="text-role-reviewer" />
      <ChangePasswordCard idPrefix="rev" iconColor="text-role-reviewer" />
    </div>
  );
}
