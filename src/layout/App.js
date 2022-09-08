

import { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import Map from '../pages/Map';
// import axios from 'axios';
import Profile from '../pages/Profile';
import About from '../pages/About';
// import Login from '../components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      center: {
        lat: 0,
        lng: 0
      },
    }
  }

  updateToken = async (propsToken) => {
    // const token = await this.props.auth0.getIdTokenClaims()
    // console.log('Apps recieved token/ __raw: ', token.__raw)
    this.setState({ token: propsToken })
  }

  centerCurrentPosition = async () => {
    const coords = await this.getPosition();
    console.log(coords);
    this.setState({
      center: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  render() {
    console.log('Apps state', this.state.token)
    return (
      <>
        <Router>
          <Header token={this.state.token} />
          <Routes>
            <Route
              exact path="/"
              element={<Map center={this.state.center} />} >
            </Route>
            <Route
              exact path="/profile"
              element={<Profile updateToken={this.updateToken} token={this.state.token} />} >
            </Route>
            <Route
              exact path="/about"
              element={<About />} >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
