import { Component } from "react";
// import { withAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Login from '../components/Login.js'
import Logout from '../components/Logout.js'
import { ReactComponent as HomeIcon } from '../svg/home-svgrepo-com.svg';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'name',
      bio: 'bio',
      favoriteLocations: [
        {
          placename: 'Place Name',
          type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          lat: 'numbers',
          lon: 'numbers',
          placeimage: 'image'
        },
        {
          placename: 'Place Name',
          type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          lat: 'numbers',
          lon: 'numbers',
          placeimage: 'image'
        },
        {
          placename: 'Place Name',
          type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          lat: 'numbers',
          lon: 'numbers',
          placeimage: 'image'
        },
        {
          placename: 'Place Name',
          type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          lat: 'numbers',
          lon: 'numbers',
          placeimage: 'image'
        }
      ]
    }
  }




  handleUpdate = () => {
    console.log('update location')

  }

  handleDelete = () => {
    console.log('delete locatoin')

  }

  componentDidMount() {
    // this.getFavorites();
  }

  render() {
    return (
      <>

        <Login />
        <Logout />
        {
          this.props.isAuthenticated
            ?
            <div className="profile-container" >
              <div className="profile-information" >
                <h3>Profile Information</h3>
                <Form>
                  <Form.Group >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" >

                    </Form.Control>
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Biography: </Form.Label>
                    <Form.Control type="textarea" rows={4}></Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <div className="favorite-locations" >
                <h3>Favorite Locations</h3>
                {
                  this.state.favoriteLocations.map((location, idx) => {
                    return (
                      <div className="favorites-card" key={idx} >
                        <h3 className="location-name">{location.placename}</h3>
                        <HomeIcon className="location-image" />
                        <p className="location-type">{location.type}</p>
                        <Button onClick={this.handleUpdate} variant="secondary" >Update</Button>
                        <Button onClick={this.handleDelete} variant="secondary" >Delete</Button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            false
        }
      </>
    );
  }
}

export default Profile;
