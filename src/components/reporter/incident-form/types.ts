export interface StaffDetected {
  name: string;
  designation: string;
  contactNumber: string;
  email: string;
}

export interface SenderRecipientInfo {
  name: string;
  address: string;
  stateCountry: string;
  contact: string;
}

export interface IncidentFormData {
  // Part 1: Reporter Information
  companyName: string;
  registeredAddress: string;
  reporterName: string;
  position: string;
  officialEmail: string;
  contactNumber: string;
  faxNumber: string;
  additionalPhone: string;
  alternativeEmail: string;

  // Part 3: Incident Information
  postalIncidentTypes: string[];
  postalIncidentOther: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  staffDetected: StaffDetected;
  systemServiceAffected: string;
  estimatedImpact: string; // Low | Medium | High
  senderInfo: SenderRecipientInfo;
  recipientInfo: SenderRecipientInfo;
  trackingNumber: string;
  packageDeclaration: string;
  packageWeight: string;
  prohibitedItemType: string;
  otherRelatedInfo: string;

  // Part 4: Actions Taken
  immediateActions: string;
  incidentContained: string; // Yes | No | Ongoing
  assistanceRequired: string[];
  assistanceOther: string;
  reportedToAuthorities: string; // Yes | No
  authorityDetails: string;
  parcelHandedOver: string; // Yes | No

  // Part 5: Supporting Documents
  attachments: Array<{ name: string; size: number }>;

  // Part 6: Declaration
  declaration: boolean;
  declarationDate: string;
}

export type Step = 1 | 2 | 3 | 4 | 5;

// Postal security incident type options for Part 3 checkboxes
export const postalIncidentTypeOptions = [
  'Theft or Pilferage',
  'Loss of Postal Item',
  'Tampering / Damage',
  'Suspicious / Prohibited Item Detected',
  'Counterfeit or Pirated Goods',
  'Dangerous / Toxic / Flammable Materials',
  'Illegal Drugs or Narcotics',
  'Firearms / Weapons / Ammunition',
  'Cyber Incident / Data Breach',
  'Infrastructure Damage / Sabotage',
  'Fraud / Scam',
  'Natural Disaster Impact',
  'Operational Disruption',
];


export const emptySenderRecipient: SenderRecipientInfo = {
  name: '', address: '', stateCountry: '', contact: '',
};
