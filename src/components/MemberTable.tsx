import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Interval } from 'luxon';
import React from 'react';

interface MemberTableProps {
  interval: Interval;
}

const useStyles = makeStyles(theme => ({
  date: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  day: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  number: {
    fontSize: 20,
  },
}));

const MemberTable: React.FC<MemberTableProps> = ({ interval }) => {
  // Get all partial days as whole day intervals.
  const days = Array
    .from(Array(interval.count('days')).keys())
    .map(i => interval.start.plus({ days: i }))
    .map(dt => Interval.fromDateTimes(dt.startOf('day'), dt.endOf('day')));

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      {days.map((interval, index) => (
        <React.Fragment key={index}>
          <Box display="flex" flexDirection="row">
            <Box className={classes.date}>
              <Typography className={classes.day}>{interval.start.toFormat('EEE')}</Typography>
              <Typography className={classes.number}>{interval.start.toFormat('d')}</Typography>
            </Box>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MemberTable;
