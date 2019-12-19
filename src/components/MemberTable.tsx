import { Availability, Available, Member, RescueAvailable } from '../model/availability';
import { getDayIntervals, getIntervalPosition } from '../model/dates';

import clsx from 'clsx';
import { Interval } from 'luxon';
import React, { useState } from 'react';
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

interface RowProps {
  member: Member;
  availabilities: Availability[];
  day: Interval;
  week: Interval;
  selections: Interval[];
  onSelect: (interval: Interval) => void;
}

const Row: React.FC<RowProps> = ({ member, day, week, availabilities, selections, onSelect }) => {
  // Figure out how many blocks to render.
  const blockCount = 12;
  const blocks = day.divideEqually(blockCount);

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
      <div className='day-date'>
        <span className='text-muted'>{day.start.toFormat('ccc')}</span>
        <span className='h5'>{day.start.toFormat('d')}</span>
      </div>
      <div className='day-body'>
        {outside.map(([from, to], index) => {
          const style = {
            left: `${from * 100}%`,
            right: `${(1 - to) * 100}%`,
          };

          return <div key={index} className='outside' style={style} />;
        })}
        <div className='blocks'>
          {blocks.map((block, index) => (
            <div key={index} className='block' />
          ))}
        </div>
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
      interval: Interval.fromISO('2019-12-10T11:00:00/2019-12-14T20:00:00'),
      rescue: 'SUPPORT',
      storm: 'AVAILABLE',
    },
  ];

  const [selections, setSeleections] = useState<Interval[]>([]);

  const handleSelect = (selected: Interval) => {
    setSeleections([selected, ...selections]);
  };

  const days = getDayIntervals(interval).map(day => ({
    availabilities: availabilities.filter(a => a.interval.overlaps(interval)),
    day,
    week: interval,
  }));

  return (
    <div className='member-table'>
      {days.map((props, index) => (
        <Row
          key={index}
          member={member}
          selections={selections.filter(s => s.overlaps(props.day))}
          onSelect={handleSelect}
          {...props}
        />
      ))}
    </div>
  );
};

export default MemberTable;
