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

  // to logout user
  const handleLogout = () => {
    fetch('http://localhost:5000/logout', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }
    })
      localStorage.removeItem("token");
      setUser(null);
      navigate('/', {replace: true});
    };

  // to reconfirm log out when user pressed the logout button
  function confirmLogout() {
    swal({
      title: "Warning",
      text: "Do you really wish to log out?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    })
    .then((Logout) => {
      if (Logout) {
        handleLogout();
        swal("Logged out successfully!", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      } 
    });
  }

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
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>{" "}
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </>
          )}
          {user && ( // if user is logged in, display these navbar link buttons
            <>
              <LinkContainer to="/favorites">
                <Nav.Link>Favorites</Nav.Link>
              </LinkContainer>{" "}
              <Nav.Link onClick={confirmLogout}>Logout</Nav.Link>
            </>
          )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;