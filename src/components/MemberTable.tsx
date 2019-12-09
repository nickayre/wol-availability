import { Availability, Available, Member, RescueAvailable } from '../model/availability';
import { getDayIntervals, getIntervalPosition } from '../model/dates';

import clsx from 'clsx';
import { Interval } from 'luxon';
import React from 'react';
import { isMemberRescue } from '../model/qualifications';

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

const Block: React.FC = () => (
  <div className='block'></div>
);

interface RowProps {
  availabilities: Availability[];
  day: Interval;
  week: Interval;
}

const Row: React.FC<RowProps> = ({ day, week, availabilities }) => {
  // Figure out how many blocks to render.
  const blockCount = 12;

  const blocks = Array.from(new Array(blockCount));

  // The shift start/end doesn't cleanly overlap with week start and ends. Draw some greyed
  // out sections to indicate this.
  const outside: Array<[number, number]> = [];

  if (week.start > day.start) {
    outside.push([0, getIntervalPosition(day, week.start)]);
  }

  if (week.end < day.end) {
    outside.push([getIntervalPosition(day, week.end), 1]);
  }

  return (
    <div className='day'>
      {outside.map(([from, to], index) => {
        const style = {
          left: `${from * 100}%`,
          right: `${(1 - to) * 100}%`,
        };

        return <div key={index} className='outside' style={style} />;
      })}
      <div className='blocks'>
        {blocks.map((block, index) => (
          <Block />
        ))}
      </div>
    </div>
  );
};

interface MemberTableProps {
  member: Member;
  interval: Interval;
}

const MemberTable: React.FC<MemberTableProps> = ({ member, interval }) => {
  const availabilities: Availability[] = [
    {
      interval: Interval.fromISO('2019-11-26T11:00:00/2019-11-28T20:00:00'),
      rescue: 'SUPPORT',
      storm: 'AVAILABLE',
    },
  ];

  const days = getDayIntervals(interval).map(day => ({
    availabilities: availabilities.filter(a => a.interval.overlaps(interval)),
    day,
    week: interval,
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
        {days.map((props, index) => (
          <Row key={index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default MemberTable;
