import { Availability } from '../model/availability';

import { Color } from '@material-ui/core';
import Box, { BoxProps } from '@material-ui/core/Box';
import { amber, green, grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: '#eee',
    borderRadius: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'row',
    height: theme.spacing(6),
    padding: theme.spacing(0, 1),
  },
  dot: {
    borderRadius: theme.spacing(1),
    display: 'inline-block',
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: theme.spacing(2),
  },
  status: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(2),
  },
}));

interface StatusDotProps {
  color: Color;
  label: string;
}

const Status: React.FC<StatusDotProps> = ({ color, label }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" alignItems="center" style={{ color: color[800] }}>
      <Box className={classes.dot} style={{ background: color[700] }} /> {label}
    </Box>
  );
};

interface AvailabilityBlockProps {
  availability: Availability;
}

const AvailabilityBlock: React.FC<AvailabilityBlockProps & BoxProps> = (props) => {
  const { availability, ...rest } = props;
  const { storm, rescue, vehicle, note } = availability;
  const classes = useStyles();

  // Individual storm and rescue colours.
  let stormColour = grey;
  let rescueColour = grey;

  if (storm) {
    stormColour = { AVAILABLE: green, UNAVAILABLE: red }[storm];
  }

  if (rescue) {
    rescueColour = { IMMEDIATE: green, SUPPORT: amber, UNAVAILABLE: red }[rescue];
  }

  // Calculate the background from the two statuses.
  let background = grey;

  if (storm && rescue) {
    if (storm === 'AVAILABLE' && rescue === 'IMMEDIATE') {
      background = green;
    } else if (storm === 'UNAVAILABLE' && rescue === 'UNAVAILABLE') {
      background = red;
    }
  }

  return (
    <Box className={classes.container} style={{ background: background[100] }} {...rest}>
      <Box className={classes.status}>
        {storm && <Status label="Storm" color={stormColour} />}
        {rescue && <Status label="Rescue" color={rescueColour} />}
      </Box>
      <Box display="flex" flexDirection="column">
        {vehicle && (
          <Box>{vehicle}</Box>
        )}
        {note && (
          <Box>{note}</Box>
        )}
      </Box>
    </Box>
  );
};

export default AvailabilityBlock;
