import { getWeekInterval } from '../model/dates';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { DateTime } from 'luxon';
import React from 'react';

interface WeekBrowserProps {
  value: DateTime;
  onChange: (value: DateTime) => void;
}

/**
 * A toolbar which allows selecting a week to view.
 */
const WeekBrowser: React.FC<WeekBrowserProps> = ({ value, onChange }) => {
  // Get the interval for the selected week.
  const { start } = getWeekInterval(value);

  // Get the interval for the current week.
  const currentInterval = getWeekInterval(DateTime.local());
  const currentActive = currentInterval.contains(start);

  const handleCurrent = () => onChange(currentInterval.start);
  const handlePrevious = () => onChange(start.minus({ week: 1 }));
  const handleNext = () => onChange(start.plus({ week: 1 }));

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        disabled={currentActive}
        onClick={handleCurrent}
      >
        Today
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
    </React.Fragment>
  );
};

export default WeekBrowser;
