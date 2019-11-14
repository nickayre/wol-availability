import AppMenu from '../components/AppMenu';
import { useAuth } from '../components/AuthContext';
import { getNameInitials } from '../utils/display';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  const { member } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>();

  const classes = useStyles();

  return (
    <div>
      <Helmet>
        {title} | WOL SES Availability
      </Helmet>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton onClick={e => setMenuAnchor(e.currentTarget)}>
            <Avatar>
              {member ? getNameInitials(member.fullName) : ''}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem component={Link} to="/member">My Availability</MenuItem>
            <MenuItem component={Link} to="/logout">Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <AppMenu />
      </Drawer>
      {children}
    </div>
  );
};

export default Page;
