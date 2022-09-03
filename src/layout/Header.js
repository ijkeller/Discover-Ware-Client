import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { NavLink } from "react-router-dom";
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Nav>
              <Nav.Link as={NavLink} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/Profile" className="nav-link">Profile</Nav.Link>
              <Nav.Link as={NavLink} to="/About" className="nav-link">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default Header;
