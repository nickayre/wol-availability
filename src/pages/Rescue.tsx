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
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { LinkContainer } from 'react-router-bootstrap';

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
  return (
    <Page title='Rescue'>
      <Nav variant='tabs' className='mt-1'>
        <Nav.Item>
          <LinkContainer to='/unit/vr'>
            <Nav.Link>Vertical Rescue</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to='/unit/fr'>
            <Nav.Link>Flood Rescue</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </Page>
  );
};

export default Rescue;
