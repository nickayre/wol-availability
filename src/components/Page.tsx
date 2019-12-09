import logo from '../assets/logo.svg';
import { useAuth } from '../components/AuthContext';

import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLinkProps, useRouteMatch } from 'react-router-dom';

export interface PageProps {
  title: string;
  heading?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <LinkContainer {...props}>
    <Nav.Link>{children}</Nav.Link>
  </LinkContainer>
);

const UnitNavDropdown: React.FC = () => {
  const active = useRouteMatch('/unit') !== null;

  return (
    <NavDropdown id='unit' title='Unit' className={active ? 'active' : null}>
      <LinkContainer to='/unit/storm'>
        <NavDropdown.Item>Storm and Support</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Divider />
      <LinkContainer to='/unit/vr'>
        <NavDropdown.Item>Vertical Rescue</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/unit/fr'>
        <NavDropdown.Item>Flood Rescue</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );
};

const Page: React.FC<PageProps> = ({ title, heading, children }) => {
  const { member } = useAuth();

  useEffect(() => {
    document.title = `${title} | WOL SES Availability`;
  });

  return (
    <React.Fragment>
      <Navbar bg='dark' className='Header' expand='md' variant='dark'>
        <Navbar.Brand>
          <Link to='/'>
            <img src={logo} alt='SES Logo' width={20} height={20} />
          </Link>
          {' '}{heading !== undefined ? heading : title}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/member'>Member</NavLink>
            <UnitNavDropdown />
            <NavLink to='/stats'>Statistics</NavLink>
          </Nav>
          <Nav className='ml-auto'>
            <NavDropdown
              id='nav-dropdown-user'
              title={<><FaUser /> {member ? member.fullName : ''}</>}
            >
              <LinkContainer to='/member/me'>
                <NavDropdown.Item>My availability</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/logout'>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </React.Fragment>
  );
};

export default Page;
