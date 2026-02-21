export interface ParcelItem {
  trackingNumber: string;
  parcelDeclaration: string;
  parcelWeight: string;
  detectedItemType: string;
  senderName: string;
  senderAddress: string;
  senderStateCountry: string;
  senderContact: string;
  recipientName: string;
  recipientAddress: string;
  recipientStateCountry: string;
  recipientContact: string;
}

export const emptyParcelItem: ParcelItem = {
  trackingNumber: '', parcelDeclaration: '', parcelWeight: '', detectedItemType: '',
  senderName: '', senderAddress: '', senderStateCountry: '', senderContact: '',
  recipientName: '', recipientAddress: '', recipientStateCountry: '', recipientContact: '',
};

export interface StaffDetected {
  name: string;
  designation: string;
  contactNumber: string;
  email: string;
}

export interface IncidentFormData {
  // Section A
  companyName: string;
  licenseNumber: string;
  registeredAddress: string;
  reporterName: string;
  designation: string;
  officialEmail: string;
  contactNumber: string;

  // Section B
  incidentType: string;

  // Section C
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentBranch: string;
  description: string;
  systemServiceAffected: string;
  staffDetected: StaffDetected;

  // Section D
  parcelItems: ParcelItem[];

  // Section E
  impactAssessment: string[];

  // Section F
  immediateActions: string;
  incidentStatus: string;
  reportedToAuthorities: string;
  authorityAgency: string;
  authorityReference: string;
  parcelHandedOver: string;
  assistanceRequired: string[];
  assistanceOther: string;

  // Section G
  attachments: Array<{ name: string; size: number }>;

  // Section H
  declaration: boolean;
}

export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Incident types grouped by category
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

// Incident types that require parcel information section
const parcelRelatedTypes = [
  ...incidentTypeGroups[0].options, // All prohibited postal items
  'Theft or loss of postal items (non-dangerous)',
  'Repeated mail tampering within a facility',
  'Suspicious packages later found non-prohibited (false alarm)',
  'Hold due to Customs inspection',
];

// Non-parcel types (cyber, fire, sabotage, infrastructure)
const nonParcelTypes = [
  'Data leakage or cyber incidents affecting postal security systems',
  'Sabotage or large-scale damage to postal infrastructure',
  'Gas leaks, fires, or major accidents affecting worker safety',
  'Significant disruption to postal operations (major hub shutdown)',
  'Disruption to postal operations (system outage)',
  'Floods or natural disasters causing partial disruption',
];

export function isParcelRelated(incidentType: string): boolean {
  if (!incidentType) return true; // Show by default if nothing selected
  if (nonParcelTypes.includes(incidentType)) return false;
  if (parcelRelatedTypes.includes(incidentType)) return true;
  // Default: show for ambiguous types
  return true;
}

export function getAutoCategory(incidentType: string): string {
  for (const group of incidentTypeGroups) {
    if (group.options.includes(incidentType)) {
      return group.label;
    }
  }
  return '';
}
