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
      name: '-------',
      email: '-------',
      picture: '-------',
      favoriteLocations: [
        {
          name: 'name',
          address: 'address',
          image: 'image',
          types: ['type', 'type'],
          lat: 45,
          lng: 54,
          place_id: 7524
        }
      ]
    }
  }

  async componentDidMount() {

    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      console.log ('res: ', res);
      const jwt = res.__raw;

      console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: SERVER,
        url: '/place'
      }

      const profileResponse = await axios(config);

      console.log('favorites from DB: ');
      console.table(profileResponse.data)

      this.setState({
        favoriteLocations: profileResponse.data,
        name: res.name,
        email: res.email,
        picture: res.picture
      })
    }
  }

  getLocations = async () => {
    try {
      let getLocationData = await axios.get(`${SERVER}/place`)
      console.log('getLocationData.data: ')
      console.table(getLocationData.data)
      this.setState({ favoriteLocations: getLocationData.data })
    } catch (error) {
      console.log("Get Error: ", error.response)
    }
  }

  handleUpdate = async (locationToUpdate) => {
    try {
      let locationUrl = `${SERVER}/place`;
      console.log('locationUrl: ', locationUrl);
      let updatedLocation = await axios.put(locationUrl, locationToUpdate);

      console.log('updatedLocation: ')
      console.table(updatedLocation)

      this.getLocations()

      // let updatedLocationsArray = this.state.favoriteLocations.map(origLocation => {
      //   return origLocation._id === locationToUpdate._id
      //     ? updatedLocation.data
      //     : origLocation
      // });
      // this.setState({
      //   favoriteLocations: updatedLocationsArray
      // })

    } catch (error) {
      console.log('Update Error: ', error.response)
    }
  }

  handleDelete = async (locationToDelete) => {
    try {
      console.log('locationToDelete: ', locationToDelete);
      const locationToDeleteResponse = await axios.delete(`${SERVER}/place/${locationToDelete._id}`);
      console.log('response status: ', locationToDeleteResponse.status);

      this.getLocations();

      // const filterLocations = this.state.favoriteLocations.filter(location => {
      //   return location._id !== locationToDelete._id;
      // })

      // this.setState({
      //   favoriteLocations: filterLocations
      // })

    } catch (error) {
      console.log('Delete Error: ', error.response)
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
