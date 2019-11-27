import { Member } from '../model/availability';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaChevronDown } from 'react-icons/fa';

export interface MemberFilterProps {
  members?: Member[];
}

type ButtonProps = React.ComponentProps<typeof Button>;

const MemberFilter: React.FC<MemberFilterProps & ButtonProps> = ({ members, ...props }) => {
  const [team, setTeam] = useState('');

  const teams = Array.from(new Set((members || []).map(member => member.team).sort()));

  const overlay = (
    <Popover id='filter-members-popover'>
      <Form className='p-1'>
        <Form.Group controlId='team-filter'>
          <Form.Label>Team</Form.Label>
          <Form.Control
            as='select'
            className='custom-select'
            value={team}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeam(e.target.value)}
          >
            <option value=''>All</option>
            {teams.map(t => <option>{t}</option>)}
          </Form.Control>
        </Form.Group>
      </Form>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom'
      overlay={overlay}
    >
      <Button variant='secondary' {...props}>
        Filter {} <FaChevronDown />
      </Button>
    </OverlayTrigger>
  );
};

export default MemberFilter;
