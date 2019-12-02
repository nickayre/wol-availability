import { Member } from './availability';

export const VERTICAL_RESCUE: string[] = [
  'Vertical Rescue (PUASAR004B/PUASAR032A)',
];

export const FLOOD_RESCUE: string[] = [
  'Flood Rescue Boat Operator (FR L2)',
  'Swiftwater Rescue Awareness (FR L1)',
  'Swiftwater Rescue Technician (FR L3)',
];

export const RESCUE: string[] = [...VERTICAL_RESCUE, ...FLOOD_RESCUE];

export const FEATURED = [
  'Storm and Water Damage Operation',
  'Land Search Team Member',
  'Chainsaw Operator (Cross-Cut & Limb)',
  'Chainsaw Operator (Tree Felling)',
  'Swiftwater Rescue Awareness (FR L1)',
  'Flood Rescue Boat Operator (FR L2)',
  'Swiftwater Rescue Technician (FR L3)',
  'Vertical Rescue (PUASAR004B/PUASAR032A)',
  'IMT Member',
  'Incident Controller',
  'Key holder',
];

export function isMemberRescue(member: Member) {
  if (!member.qualifications) {
    return false;
  }

  return member.qualifications.some(qual => RESCUE.includes(qual));
}
