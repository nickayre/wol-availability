import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Interval } from 'luxon';
import React from 'react';

const useStyles = makeStyles(theme => ({
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  cell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
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

const UnitTable: React.FC<UnitTableProps> = ({ members }) => {
  members = members.sort((a, b) => (
    a.team.localeCompare(b.team) || a.surname.localeCompare(b.surname)
  ));

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <div className={classes.col}>
        {members.map(member => (
          <div key={member.number} className={classes.cell}>{member.fullName}</div>
        ))}
      </div>
      <div>
        <div className={classes.col}>
          {members.map(member => (
            <div className={classes.cell}>{member.team}</div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default UnitTable;
