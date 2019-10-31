import { Interval } from 'luxon';

export type StormAvailable = 'AVAILABLE' | 'UNAVAILABLE' | undefined;
export type RescueAvailable = 'IMMEDIATE' | 'SUPPORT' | 'UNAVAILABLE' | undefined;

export interface Availability {
  interval: Interval;

  storm: StormAvailable;
  rescue: RescueAvailable;

  vehicle?: string;
  note?: string;
}
