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
  let hours: number[];

  if (largeBreakpoint) {
    hours = Array.from(Array(24).keys());
  } else if (mediumBreakpoint) {
    hours = Array.from(Array(12).keys());
  } else {
    hours = Array.from(Array(4).keys());
  }

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      {days.map(({ start }, index) => (
        <Box key={index} display="flex" flexDirection="row">
          <Box className={classes.date}>
            <Typography className={classes.day}>{start.toFormat('EEE')}</Typography>
            <Typography className={classes.number}>{start.toFormat('d')}</Typography>
          </Box>
          <Box display="flex" flex="1">
            {hours.map(hour => (
              <Box key={hour} flex="1" className={classes.slot}></Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MemberTable;
