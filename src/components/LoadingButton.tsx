import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  progressSize?: number;
}

const LoadingButton: React.FC<LoadingButtonProps> = props => {
  const { children, loading, progressSize, ...rest } = props;

  const classes = useStyles();

  const size = progressSize || 24;
  const style = { marginLeft: -size / 2, marginTop: -size / 2 };

  return (
    <Button {...rest}>
      <div className={classes.wrapper}>
        {loading && (
          <CircularProgress size={size} className={classes.progress} style={style} />
        )}
        {children}
      </div>
    </Button>
  );
};

export default LoadingButton;
