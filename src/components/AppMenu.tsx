import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 280,
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

const AppMenu: React.FC = () => {
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

export default AppMenu;
