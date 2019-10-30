import MemberTable from './components/MemberTable';
import { getWeekInterval } from './model/dates';

import CssBaseline from '@material-ui/core/CssBaseline';
import { DateTime } from 'luxon';
import React, { Fragment } from 'react';

const App: React.FC = () => (
  <Fragment>
    <CssBaseline />
    <MemberTable interval={getWeekInterval(DateTime.local())} />
  </Fragment>
);

export default App;
