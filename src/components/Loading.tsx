import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = ({ children }) => (
  <div className='loading'>
    <Spinner animation='border' className='mb-1' /> {children}
  </div>
);

export default Loading;
