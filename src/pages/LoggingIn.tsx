import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => createStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
  progress: {
    marginBottom: theme.spacing(1),
  },
}));

const LoggingIn: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress className={classes.progress} />
      <Typography component="h1" variant="h6">Wollongong SES</Typography>
      <Typography>Logging in&hellip;</Typography>
    </Box>
  );
};

export default LoggingIn;
