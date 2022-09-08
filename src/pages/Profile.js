import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
// import Form from 'react-bootstrap/Form';
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
      name: 'initial state',
      email: 'initial state',
      picture: 'initial state',
      favoriteLocations: [
        {
          name: 'initial state',
          address: 'initial state',
          image: 'initial state',
          types: ['initial state', 'initial state'],
          lat: 45,
          lng: 45,
          place_id: 4545
        }
      ]
    }
  }

  componentDidMount = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const token = res.__raw;
        this.setState({
          name: res.name,
          email: res.email,
          picture: res.picture
        });
        this.getLocations(token);
      }
    } catch (error) {
      console.error('Error in Profile.js componentDidMount', error);
    }
  }

  getLocations = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
        baseURL: SERVER,
        url: '/place'
      }
      const getLocationData = await axios(config);
      this.setState({
        favoriteLocations: getLocationData.data
      })
    } catch (error) {
      console.error("Error in getLocations: ", error);
    }
  }

  handleUpdate = async (locationToUpdate) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'put',
        baseURL: SERVER,
        url: `/place/${locationToUpdate._id}`,
        data: locationToUpdate
      }
      const updatedLocation = await axios(config);
      console.log('updatedLocation: ');
      console.table(updatedLocation);
      this.getLocations(token)

      // let updatedLocationsArray = this.state.favoriteLocations.map(origLocation => {
      //   return origLocation._id === locationToUpdate._id
      //     ? updatedLocation.data
      //     : origLocation
      // });
      // this.setState({
      //   favoriteLocations: updatedLocationsArray
      // })

    } catch (error) {
      console.error('Error in handleUpdate: ', error);
    }
  }

  handleDelete = async (locationToDelete) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete',
        baseURL: SERVER,
        url: `/place/${locationToDelete._id}`
      }
      const locationToDeleteResponse = await axios(config);
      console.log('Delete response status: ', locationToDeleteResponse.status);
      this.getLocations(token);
    } catch (error) {
      console.error('Error in handleDelete: ', error);
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
                <h4>{this.state.name}</h4>
                <p>{this.state.email}</p>
                <img src={this.state.picture} alt={` - ${this.state.name} - pic`} />
                {/* <Form>
                  <Form.Group >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" >

                    </Form.Control>
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Bio: </Form.Label>
                    <Form.Control type="textarea" rows={4}></Form.Control>
                  </Form.Group>
                </Form> */}
              </div>
              <div className="favorite-locations" >
                <h3>Favorite Locations</h3>
                {
                  this.state.favoriteLocations.map((location, idx) => {
                    return (
                      <div className="favorites-card" key={idx} >
                        <h3 className="location-name">{location.name}</h3>
                        <p className="address" >{location.address}</p>
                        {/* <p className="notes" >{location.notes}</p> */}
                        {/* <p className="location-type">{location.types.split(', ')}</p> */}
                        <HomeIcon className="location-image" />
                        {/* <img src={location.image} alt={location.name} /> */}
                        <UpdateLocation handleUpdate={this.handleUpdate} location={location} />
                        <Button onClick={() => this.handleDelete(location)} variant="secondary" >Delete Location</Button>
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
