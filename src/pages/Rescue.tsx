import MemberFilter from '../components/MemberFilter';
import Page from '../components/Page';
import WeekBrowser from '../components/WeekBrowser';
import { Member } from '../model/availability';
import { getNow, getWeekInterval } from '../model/dates';
import { FLOOD_RESCUE, RESCUE, VERTICAL_RESCUE } from '../model/qualifications';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AvailabilityTable from '../components/AvailabilityTable';

const MEMBERS_QUERY = gql`
  query ($qualifications: [String!]) {
    members(filter: { qualificationsAny: $qualifications }) {
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

const Rescue: React.FC = () => {
  const [week, setWeek] = useState(getWeekInterval(getNow()));

  const { loading, error, data } = useQuery<MembersData>(MEMBERS_QUERY, {
    variables: { qualifications: RESCUE },
  });

  const TabContent: React.FC<{ qualifications: string[] }> = ({ qualifications }) => (
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
          return <Alert variant='danger' className='m-3'>Error loading rescue availability.</Alert>;
        }

        const members = data.members
          .filter(member => (member.qualifications || []).some(q => qualifications.includes(q)))
          .sort((a, b) => a.surname.localeCompare(b.surname));

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
    <Page title='Rescue'>
      <Tabs id='rescue-tabs' defaultActiveKey='vr' transition={false} className='mt-1'>
        <Tab eventKey='vr' title='Vertical Rescue'>
          <TabContent qualifications={VERTICAL_RESCUE} />
        </Tab>
        <Tab eventKey='fr' title='Flood Rescue'>
          <TabContent qualifications={FLOOD_RESCUE} />
        </Tab>
      </Tabs>
    </Page>
  );
};

export default Rescue;
