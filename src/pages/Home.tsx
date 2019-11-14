import Page from '../components/Page';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  row: {
    padding: theme.spacing(2),
  },
}));

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

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title="Home">
      <Grid container spacing={2} className={classes.row}>
        <Grid item xs={12} md={6}>
          <StormCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <RescueCard />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Home;
