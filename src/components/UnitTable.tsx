import { getDayIntervals } from '../model/dates';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Interval, DateTime } from 'luxon';
import React from 'react';

const useStyles = makeStyles(theme => ({
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  th: {
    fontWeight: 500,
  },
  cell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
}));

export interface UnitTableMemberProps {
  number: number;
  fullName: string;
  surname: string;
  team: string;
}

export interface UnitTableProps {
  interval: Interval;
  members: UnitTableMemberProps[];
}

const UnitTable: React.FC<UnitTableProps> = ({ interval, members }) => {
  members = members.sort((a, b) => (
    a.team.localeCompare(b.team) || a.surname.localeCompare(b.surname)
  ));

  // Get the days in the interval.
  const days = getDayIntervals(interval);

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <div className={classes.col}>
        <div className={clsx(classes.cell, classes.th)}>
          Name
        </div>
        {members.map(member => (
          <div key={member.number} className={classes.cell}>{member.fullName}</div>
        ))}
      </div>
      <div className={classes.body}>
        <div className={classes.col}>
          <div className={clsx(classes.cell, classes.th)}>
            Team
          </div>
          {members.map(member => (
            <div key={member.number} className={classes.cell}>{member.team}</div>
          ))}
        </div>
        <div className={classes.col}>
          <div className={clsx(classes.cell, classes.th)}>
            Qualifications
          </div>
          {members.map(member => (
            <div key={member.number} className={classes.cell}>{member.team}</div>
          ))}
        </div>
        <div className={classes.row}>
          {days.map(({ start }, index) => (
            <div key={index} className={clsx(classes.cell, classes.th)}>
              {start.toLocaleString(DateTime.DATE_SHORT)}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default UnitTable;
