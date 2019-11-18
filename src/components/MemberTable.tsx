import { getDayIntervals } from '../model/dates';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Interval } from 'luxon';
import React, { useState } from 'react';

interface MemberTableProps {
  interval: Interval;
}

const useStyles = makeStyles(theme => ({
  date: {
    alignItems: 'center',
    borderColor: theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  day: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  number: {
    fontSize: 20,
  },
  block: {
    borderColor: theme.palette.divider,
    cursor: 'pointer',
  },
}));

const MemberTable: React.FC<MemberTableProps> = ({ interval }) => {
  const [selected, setSelected] = useState<Interval[]>([]);

  // Get all partial days as whole day intervals. We break each day into blocks.
  const days = getDayIntervals(interval);
  const blocks = Array.from(Array(4).keys());

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      {days.map((interval, index) => (
        <React.Fragment key={index}>
          <Box display="flex" flexDirection="row">
            <Box className={classes.date} borderRight={1}>
              <Typography className={classes.day}>{interval.start.toFormat('EEE')}</Typography>
              <Typography className={classes.number}>{interval.start.toFormat('d')}</Typography>
            </Box>
            <Box display="flex" flexGrow={1}>
              {blocks.map(value => (
                <Box flexGrow={1} borderRight={1} className={classes.block}>
                </Box>
              ))}
            </Box>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MemberTable;
