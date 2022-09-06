import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from '../pages/Map';
import Profile from '../pages/Profile';
import About from '../pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

class App extends Component {
  
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<Map />} >
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

export default App;
