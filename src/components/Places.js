import { Form } from 'react-bootstrap';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Places(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [lat, setLat] = useState(47.6180106);
  const [lng, setLng] = useState(-122.3516264);
  const [placeId, setPlaceId] = useState('');
  const [autoComplete, setAutoComplete] = useState(null);

  const { getIdTokenClaims, isAuthenticated } = useAuth0();

  const onLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  }

  const onPlaceChanged = () => {
    if (autoComplete !== null && props.mapRef !== null) {
      const place = autoComplete.getPlace();
      const newLat = place.geometry.location.lat();
      const newLng = place.geometry.location.lng();
      let photos = place.photos.map(photo => photo.getUrl());
      if (photos.length === 0) photos = ['../assets/defaultPlaceImage.png'];
      setName(place.name);
      setAddress(place.formatted_address);
      setImages(photos);
      setTypes([...place.types]);
      setLat(newLat);
      setLng(newLng);
      setPlaceId(place.place_id);
      props.mapRef.setCenter({lat: newLat, lng: newLng});
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }

  const savePlace = async () => {
    try {
      if (autoComplete === null) {
        console.log("state is not defined yet");
        return;
      } else {
        const res = await getIdTokenClaims();
        const token = res.__raw;
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/place',
          data: {
            name,
            address,
            images,
            types,
            lat,
            lng,
            place_id: placeId
          }
        };
        const postResponse = await axios(config);
        console.log('postResponse.data: ', postResponse.data);
      }
    } catch (error) {
      console.error('Error in savePlace', error);
    }
  }

  return (
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={props.libraries}
    >
      {
        props.placesIsEnabled &&
          <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}>
            <Form.Control type='search' placeholder='Search' className='search'></Form.Control>
          </Autocomplete>
      }
      {
        isAuthenticated && props.placesIsEnabled &&
          <Button variant='secondary' onClick={savePlace}>Save Place</Button>
      }
    </LoadScript>
  );
}

export default Places;
