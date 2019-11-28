import { Interval } from 'luxon';

export interface Member {
  number: number;
  fullName: string;
  surname: string;
  team: string;
  permission?: string;
  qualifications?: string[];
}

type Available = 'AVAILABLE' | 'UNAVAILABLE';
type RescueAvailable = 'IMMEDIATE' | 'SUPPORT' | 'UNAVAILABLE';

export interface Availability {
  interval: Interval;

  storm?: Available;
  rescue?: RescueAvailable;

  note?: string;
  vehicle?: string;
}
