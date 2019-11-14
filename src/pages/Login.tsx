import { useAuth } from '../components/AuthContext';
import LoadingButton from '../components/LoadingButton';

import { useMutation } from '@apollo/react-hooks';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
    maxWidth: 500,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const LOGIN_MUTATION = gql`
  mutation ($memberNumber: Int!, $password: String!) {
    login(memberNumber: $memberNumber, password: $password) {
      token
    }
  }
`;

interface LoginData {
  login: { token: string };
}

interface LoginVars {
  memberNumber: number;
  password: string;
}

const LoginForm: React.FC = () => {
  const [memberNumber, setMemberNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const auth = useAuth();

  const [login, { loading }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION, {
    onCompleted: data => {
      auth.login(data.login.token, remember);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      login({ variables: { memberNumber, password } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="number"
        label="Member number"
        value={memberNumber === 0 ? '' : memberNumber.toString()}
        onChange={e => setMemberNumber(parseInt(e.target.value, 10))}
        required
        autoFocus
        disabled={loading}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        disabled={loading}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControlLabel
        label="Remember me?"
        control={
          <Checkbox
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            disabled={loading}
            color="primary"
          />
        }
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        loading={loading}
        disabled={loading}
      >
        Login
      </LoadingButton>
    </form>
  );
};

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default Login;
