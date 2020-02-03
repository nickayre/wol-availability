import { Availability, Member } from '../model/availability';
import { getDayIntervals, getIntervalPosition } from '../model/dates';

import _ from 'lodash';
import { Interval } from 'luxon';
import React, { useState } from 'react';
import Measure, { ContentRect } from 'react-measure';

interface MemberTableProps {
  member: Member;
  interval: Interval;
}

interface RowProps {
  day: Interval;
  columnCount: number;
  selections: Interval[];
  handleSelect: (...selection: Interval[]) => void;
}

const Row: React.FC<RowProps> = ({ day, columnCount, selections, handleSelect }) => {
  const intervals = day.divideEqually(columnCount);
  const { start } = day;

  const visibleSelections = selections.filter(s => s.overlaps(day));

  return (
    <div className='member-table-row'>
      <div className='member-table-date' onClick={e => handleSelect(day)}>
        <span className='text-muted'>{start.toFormat('ccc')}</span>
        <span className='h5 mb-0'>{start.toFormat('d')}</span>
      </div>
      <div className='member-table-day-container'>
        {intervals.map(interval => (
          <div
            key={interval.start.toString()}
            className='member-table-cell'
            onClick={e => handleSelect(interval)}
          />
        ))}
        {visibleSelections.map(selection => {
          const from = getIntervalPosition(day, selection.start);
          const to = getIntervalPosition(day, selection.end);
          const style = { left: `${from * 100}%`, right: `${(1 - to) * 100}%` };

          return (
            <div
              key={selection.start.toString()}
              className='member-table-selection'
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

const MemberTable: React.FC<MemberTableProps> = ({ member, interval }) => {
  const [selections, setSelections] = useState<Interval[]>([]);
  const [columnCount, setColumnCount] = useState(12);

  const days = getDayIntervals(interval);
  const columns = _.range(columnCount).map(i => 24 * (i + 1) / columnCount);

  const handleSelect = (...selected: Interval[]) => {
    for (const selection of selected) {
      const engulfed = selections.some(s => s.engulfs(selection));

      if (engulfed) {
        setSelections(Interval.xor([...selections, selection]));
      } else {
        setSelections(Interval.merge([...selections, selection]));
      }
    }
  };

  const handleResize = (bounds: ContentRect) => {
    const width = bounds.bounds?.width || 0;

    if (width >= 992) {
      setColumnCount(12);
    } else if (width >= 768) {
      setColumnCount(8);
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
              <Row
                key={day.start.toString()}
                day={day}
                columnCount={columnCount}
                selections={selections}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </Measure>
  );
};

export default MemberTable;
