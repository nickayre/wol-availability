import { Member } from '../model/availability';

import React from 'react';

export interface AvailabilityTableProps {
  members: Member[];
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({ members }) => {
  return (
    <div className='availability-table'>
      <div className='column'>
        <div className='cell column-heading'>Name</div>
        {members.map(member => (
          <div key={member.number} className='cell'>{member.fullName}</div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityTable;
