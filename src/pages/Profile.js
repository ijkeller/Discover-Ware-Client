import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Login from '../components/Login.js'
import Logout from '../components/Logout.js'
import UpdateLocation from '../components/UpdateLocation.js'
import { ReactComponent as HomeIcon } from '../svg/home-svgrepo-com.svg';
import './Profile.css';

const SERVER = process.env.REACT_APP_SERVER;


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'email',
      bio: 'bio',
      favoriteLocations: [
        {
          placename: 'Place Name',
          type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          notes: 'notes',
          lat: 'numbers',
          lon: 'numbers',
          placeimage: 'image'
        }
      ]
    }
  }


  async componentDidMount() {

    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: SERVER,
        url: '/profile'
      }

      const profileResponse = await axios(config);

      console.log('favorites from DB: ', profileResponse.data);

      this.setState({

      })
    }
  }

  handleUpdate = async (locationToUpdate) => {
    try {
      let locationUrl = `${SERVER}/profile`;
      console.log('locationUrl: ', locationUrl);
      let updatedLocation = await axios.put(locationUrl, locationToUpdate);
      
      console.log('updatedLocation: ')
      console.table(updatedLocation)

      let updatedLocationsArray = this.state.favoriteLocations.map(origLocation => {
        return origLocation._id === locationToUpdate._id
        ? updatedLocation.data
        : origLocation
      });
      this.setState({
        favoriteLocations: updatedLocationsArray
      })

    }catch(error) {
      console.log('Update Error: ', error)
    }
  }

  handleDelete = async (locationToDelete) => {
    try {
      console.log('locationToDelete: ', locationToDelete);
      const locationToDeleteResponse = await axios.delete(`${SERVER}/profile/${locationToDelete._id}`);
      console.log('response status: ', locationToDeleteResponse.status);

      const filterLocations = this.state.favoriteLocations.filter(location => {
        return location._id !== locationToDelete._id;
      })

      this.setState({
        favoriteLocations: filterLocations
      })

    }catch(error) {
      console.log('Delete Error: ', error)
    }
  }

  render() {
    return (
      <>

        {
          this.props.auth0.isAuthenticated
            ?
            <div className="profile-container" >
              <div className="profile-information" >
                <Logout />
                <h3>Profile Information</h3>
                <Form>
                  <Form.Group >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" >

                    </Form.Control>
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Bio: </Form.Label>
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
                        <UpdateLocation handleUpdate={this.handleUpdate} location={location} />
                        <Button onClick={this.handleDelete} variant="secondary" >Delete Location</Button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            <>
              <Login />
              <h1>Not Authenticated</h1>
            </>
        }
      </>
    );
  }
}

export default withAuth0(Profile);
