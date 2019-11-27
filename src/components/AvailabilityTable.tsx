import { Member } from '../model/availability';

import React from 'react';

export interface AvailabilityTableProps {
  members: Member[];
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({ members }) => {
  return (
    <React.Fragment>
      {members.map(member => (
        <div key={member.number}>{member.fullName}</div>
      ))}
    </React.Fragment>
  );
};

export default AvailabilityTable;
