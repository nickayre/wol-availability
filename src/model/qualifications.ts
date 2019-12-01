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

export function isMemberRescue(member: Member) {
  if (!member.qualifications) {
    return false;
  }

  return member.qualifications.some(qual => RESCUE.includes(qual));
}
