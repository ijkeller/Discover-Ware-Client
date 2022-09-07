import { LoadScript, GoogleMap } from '@react-google-maps/api';
import React from 'react';

const libraries = ['places'];

function MapContainer(props) {
  // console.log(props.center);

  const mapStyles = {
    height: "93vh",
    width: "100%"};

  const center = {
    lat: 40,
    lng: -80
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={center}
      >
      </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
