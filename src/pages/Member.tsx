import MemberTable from '../components/MemberTable';
import Page from '../components/Page';
import WeekToolbar from '../components/WeekToolbar';

import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { getWeekInterval } from '../model/dates';

const useStyles = makeStyles(theme => ({
  fab: {
    bottom: theme.spacing(2),
    position: 'absolute',
    right: theme.spacing(2),
  },
}));

const Member: React.FC = () => {
  const [week, setWeek] = useState(DateTime.local());
  const interval = getWeekInterval(week);

  const classes = useStyles();

  return (
    <Page title="My Availability">
      <WeekToolbar value={week} onChange={week => setWeek(week)} />
      <Divider />
      <MemberTable interval={interval} />
      <Fab color="secondary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Page>
  );
};

export default Member;
