import logo from '../assets/logo.svg';
import { useAuth } from '../components/AuthContext';

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Helmet } from 'react-helmet';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLinkProps } from 'react-router-dom';

export interface PageProps {
  title: string;
  heading?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <LinkContainer {...props}>
    <Nav.Link>{children}</Nav.Link>
  </LinkContainer>
);

const Page: React.FC<PageProps> = ({ title, heading, children }) => {
  const { member } = useAuth();

  console.log(title);

  return (
    <React.Fragment>
      <Helmet>
        {title} | WOL SES Availability
      </Helmet>
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
            <NavDropdown id='unit' title='Unit'>
              <LinkContainer to='/unit/storm'>
                <NavDropdown.Item>Storm and Support</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/unit/rescue'>
                <NavDropdown.Item>Rescue</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
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
