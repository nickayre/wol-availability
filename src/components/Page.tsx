import { useAuth } from '../components/AuthContext';
import { getNameInitials } from '../utils/display';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import WarningIcon from '@material-ui/icons/Warning';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 280,
  },
  title: {
    flexGrow: 1,
  },
}));

interface MenuItemProps extends LinkProps {
  to: string;
  exact?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, exact, ...props }) => {
  const matches = useRouteMatch({ path: to, exact }) !== null;

  return (
    <ListItem button selected={matches} component={Link} to={to} {...props} />
  );
};

const MenuList: React.FC = () => {
  const classes = useStyles();

  return (
    <List className={classes.menu}>
      <MenuItem to="/" exact>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText>Home</ListItemText>
      </MenuItem>
      <MenuItem to="/member">
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText>My Availability</ListItemText>
      </MenuItem>
      <Divider />
      <ListSubheader>Unit</ListSubheader>
      <MenuItem to="/unit/storm">
        <ListItemIcon><FlashOnIcon /></ListItemIcon>
        <ListItemText>Storm and Support</ListItemText>
      </MenuItem>
      <MenuItem to="/unit/rescue">
        <ListItemIcon><WarningIcon /></ListItemIcon>
        <ListItemText>Rescue</ListItemText>
      </MenuItem>
      <MenuItem to="/unit/statistics">
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText>Statistics</ListItemText>
      </MenuItem>
    </List>
  );
};

export interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const { member } = useAuth();

  const classes = useStyles();

  return (
    <div>
      <Helmet>
        {title} | WOL SES Availability
      </Helmet>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Avatar>
            {member ? getNameInitials(member.fullName) : ''}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={closeMenu}>
        <MenuList />
      </Drawer>
      {children}
    </div>
  );
};

export default Page;
