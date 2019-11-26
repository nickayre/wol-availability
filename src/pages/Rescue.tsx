import Page from '../components/Page';
import WeekBrowser from '../components/WeekBrowser';

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Rescue: React.FC = () => {
  return (
    <Page title='Rescue'>
      <Tabs id='rescue-tabs' defaultActiveKey='vr' className='mt-1'>
        <Tab eventKey='vr' title='Vertical Rescue'></Tab>
        <Tab eventKey='fr' title='Flood Rescue'></Tab>
      </Tabs>
    </Page>
  );
};

export default Rescue;
