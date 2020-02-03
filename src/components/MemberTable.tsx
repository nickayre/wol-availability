import { Availability, Member } from '../model/availability';
import { getDayIntervals } from '../model/dates';

import _ from 'lodash';
import { Interval } from 'luxon';
import React, { useState } from 'react';
import Measure, { ContentRect } from 'react-measure';

interface MemberTableProps {
  member: Member;
  interval: Interval;
}

interface RowProps {
  columnCount: number;
}

const Row: React.FC<RowProps> = () => {
  return (
    <div className='row'></div>
  );
};

const MemberTable: React.FC<MemberTableProps> = ({ member, interval }) => {
  const [columnCount, setColumnCount] = useState(12);

  const days = getDayIntervals(interval);
  const columns = _.range(columnCount).map(i => 24 * (i + 1) / columnCount);

  const handleResize = (bounds: ContentRect) => {
    const width = bounds.bounds?.width || 0;

    if (width >= 768) {
      setColumnCount(8);
    } else if (width >= 992) {
      setColumnCount(12);
    } else {
      setColumnCount(4);
    }
  };

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div className='member-table' ref={measureRef}>
          <div className='member-table-head'>
            <div className='member-table-row'>
              <div className='member-table-date'></div>
              {columns.map((start, index) => (
                <div key={index} className='member-table-time'>
                  {index < columns.length - 1 && (
                    <span className='member-table-time-text'>
                      {_.padStart(start.toString(), 2, '0') + ':00'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='member-table-body'>
            {days.map(day => (
              <div className='member-table-row'>
                <div className='member-table-date'>
                  <span className='text-muted'>{day.start.toFormat('ccc')}</span>
                  <span className='h5 mb-0'>{day.start.toFormat('d')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Measure>
  );
};

export default MemberTable;
