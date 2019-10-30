import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Interval } from 'luxon';
import React, { Fragment, useRef } from 'react';

interface MemberTableProps {
  interval: Interval;
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  table: {
    tableLayout: 'fixed',
  },
  ticks: {
    '& th': {
      height: theme.spacing(0.5),
      padding: 0,
    },
  },
  tick: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tickLabels: {
    '& th': {
      borderBottom: 'none',
      height: 24,
      position: 'relative',
    },
  },
  tickLabel: {
    bottom: 0,
    color: theme.palette.text.secondary,
    fontSize: 12,
    position: 'absolute',
    right: -24,
    textAlign: 'center',
    width: 48,
  },
  date: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
  },
  day: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  slot: {
    borderRight: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    height: 64,
  },
}));

const MemberTable: React.FC<MemberTableProps> = ({ interval }) => {
  // Get all partial days as whole day intervals.
  const days = Array
    .from(Array(interval.count('days')).keys())
    .map(i => interval.start.plus({ days: i }))
    .map(dt => Interval.fromDateTimes(dt.startOf('day'), dt.endOf('day')));

  const classes = useStyles();

  // We render a table to provide layout and visual, then render the events on top of that.
  const events = useRef<HTMLDivElement>(null);

  return (
    <Box className={classes.container}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow className={classes.tickLabels}>
            <TableCell style={{ width: 64 }} />
            <TableCell><span className={classes.tickLabel}>06:00</span></TableCell>
            <TableCell><span className={classes.tickLabel}>12:00</span></TableCell>
            <TableCell><span className={classes.tickLabel}>18:00</span></TableCell>
            <TableCell />
          </TableRow>
          <TableRow className={classes.ticks}>
            <TableCell />
            <TableCell className={classes.tick} />
            <TableCell className={classes.tick} />
            <TableCell className={classes.tick} />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map(({ start }, index) => (
            <Fragment>
              <TableRow key={index}>
                <TableCell className={classes.date}>
                  <Typography className={classes.day}>{start.toFormat('EEE')}</Typography>
                  <Typography variant="h6">{start.toFormat('d')}</Typography>
                </TableCell>
                <TableCell className={classes.slot}></TableCell>
                <TableCell className={classes.slot}></TableCell>
                <TableCell className={classes.slot}></TableCell>
                <TableCell className={classes.slot}></TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <div ref={events} />
    </Box>
  );
};

export default MemberTable;
