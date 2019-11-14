import Page from '../components/Page';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import React from 'react';

const StormCard: React.FC = () => (
  <Card>
    <CardHeader title="Storm and Support" />
  </Card>
);

const RescueCard: React.FC = () => (
  <Card>
    <CardHeader title="Rescue" />
  </Card>
);

const Home: React.FC = () => (
  <Page title="Home">
    <Container>
      <StormCard />
      <RescueCard />
    </Container>
  </Page>
);

export default Home;
