import logo from '../assets/logo.svg';
import { useAuth } from '../components/AuthContext';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Helmet from 'react-helmet';

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

  const [login, { loading, error }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION, {
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
    <Form onSubmit={handleSubmit}>
      <img src={logo} width={48} height={48} alt='SES Logo' className='mb-3' />
      {error && (
        <Alert variant='danger'>Invalid member number and/or password.</Alert>
      )}
      <Form.Group controlId='member-number'>
        <Form.Control
          type='number'
          required
          placeholder='Member number'
          value={memberNumber !== 0 ? memberNumber.toString() : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMemberNumber(parseInt(e.target.value, 10));
          }}
        />
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Control
          type='password'
          required
          placeholder='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Form.Text className='text-muted'>
          Your default password is capital W followed by your member number.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='remember'>
        <Form.Check
          type='checkbox'
          label='Remember me?'
          checked={remember}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
        />
      </Form.Group>
      <Button type='submit' variant='primary' block disabled={loading}>
        {loading ? (
          <><Spinner animation='border' size='sm' /> Logging in&hellip;</>
        ) : (
          'Login'
        )}
      </Button>
    </Form>
  );
};

const Login: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>Login | WOL SES Availability</title>
    </Helmet>
    <div id='login'>
      <LoginForm />
    </div>
  </React.Fragment>
);

export default Login;
