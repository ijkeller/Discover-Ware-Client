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
      placesIsEnabled: false,
      mapRef: null,
      center: {
        lat: undefined,
        lng: undefined
      },
    }
  }

  enablePlaces = () => {
    this.setState({
      placesIsEnabled: true
    });
  }

  disablePlaces = () => {
    this.setState({
      placesIsEnabled: false
    });
  }

  getMapRef = (mapRef) => {
    this.setState({mapRef});
  }

  setCenter = async (coords) => {
    this.setState({
      center: coords
    });
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  componentDidMount = async () => {
    this.enablePlaces();
    const position = await this.getPosition();
    this.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }

  render() {
    return (
      <>
        <Router>
          <Header
            mapRef={this.state.mapRef}
            libraries={App.libraries}
            placesIsEnabled={this.state.placesIsEnabled}
          />
          <Routes>
            <Route
              exact path="/"
              element={
                <Map
                  center={this.state.center}
                  getMapRef={this.getMapRef}
                  mapRef={this.state.mapRef}
                  libraries={App.libraries}
                  enablePlaces={this.enablePlaces}
                />
              }
            >
            </Route>
            <Route
              exact path="/profile"
              element={
                <Profile
                  disablePlaces={this.disablePlaces}
                  mapRef={this.state.mapRef}
                  setCenter={this.setCenter}
                />
              }
            >
            </Route>
            <Route
              exact path="/about"
              element={
                <About
                  disablePlaces={this.disablePlaces}
                />
              }
            >
            </Route>
          </Routes>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
