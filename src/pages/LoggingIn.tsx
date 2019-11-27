import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoggingIn: React.FC = () => (
  <div id='logging-in'>
    <Spinner animation='border' className='mb-2' />
    <h1 className='h4'>Wollongong SES Availability</h1>
    <span>Logging in &hellip;</span>
  </div>
);

export default LoggingIn;
