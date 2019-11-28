import { getDayIntervals } from '../model/dates';

import { Interval } from 'luxon';
import React from 'react';

interface MemberTableProps {
  interval: Interval;
}

const MemberTable: React.FC<MemberTableProps> = ({ interval }) => {
  const days = getDayIntervals(interval);

  return (
    <div className='member-table'>
      <div className='dates'>
        {days.map(({ start }, index) => (
          <div key={index} className='date'>
            <span className='text-muted'>{start.toFormat('ccc')}</span>
            <span className='h5'>{start.toFormat('d')}</span>
          </div>
        ))}
      </div>
      <div className='days'>
        {days.map(({ start }, index) => (
          <div key={index} className='day'>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberTable;
