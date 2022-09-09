import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UpdateLocation from '../components/UpdateLocation.js';
import Login from '../components/Login.js';
import ImgCarousel from '../components/ImgCarousel';
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
          notes: '',
          images: [],
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
      this.props.disablePlaces();
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
      console.log('-------getLocationData.data------')
      console.log(getLocationData.data)
      console.log(getLocationData.data[0].images)
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
      this.getLocations(token);

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
                <h3 className="profile-title">Profile Information</h3>
                <h4 className="profile-name">{this.state.name}</h4>
                <p className="profile-email">{this.state.email}</p>
                <img className="profile-img" src={this.state.picture} alt={` - ${this.state.name} - pic`} />
              </div>
              <div className="favorite-locations" >
                <h3>Favorite Locations</h3>
                {
                  this.state.favoriteLocations.map((location, idx) => {
                    return (
                      <div className="favorites-card" key={idx} >
                        <h3 className="location-name">{location.name}</h3>
                        <h4 className="address" >{location.address}</h4>
                        <div className="notes-title" >Notes:
                            <p className="notes">{location.notes}</p>
                        </div>
                        <p className="types" >Type: {location.types.join(', ')} </p>
                        <div className="carousel-container" >
                          <ImgCarousel location={location} />
                        </div>
                        <UpdateLocation handleUpdate={this.handleUpdate} location={location} />
                        <Button className="button delete-button" onClick={() => this.handleDelete(location)} size="sm" variant="danger" >Delete Location</Button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            <>
              <h1>Please Sign In</h1>
              <Login />
            </>
        }
      </>
    );
  }
}

export default withAuth0(Profile);
