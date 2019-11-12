import Page from '../components/Page';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';

const useStyles = makeStyles(theme => ({
  fab: {
    bottom: theme.spacing(2),
    position: 'absolute',
    right: theme.spacing(2),
  },
}));

const Member: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title="My Availability">
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
      <Fab color="secondary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Page>
  );
};

export default Member;
