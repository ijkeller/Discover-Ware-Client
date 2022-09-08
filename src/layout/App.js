import { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Map from '../pages/Map';
import Profile from '../pages/Profile';
import About from '../pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

class App extends Component {
  static libraries = ['places'];

  constructor(props) {
    super(props);
    this.state = {
      mapRef: null,
      center: {
        lat: undefined,
        lng: undefined
      },
    }
  }

  getMapRef = (mapRef) => {
    this.setState({mapRef});
  }

  centerCurrentPosition = async () => {
    const position = await this.getPosition();
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }, () => console.log('App state: ', this.state));
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  componentDidMount = async () => {
    await this.centerCurrentPosition();
  }

  render() {
    return (
      <>
        <Router>
          <Header mapRef={this.state.mapRef} libraries={App.libraries} />
          <Routes>
            <Route
              exact path="/"
              element={<Map center={this.state.center} getMapRef={this.getMapRef} />}
            >
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
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
