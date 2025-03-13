import React from 'react';
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Task Management App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <NavLink as={Link} to="/protected/dashboard">Dashboard</NavLink>
                <NavLink as={Link} to="/protected/tasks/create">Create Task</NavLink>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated && <Logout />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
