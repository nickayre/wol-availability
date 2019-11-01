import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    height: theme.spacing(8),
    justifyContent: 'center',
    width: theme.spacing(8),
  },
  day: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  number: {
    fontSize: 20,
  },
  slot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    flex: 1,
  },
}));

const MemberTable: React.FC<MemberTableProps> = ({ interval }) => {
  const theme = useTheme();
  const largeBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
  const mediumBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  // Get all partial days as whole day intervals.
  const days = Array
    .from(Array(interval.count('days')).keys())
    .map(i => interval.start.plus({ days: i }))
    .map(dt => Interval.fromDateTimes(dt.startOf('day'), dt.endOf('day')));

  // We scale the granularity of hours that can be selected based on the device size.
  let slots = 4;

  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  if (largeScreen) {
    slots = 24;
  } else if (mediumScreen) {
    slots = 8;
  }

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      {days.map((interval, index) => (
        <Box key={index} display="flex" flexDirection="row">
          <Box className={classes.date}>
            <Typography className={classes.day}>{interval.start.toFormat('EEE')}</Typography>
            <Typography className={classes.number}>{interval.start.toFormat('d')}</Typography>
          </Box>
          <Box display="flex" flex="1">
            {interval.splitBy({ hours: 24 / slots }).map((slot, index) => (
              <Box key={index} flex="1" className={classes.slot}></Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MemberTable;
