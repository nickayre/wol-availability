import { Member } from '../model/availability';
import MemberFilter from './MemberFilter';

import { Interval } from 'luxon';
import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaChevronDown } from 'react-icons/fa';
import WeekBrowser from './WeekBrowser';

export interface AvailabilityTableProps {
  id: string;
  members: Member[];
  week: Interval;
  onChangeWeek: (week: Interval) => void;
}

const Table: React.FC<{ members: Member[] }> = ({ members }) => (
  <div className='availability-table'>
    <div className='column'>
      <div className='cell column-heading'>Name</div>
      {members.map(member => (
        <div key={member.number} className='cell'>{member.fullName}</div>
      ))}
    </div>
  </div>
);

const UnitTable: React.FC<AvailabilityTableProps> = ({ id, members, week, onChangeWeek }) => (
  <MemberFilter id={`${id}-filter`} members={members}>
    {(filter, visible) => (
      <React.Fragment>
        <div className='toolbar'>
          <OverlayTrigger trigger='click' placement='bottom' overlay={filter}>
            <Button variant='primary' className='mr-2'>
              {`Filter (${visible.length})`} <FaChevronDown />
            </Button>
          </OverlayTrigger>
          <WeekBrowser value={week} onChange={onChangeWeek} />
        </div>
        <Table members={visible} />
      </React.Fragment>
    )}
  </MemberFilter>
);

export default UnitTable;
