

import { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import Map from '../pages/Map';
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
      center: {
        lat: 0,
        lng: 0
      },
    }
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
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<Map center={this.state.center} />} >
            </Route>
            <Route
              exact path="/profile"
              element={<Profile />} >
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
