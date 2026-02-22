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

  // Part 2: Incident Classification (kept as-is)
  incidentType: string;

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

// Incident types grouped by category (for Part 2 classification)
export const incidentTypeGroups = [
  {
    label: 'PROHIBITED POSTAL ITEMS',
    options: [
      'Gold bullion',
      'Counterfeit or pirated goods',
      'Currency (cash concealed in parcel)',
      'Dangerous, toxic, or flammable materials',
      'Illegal drugs or narcotics',
      'Firearms, weapons, ammunition (including replicas)',
      'Bearer negotiable instruments',
      'Pornographic materials',
      'Wildlife or exotic animals',
      'Items prohibited under Federal, State, or local laws',
    ],
  },
  {
    label: 'SERIOUS THREAT',
    options: [
      'Explosives, biological or chemical threats, venomous wildlife',
      'Data leakage or cyber incidents affecting postal security systems',
      'Sabotage or large-scale damage to postal infrastructure',
      'Criminal activities within postal hubs',
      'Gas leaks, fires, or major accidents affecting worker safety',
      'Significant disruption to postal operations (major hub shutdown)',
    ],
  },
  {
    label: 'MEDIUM SEVERITY INCIDENT',
    options: [
      'Scam or fraud cases involving postal services',
      'Theft or loss of postal items (non-dangerous)',
      'Repeated mail tampering within a facility',
      'Disruption to postal operations (system outage)',
      'Floods or natural disasters causing partial disruption',
      'Suspicious packages later found non-prohibited (false alarm)',
      'Non-compliance with postal security procedures',
      'Data access incidents with limited impact',
    ],
  },
  {
    label: 'OPERATIONAL ISSUES (LOW)',
    options: [
      'Hold due to Customs inspection',
      'Minor delivery delays',
      'Documentation or declaration errors',
      'Isolated procedural lapses',
      'Customer complaints (non-security)',
      'Administrative issues',
      'Minor system or process issues',
    ],
  },
];

export function getAutoCategory(incidentType: string): string {
  for (const group of incidentTypeGroups) {
    if (group.options.includes(incidentType)) {
      return group.label;
    }
  }
  return '';
}

export const emptySenderRecipient: SenderRecipientInfo = {
  name: '', address: '', stateCountry: '', contact: '',
};
