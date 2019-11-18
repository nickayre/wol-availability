import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Popover from '@material-ui/core/Popover';
import Select from '@material-ui/core/Select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';

const MemberFilter: React.FC = () => {
  const [button, setButton] = React.useState<HTMLButtonElement | undefined>(undefined);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButton(event.currentTarget);
  };

  const handleClose = () => {
    setButton(undefined);
  };

  return (
    <React.Fragment>
      <Button
        color="primary"
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        Filter
      </Button>
      <Popover
        open={Boolean(button)}
        anchorEl={button}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <form>
          <FormControl>
            <InputLabel id="filter-team-label">Team</InputLabel>
            <Select
              labelId="filter-team-label"
              id="filter-team"
            >
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="filter-qualifications-label">Qualifications</InputLabel>
            <Select
              labelId="filter-qualifications-label"
              id="filter-qualifications"
            >
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox />
            }
            label="Hide members without availability?"
          />
        </form>
      </Popover>
    </React.Fragment>
  );
};

export default MemberFilter;
