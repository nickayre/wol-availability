import MemberFilter from '../components/MemberFilter';
import Page from '../components/Page';
import UnitTable, { UnitTableMemberProps } from '../components/UnitTable';
import WeekBrowser from '../components/WeekBrowser';
import { getWeekInterval } from '../model/dates';

import { useQuery } from '@apollo/react-hooks';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import gql from 'graphql-tag';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

const MEMBERS_QUERY = gql`
  {
    members {
      number
      fullName
      surname
      team
      qualifications
    }
  }
`;

interface MembersData {
  members: UnitTableMemberProps[];
}

const Storm = () => {
  const [week, setWeek] = useState(DateTime.local());
  const interval = getWeekInterval(week);

  const { loading, error, data } = useQuery<MembersData>(MEMBERS_QUERY);

  return (
    <Page title="Storm and Support">
      <Toolbar>
        <MemberFilter />
        <WeekBrowser value={week} onChange={setWeek} />
      </Toolbar>
      <Divider />
      {(() => {
        if (loading) {
          return <LinearProgress />;
        }

        if (error || !data) {
          return 'Error loading members';
        }

        return <UnitTable interval={interval} members={data.members} />;
      })()}
    </Page>
  );
};

export default Storm;
