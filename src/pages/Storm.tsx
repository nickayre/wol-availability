import Page from '../components/Page';
import UnitTable, { UnitTableMemberProps } from '../components/UnitTable';

import { useQuery } from '@apollo/react-hooks';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import gql from 'graphql-tag';
import React from 'react';

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
  const { loading, error, data } = useQuery<MembersData>(MEMBERS_QUERY);

  return (
    <Page title="Storm and Support">
      <Toolbar>
      </Toolbar>
      <Divider />
      {(() => {
        if (loading) {
          return <LinearProgress />;
        }

        if (error || !data) {
          return 'Error loading members';
        }

        return <UnitTable members={data.members} />;
      })()}
    </Page>
  );
};

export default Storm;
