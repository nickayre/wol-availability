import { useAuth } from '../components/AuthContext';

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });

  return <Redirect to='/login' />;
};

export default Logout;
