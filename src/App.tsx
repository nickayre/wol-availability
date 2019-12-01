import { AuthProvider, useAuth } from './components/AuthContext';

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Analytics from './components/Analytics';
import Home from './pages/Home';
import LoggingIn from './pages/LoggingIn';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Member from './pages/Member';
import NotFound from './pages/NotFound';
import Rescue from './pages/Rescue';
import Stats from './pages/Stats';
import Storm from './pages/Storm';

const AppRoutes: React.FC = () => {
  const { loading, member } = useAuth();

  if (loading) {
    return <LoggingIn />;
  }

  if (!member) {
    return (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route>
          <Redirect to='/login' />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/login'>
        <Redirect to='/' />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route path='/member'>
        <Member />
      </Route>
      <Route path='/unit/storm'>
        <Storm />
      </Route>
      <Route path='/unit/rescue'>
        <Rescue />
      </Route>
      <Route path='/stats'>
        <Stats />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Analytics ua='UA-9943914-7'>
        <AppRoutes />
      </Analytics>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
