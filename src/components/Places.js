import { Form } from 'react-bootstrap';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

const libraries = ['places'];

class Places extends Component {
  constructor (props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      name: '',
      address: '',
      image: '',
      types: [],
      lat: 0,
      lng: 0
    };
  }

  onLoad = (autocomplete) => {
    // console.log('autocomplete: ', autocomplete);
    this.autocomplete = autocomplete;
  }

  onPlaceChanged = () => {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      // console.log(place);
      this.setState({
        place_id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        image: place.photos[0].getUrl(),
        types: [...place.types],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }, () => {
        // console.log('State: ', this.state);
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }

  savePlace = async () => {
    try {
      if (this.state.name === '') {
        return undefined;
      } else {
        const placeBaseURL = `${process.env.REACT_APP_SERVER_URL}/place`;
        await axios.post(placeBaseURL, this.state);
      }
    } catch (error) {
      console.log('Error in savePlace', error);
    }
  }

  render() {
    return (
      <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <Autocomplete
        onLoad={this.onLoad}
        onPlaceChanged={this.onPlaceChanged}
      >
        <Form.Control type='search' placeholder='Search' className='search'></Form.Control>
      </Autocomplete>
      {
        this.props.auth0.isAuthenticated && <Button variant='secondary' onClick={this.savePlace}>Save Place</Button>
      }
    </LoadScript>
    );
  }
}

export default withAuth0(Places);
