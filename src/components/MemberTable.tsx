import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Interval } from 'luxon';
import React from 'react';

interface MemberTableProps {
  interval: Interval;
}

const useStyles = makeStyles(theme => ({
  date: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
    width: 64,
  },
  day: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  slot: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
    <Table>
      <TableBody>
        {days.map(({ start }, index) => (
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
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberTable;
