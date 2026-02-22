import BasicCaseInfo from '@/components/reporter/incident-details/BasicCaseInfo';
import IncidentDescription from '@/components/reporter/incident-details/IncidentDescription';
import ActionsTaken from '@/components/reporter/incident-details/ActionsTaken';
import SupportingDocuments from '@/components/reporter/incident-details/SupportingDocuments';
import ClassificationNote from '@/components/reporter/incident-details/ClassificationNote';
import { getAutoCategory } from '@/components/reporter/incident-form/types';

export interface CaseData {
  id: string;
  title: string;
  incidentType: string;
  category: string;
  dateReported: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation?: string;
  branchName: string;
  address: string;
  state: string;
  postalCode: string;
  companyName: string;
  registeredAddress?: string;
  reporterName: string;
  reporterDesignation: string;
  reporterEmail?: string;
  reporterPhone?: string;
  faxNumber?: string;
  status: string;
  severity: string;
  leaEscalation: string;
  description: string;
  systemServiceAffected?: string;
  estimatedImpact?: string;
  postalIncidentTypes?: string[];
  staffDetected?: { name: string; designation: string; contactNumber: string; email: string };
  senderInfo?: { name: string; address: string; stateCountry: string; contact: string };
  recipientInfo?: { name: string; address: string; stateCountry: string; contact: string };
  trackingNumber?: string;
  packageDeclaration?: string;
  packageWeight?: string;
  prohibitedItemType?: string;
  otherRelatedInfo?: string;
  // Legacy parcel items support
  items?: {
    tracking: string;
    type: string;
    declaration: string;
    weight: string;
    detectedItemType: string;
    sender: { name: string; address: string; stateCountry: string; contact: string };
    receiver: { name: string; address: string; stateCountry: string; contact: string };
  }[];
  immediateActions: string;
  incidentContained?: string;
  incidentControlStatus: string;
  reportedToAuthority: string;
  authorityAgency?: string;
  authorityReference?: string;
  authorityDetails?: string;
  parcelHandedOver: string;
  assistanceRequested: string[];
  documents: { name: string; size: string; uploadedBy: string; uploadDate: string }[];
  // Legacy
  impactIndicators?: string[];
}

const statusColors: Record<string, string> = {
  'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
  'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
  'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30',
  'Escalated': 'bg-destructive/20 text-destructive border-destructive/30',
};

const severityColors: Record<string, string> = {
  'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function getStatusColor(status: string) {
  return statusColors[status] || 'bg-secondary';
}

export function getSeverityColor(severity: string) {
  return severityColors[severity] || 'bg-secondary';
}

interface Props {
  incident: CaseData;
  children?: React.ReactNode;
}

export default function CaseDetailsView({ incident, children }: Props) {
  return (
    <div className="space-y-6">
      {/* Part 1: Reporter Information */}
      <BasicCaseInfo incident={incident} getStatusColor={getStatusColor} getSeverityColor={getSeverityColor} />

      {/* Part 2: Classification Note */}
      <ClassificationNote />

      {/* Part 3: Incident Information */}
      <IncidentDescription incident={incident} />

      {/* Part 4: Actions Taken */}
      <ActionsTaken incident={incident} />

      {/* Part 5: Supporting Documents */}
      <SupportingDocuments documents={incident.documents} />

      {children}
    </div>
  );
}

export { getAutoCategory };
