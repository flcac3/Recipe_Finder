import React, {useContext } from 'react';
import swal from 'sweetalert';
import NavbarLogo from './/navbar_logo.png';
import {Nav, Navbar, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { MyContext } from '../../context';
import { useNavigate } from 'react-router-dom';

function AppNavbar() {
  const navigate = useNavigate();
  const {user, setUser} = useContext(MyContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand onClick="window.location.reload()">
            <img
                alt="Logo"
                src={NavbarLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}Recipe Finder
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto"></Nav>
            <Nav>
              <LinkContainer to="/">
                <Nav.Link onClick="window.location.reload()">Home</Nav.Link>
              </LinkContainer>
          {!user && ( // if user is not logged in, display these navbar link buttons
            <>
              <LinkContainer to="/login">
                <Nav.Link>Account</Nav.Link>
              </LinkContainer>{" "}
              <></>
              <LinkContainer to="/favorites">
                <Nav.Link>Favorites</Nav.Link>
              </LinkContainer>{" "}
            </>
            
          )}
          {user && ( // if user is logged in, display these navbar link buttons
            <>
            <LinkContainer to="/login">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>{" "}
          </>
          )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;