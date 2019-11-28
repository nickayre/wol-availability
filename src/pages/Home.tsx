import Page from '../components/Page';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const HOME_QUERY = gql`
  {
    shiftTeams {
      day
      night
    }
  }
`;

interface HomeQueryData {
  shiftTeams: { day: string; night: string; };
}

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<HomeQueryData>(HOME_QUERY);

  return (
    <Page title='Home' heading='Availability'>
      <Container fluid className='my-3'>
        {(() => {
          if (loading) {
            return (
              <Alert variant='info'>
                <Spinner animation='border' size='sm' /> Loading availability&hellip;
              </Alert>
            );
          }

          if (error || !data) {
            return <Alert variant='danger'>Error loading availability.</Alert>;
          }

          const { day, night } = data.shiftTeams;

          return (
            <Alert variant='info'>
              <strong>{day}</strong> is day shift and <strong>{night}</strong> is night shift.
            </Alert>
          )
        })()}
      </Container>
    </Page>
  );
};

export default Home;
