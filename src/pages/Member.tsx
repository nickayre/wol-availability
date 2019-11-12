import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';

const Member: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6">
            My Availability
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar>
        <Button variant="outlined">
          Today
        </Button>
        <IconButton>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton>
          <NavigateNextIcon />
        </IconButton>
        <Typography>
          11th November 2019
        </Typography>
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
};

export default Member;
