import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Helmet } from 'react-helmet';

export interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => (
  <React.Fragment>
    <Helmet>
      {title} | WOL SES Availability
    </Helmet>
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6">
          My Availability
        </Typography>
      </Toolbar>
    </AppBar>
    {children}
  </React.Fragment>
);

export default Page;
