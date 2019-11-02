import Member from './pages/Member';

import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App: React.FC = () => (
  <Fragment>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/member">
          <Member />
        </Route>
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default App;
