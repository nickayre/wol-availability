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
  week: Interval;
  columnCount: number;
  selections: Interval[];
  handleSelect: (...selection: Interval[]) => void;
}

const Row: React.FC<RowProps> = ({ day, week, columnCount, selections, handleSelect }) => {
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
  const columns = _.range(columnCount).map(i => 24 * i / columnCount);

  const handleSelect = (...selected: Interval[]) => {
    const engulfed = selected.every(sel => selections.some(existing => existing.engulfs(sel)));

    if (engulfed) {
      setSelections(Interval.xor([...selections, ...selected]));
    } else {
      setSelections(Interval.merge([...selections, ...selected]));
    }
  };

  const handleSelectTime = (startHour: number, lengthHours: number) => {
    const times = days.map(day => {
      const start = day.start.set({ hour: startHour });
      const end = start.plus({ hours: lengthHours });

      return Interval.fromDateTimes(start, end);
    });

    handleSelect(...times);
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
              {columns.map((time, index) => (
                <div
                  key={index}
                  className='member-table-time'
                  onClick={() => handleSelectTime(time, 24 / columnCount)}
                >
                  {index > 0 && (
                    <span className='member-table-time-text'>
                      {_.padStart(time.toString(), 2, '0') + ':00'}
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
                week={interval}
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
