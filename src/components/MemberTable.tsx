import { Availability, Available, Member, RescueAvailable } from '../model/availability';
import { getDayIntervals, getIntervalPosition } from '../model/dates';

import clsx from 'clsx';
import { Interval } from 'luxon';
import React from 'react';
import { isMemberRescue } from '../model/qualifications';

interface MemberTableProps {
  member: Member;
  interval: Interval;
}

/**
 * Gets the colour of the availability.
 */
function getAvailabilityClassName(member: Member, availability: Availability): string | null {
  if (!isMemberRescue(member)) {
    if (availability.storm === 'AVAILABLE') {
      return 'available';
    } else if (availability.storm === 'UNAVAILABLE') {
      return 'unavailable';
    }
  } else {
    if (availability.storm === 'AVAILABLE' && availability.rescue === 'IMMEDIATE') {
      return 'available';
    } else if (availability.storm === 'AVAILABLE' && availability.rescue === 'SUPPORT') {
      return 'support';
    } else if (availability.storm === 'UNAVAILABLE' && availability.rescue === 'UNAVAILABLE') {
      return 'unavailable';
    }
  }

  return null;
}

interface AvailableProps {
  available: Available | RescueAvailable;
}

const AvailableIndicator: React.FC<AvailableProps> = ({ available, children }) => {
  return (
    <div className='available-indicator'>
      <span className='indicator' /> {children}
    </div>
  );
};

const MemberTable: React.FC<MemberTableProps> = ({ member, interval }) => {
  const availabilities: Availability[] = [
    {
      interval: Interval.fromISO('2019-11-26T11:00:00/2019-11-28T20:00:00'),
      rescue: 'SUPPORT',
      storm: 'AVAILABLE',
    },
  ];

  const days = getDayIntervals(interval).map(day => ({
    day,
    included: availabilities.filter(a => a.interval.overlaps(interval)),
  }));

  return (
    <div className='member-table'>
      <div className='dates'>
        {days.map(({ day }, index) => (
          <div key={index} className='date'>
            <span className='text-muted'>{day.start.toFormat('ccc')}</span>
            <span className='h5'>{day.start.toFormat('d')}</span>
          </div>
        ))}
      </div>
      <div className='days'>
        {days.map(({ day, included }, index) => (
          <div key={index} className='day'>
            {included.map(availability => {
              const className = clsx(
                'availability', getAvailabilityClassName(member, availability)
              );

              const left = getIntervalPosition(day, availability.interval.start);
              const right = 1 - getIntervalPosition(day, availability.interval.end);
              const style = { left: `${left * 100}%`, right: `${right * 100}%` };

              return (
                <div
                  key={availability.interval.toString()}
                  className={className}
                  style={style}
                >
                  <AvailableIndicator available='AVAILABLE'>Storm and support</AvailableIndicator>
                  <AvailableIndicator available='SUPPORT'>Rescue</AvailableIndicator>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberTable;
