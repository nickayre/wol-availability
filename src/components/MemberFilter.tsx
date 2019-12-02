import { Member } from '../model/availability';
import { FEATURED } from '../model/qualifications';

import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaChevronDown } from 'react-icons/fa';

export interface MemberFilterProps {
  id: string;
  members?: Member[];
}

type ButtonProps = React.ComponentProps<typeof Button>;

const MemberFilter: React.FC<MemberFilterProps & ButtonProps> = ({ id, members, ...props }) => {
  const [team, setTeam] = useState('');
  const [_, setQualifications] = useState<string[]>([]);

  const teams = Array.from(new Set((members || []).map(member => member.team).sort()));

  // Create a list of featured and all other non-featured qualifications and combine then.
  const featured = FEATURED;

  const other = Array
    .from(new Set((members || [])
      .map(member => member.qualifications!)
      .flat()
      .filter(qualification => !FEATURED.includes(qualification)),
    ))
    .sort();

  const qualifications = [...featured, ...other];

  const overlay = (
    <Popover id={id} className='member-filter-popover'>
      <Popover.Title as='h4'>Filter Members</Popover.Title>
      <Popover.Content>
        <Form>
          <Form.Group>
            <Form.Label>Team</Form.Label>
            <Form.Control
              as='select'
              className='custom-select'
              value={team}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeam(e.target.value)}
            >
              <option value=''>All</option>
              {teams.map(t => <option key={t}>{t}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Qualifications</Form.Label>
            <Typeahead
              multiple
              options={qualifications}
              onChange={setQualifications}
            />
          </Form.Group>
        </Form>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom'
      overlay={overlay}
    >
      <Button variant='secondary' {...props}>
        Filter {members ? ` (${members.length})` : null} <FaChevronDown />
      </Button>
    </OverlayTrigger>
  );
};

export default MemberFilter;
