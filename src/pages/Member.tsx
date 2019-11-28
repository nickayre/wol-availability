import ManageMember from './ManageMember';
import NotFound from './NotFound';
import SelectMember from './SelectMember';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Member: React.FC = () => (
  <Switch>
    <Route path='/member/:member/:week?'>
      <ManageMember />
    </Route>
    <Route path='/member' exact>
      <SelectMember />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Member;
