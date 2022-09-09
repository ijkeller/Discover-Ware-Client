import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logout from '../components/Logout.js';
import Login from '../components/Login.js';
import { ReactComponent as HomeIcon } from '../svg/home-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from '../svg/person-circle-svgrepo-com.svg';
import { withAuth0 } from '@auth0/auth0-react';
import { ReactComponent as AboutIcon } from '../svg/question-svgrepo-com.svg';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Places from '../components/Places';

class Header extends Component {
  render() {
    return (
      <header className='Header'>
        <h2>DiscoverWare</h2>
        <Places mapRef={this.props.mapRef} libraries={this.props.libraries}
          placesIsEnabled={this.props.placesIsEnabled}
        />
        <Navbar expand="lg" variant="secondary">
          <Container>
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
            { this.props.auth0.isAuthenticated ? <Logout /> : <Login />}
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default withAuth0(Header);
