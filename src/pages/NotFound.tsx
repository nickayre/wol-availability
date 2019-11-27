import Page from '../components/Page';

import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Page title='Not Found' heading='Availability'>
    <Container fluid className='mt-3'>
      <Alert variant='danger'>
        The content you requested could not be found. You can <Link to='/' className='alert-link'>
        return to the home page</Link> or <Link to='/member/me' className='alert-link'>manage your
        availability</Link>.
      </Alert>
    </Container>
  </Page>
);

export default NotFound;
