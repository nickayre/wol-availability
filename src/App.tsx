import { AuthConsumer, AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import LoggingIn from './pages/LoggingIn';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Member from './pages/Member';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <AuthConsumer>
      {({ loading, member }) => {
        if (loading) {
          return <LoggingIn />;
        }

        if (!member) {
          return (
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route>
                <Redirect to="/login" />
              </Route>
            </Switch>
          );
        }

        return (
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Redirect to="/" />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/member">
              <Member />
            </Route>
          </Switch>
        );
      }}
    </AuthConsumer>
  </BrowserRouter>
);

const App: React.FC = () => (
  <AuthProvider>
    <CssBaseline />
    <AppRouter />
  </AuthProvider>
);

export default App;
