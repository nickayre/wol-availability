import { getWeekInterval } from '../model/dates';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { DateTime } from 'luxon';
import React from 'react';

interface WeekToolbarProps {
  value: DateTime;
  onChange: (value: DateTime) => void;
}

/**
 * A toolbar which allows selecting a week to view.
 */
const WeekToolbar: React.FC<WeekToolbarProps> = ({ value, onChange }) => {
  // Get the interval for the selected week.
  const { start } = getWeekInterval(value);

  // Get the interval for the current week.
  const currentInterval = getWeekInterval(DateTime.local());
  const currentActive = currentInterval.contains(start);

  const handleCurrent = () => onChange(currentInterval.start);
  const handlePrevious = () => onChange(start.minus({ week: 1 }));
  const handleNext = () => onChange(start.plus({ week: 1 }));

  return (
    <Toolbar>
      <Button
        variant="outlined"
        disabled={currentActive}
        onClick={handleCurrent}
      >
        This Week
      </Button>
      <IconButton onClick={handlePrevious}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton onClick={handleNext}>
        <NavigateNextIcon />
      </IconButton>
      <Typography>
        {start.toLocaleString(DateTime.DATE_MED)}
      </Typography>
    </Toolbar>
  );
};

export default WeekToolbar;
