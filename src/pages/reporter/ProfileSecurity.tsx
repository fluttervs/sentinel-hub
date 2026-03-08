import { ProfileInformationCard, ChangePasswordCard } from '@/components/shared/ProfileSecurityCards';

export default function ReporterProfileSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile &amp; Security</h1>
        <p className="text-muted-foreground">Manage your profile and account security</p>
      </div>

      <ProfileInformationCard role="reporter" iconColor="text-primary" />
      <ChangePasswordCard idPrefix="rep" iconColor="text-primary" />
    </div>
  );
}
