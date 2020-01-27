import { Availability, Available, Member, RescueAvailable } from '../model/availability';
import { getDayIntervals, getIntervalPosition } from '../model/dates';
import { isMemberRescue } from '../model/qualifications';

import clsx from 'clsx';
import { Interval } from 'luxon';
import React, { useState } from 'react';
import Measure, { ContentRect } from 'react-measure';

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
  blockCount: number;
  member: Member;
  availabilities: Availability[];
  day: Interval;
  week: Interval;
  selections: Interval[];
  onClick: (interval: Interval) => void;
}

const Row: React.FC<RowProps> = ({ blockCount, member, day, week, availabilities, selections, onClick }) => {
  // Figure out how many blocks to render.
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
      <div className='day-date' onClick={() => onClick(day)}>
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
        {selections.map((selection, index) => {
          const from = getIntervalPosition(day, selection.start);
          const to = getIntervalPosition(day, selection.end);
          const style = { left: `${from * 100}%`, right: `${(1 - to) * 100}%` };

          return <div key={index} className='selection' style={style} />;
        })}
        <div className='blocks'>
          {blocks.map((interval, index) => (
            <div key={index} className='block' onClick={() => onClick(interval)} />
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

  const [blockCount, setBlockCount] = useState(12);
  const [selections, setSelections] = useState<Interval[]>([]);

  const handleResize = (bounds: ContentRect) => {
    const width = bounds.bounds?.width || 0;

    if (width > 1000) {
      setBlockCount(12);
    } else if (width > 640) {
      setBlockCount(8);
    } else {
      setBlockCount(4);
    }
  };

  const handleClick = (selected: Interval) => {
    const engulfed = selections.some(s => s.engulfs(selected));

    if (engulfed) {
      setSelections(Interval.xor([...selections, selected]));
    } else {
      setSelections(Interval.merge([...selections, selected]));
    }
  };

  const days = getDayIntervals(interval).map(day => ({
    availabilities: availabilities.filter(a => a.interval.overlaps(interval)),
    day,
    week: interval,
  }));

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div className='member-table' ref={measureRef}>
          {days.map((props, index) => (
            <Row
              blockCount={blockCount}
              key={index}
              member={member}
              selections={selections.filter(s => s.overlaps(props.day))}
              onClick={handleClick}
              {...props}
            />
          ))}
        </div>
      )}
    </Measure>
  );
};

export default MemberTable;
