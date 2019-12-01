import { useAuth } from '../components/AuthContext';
import MemberTable from '../components/MemberTable';
import Page from '../components/Page';
import WeekBrowser from '../components/WeekBrowser';
import { Member } from '../model/availability';
import { getNow, getWeekInterval } from '../model/dates';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { DateTime, Interval } from 'luxon';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, useParams } from 'react-router-dom';

interface Params {
  member: string;
  week?: string;
}

const MEMBER_QUERY = gql`
  query ($number: Int!) {
    member(number: $number) {
      number
      fullName
      surname
      team
    }
  }
`;

interface MemberQueryData {
  member: Member;
}

interface MemberQueryVars {
  number: number;
}

interface ContentProps {
  member: number;
  interval: Interval;
}

const Content: React.FC<ContentProps> = ({ member: memberNumber, interval }) => {
  const { member: me } = useAuth();
  const history = useHistory();

  const { loading, error, data } = useQuery<MemberQueryData, MemberQueryVars>(MEMBER_QUERY, {
    variables: { number: memberNumber },
  });

  if (loading) {
    return (
      <Page title='Member'>
        <Alert variant='info' className='m-2'>
          <Spinner animation='border' size='sm' /> Loading member&apos;s availability&hellip;
        </Alert>
      </Page>
    );
  }

  if (error || !data) {
    return (
      <Page title='Member'>
        <Alert variant='danger' className='m-2'>
          There was an error loading the member&apos;s availability.
        </Alert>
      </Page>
    );
  }

  const { member } = data;

  const handleWeekChange = (value: Interval) => {
    if (me && me.number === memberNumber) {
      history.replace(`/member/me/${value.start.toISODate()}`);
    } else {
      history.replace(`/member/${memberNumber}/${value.start.toISODate()}`);
    }
  };

  return (
    <Page title='Member' heading={member.fullName}>
      <div className='toolbar'>
        <WeekBrowser value={interval} onChange={handleWeekChange} />
      </div>
      <MemberTable member={member} interval={interval} />
    </Page>
  );
};

const ManageMember: React.FC = () => {
  const { member: me } = useAuth();
  const params = useParams<Params>();

  let member: number | undefined;
  let week: Interval;

  if (params.member === 'me') {
    member = me ? me.number : undefined;
  } else {
    member = parseInt(params.member, 10);
  }

  if (!member) {
    return (
      <Page title='Member'>
        <Alert variant='danger' className='m-2'>Invalid member to manage availability for.</Alert>
      </Page>
    );
  }

  if (params.week === undefined) {
    week = getWeekInterval(getNow());
  } else {
    week = getWeekInterval(DateTime.fromISO(params.week));
  }

  if (!week.isValid) {
    return (
      <Page title='Member'>
        <Alert variant='danger' className='m-2'>Invalid week to manage availability for.</Alert>
      </Page>
    );
  }

  return (
    <Content member={member} interval={week} />
  );
};

export default ManageMember;
