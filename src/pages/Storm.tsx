import MemberFilter from '../components/MemberFilter';
import Page from '../components/Page';
import WeekBrowser from '../components/WeekBrowser';
import { Member } from '../model/availability';
import { getNow, getWeekInterval } from '../model/dates';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import AvailabilityTable from '../components/AvailabilityTable';

const MEMBERS_QUERY = gql`
  {
    members {
      fullName
      number
      surname
      team
      qualifications
    }
  }
`;

interface MembersData {
  members: Member[];
}

const Storm: React.FC = () => {
  const [week, setWeek] = useState(getWeekInterval(getNow()));

  const { loading, error, data } = useQuery<MembersData>(MEMBERS_QUERY);

  const TabContent: React.FC = () => (
    <React.Fragment>
      {(() => {
        if (loading) {
          return (
            <Alert variant='info' className='m-3'>
              <Spinner animation='border' size='sm' /> Loading member availability&hellip;
            </Alert>
          );
        }

        if (error || !data) {
          return <Alert variant='danger' className='m-3'>Error loading availability.</Alert>;
        }

        const members = data.members.sort((a, b) => (
          a.team.localeCompare(b.team) || a.surname.localeCompare(b.surname)
        ));

        return (
          <React.Fragment>
            <div className='toolbar'>
              <MemberFilter members={members} variant='primary' className='mr-2' />
              <WeekBrowser value={week} onChange={setWeek} />
            </div>
            <AvailabilityTable members={members} />
          </React.Fragment>
        );
      })()}
    </React.Fragment>
  );

  return (
    <Page title='Storm and Support' heading='Storm'>
      <TabContent />
    </Page>
  );
};

export default Storm;
