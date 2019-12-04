import { Member } from '../model/availability';
import { FEATURED } from '../model/qualifications';

import _ from 'lodash';
import React, { ReactElement, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';

export interface MemberFilterProps {
  id: string;
  members: Member[];
  children: (popover: ReactElement, members: Member[]) => ReactElement | null;
}

const MemberFilter: React.FC<MemberFilterProps> = ({ id, members, children }) => {
  const [team, setTeam] = useState('');
  const [qualifications, setQualifications] = useState<string[]>([]);

  // Get the list of all teams.
  const teams = _.uniq(members.map(m => m.team)).sort();

  // Combine the list of featured qualifications then append all other qualifications.
  const other = _.uniq(members.map(m => m.qualifications).flat().filter(q => !FEATURED.includes(q))).sort();
  const qualificationOptions = [...FEATURED, ...other];

  // Filter the available members.
  const filtered = members.filter(member => {
    if (team !== '' && member.team !== team) {
      return false;
    }

    if (qualifications.length > 0) {
      if (!qualifications.every(q => member.qualifications && member.qualifications.includes(q))) {
        return false;
      }
    }

    return true;
  });

  const popover = (
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
              <option value=''>All</option> {teams.map(t => <option key={t}>{t}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Qualifications</Form.Label>
            <Typeahead
              id={`${id}-typeahead`}
              multiple
              options={qualificationOptions}
              onChange={setQualifications}
            />
          </Form.Group>
        </Form>
      </Popover.Content>
    </Popover>
  );

  return children(popover, filtered);
};

export default MemberFilter;
