import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { ReactComponent as HomeIcon } from '../svg/home-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from '../svg/person-circle-svgrepo-com.svg';
import { ReactComponent as AboutIcon } from '../svg/question-svgrepo-com.svg';
import { NavLink } from "react-router-dom";
import './Header.css';
import Form from 'react-bootstrap/Form';

class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <h2>DiscoverWare</h2>
        <Form.Control type='search' placeholder='Search' className='search'></Form.Control>
        <Navbar collapseOnSelect expand="lg" variant="secondary">
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Nav>
              <Nav.Link as={NavLink} to="/" className="nav-link">
                <HomeIcon className='icon' />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Profile" className="nav-link">
                <ProfileIcon className='icon' id='profile-icon'/>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/About" className="nav-link">
                <AboutIcon className='icon'/>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default Header;
