import { useAuth } from '../components/AuthContext';
import Page from '../components/Page';
import { Member } from '../model/availability';
import { getNow, getWeekInterval } from '../model/dates';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FaArrowRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const MEMBERS_QUERY = gql`
  {
    members {
      number
      fullName
      surname
      team
    }
  }
`;

interface MembersVars {
  members: Member[];
}

const SelectMember: React.FC = () => {
  const { member: me } = useAuth();
  const history = useHistory();

  // Generate the next few weeks of availability.
  const { start } = getWeekInterval(getNow());
  const weeks = new Array(6).fill(null).map((_, i) => start.plus({ weeks: i }));

  const [week, setWeek] = useState(weeks[0].toISODate());
  const [team, setTeam] = useState(me ? me.team : '');
  const [member, setMember] = useState(me ? me.number : 0);

  const { loading, error, data } = useQuery<MembersVars>(MEMBERS_QUERY);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!week || !member) {
      return;
    }

    if (me && me.number === member) {
      history.replace(`/member/me/${week}`);
    } else {
      history.replace(`/member/${member}/${week}`);
    }
  };

  return (
    <Page title='Member Availability' heading='Member'>
      <Container className='my-3'>
        <h1 className='h3'>Member Availability</h1>
        <p className='lead'>
          Enter and update availability for storm, support and rescue callouts.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='week'>
            <Form.Label>Enter availability for the week of</Form.Label>
            <Form.Control
              as='select'
              value={week}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWeek(e.target.value)}
              className='custom-select'
            >
              {weeks.map(w => (
                <option key={w.toMillis()} value={w.toISODate()}>
                  {w.toLocaleString(DateTime.DATE_HUGE)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {(() => {
            if (loading) {
              return (
                <p><Spinner as='span' animation='border' size='sm' /> Loading members&hellip;</p>
              );
            }

            if (error || !data) {
              return <Alert variant='danger'>Error loading members</Alert>;
            }

            const teams = Array.from(new Set(data.members.map(m => m.team))).sort();

            const members = data.members
              .filter(m => !team || team === m.team)
              .sort((a, b) => a.surname.localeCompare(b.surname));

            return (
              <React.Fragment>
                 <Form.Group controlId='team'>
                  <Form.Label>What team are you in?</Form.Label>
                  <Form.Control
                    as='select'
                    value={team}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeam(e.target.value)}
                    className='custom-select'
                  >
                    {teams.map(t => <option key={t}>{t}</option>)}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='member'>
                <Form.Label>Who are you?</Form.Label>
                  <Form.Control
                    as='select'
                    value={member !== 0 ? member.toString() : ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setMember(parseInt(e.target.value, 10));
                    }}
                    className='custom-select'
                  >
                    {members.map(m => (
                      <option key={m.number} value={m.number}>{m.fullName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button type='submit' disabled={!member || !week}>
                  Manage Availability <FaArrowRight />
                </Button>
              </React.Fragment>
            );
          })()}
        </Form>
      </Container>
    </Page>
  );
};

export default SelectMember;
