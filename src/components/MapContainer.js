import { LoadScript, GoogleMap } from '@react-google-maps/api';
import React from 'react';

const libraries = ['places'];

function MapContainer(props) {
  const mapStyles = {
    height: "93vh",
    width: "100%"
  };
  const center = {
    lat: props.center.lat || 47.6062095,
    lng: props.center.lng || -122.3320708
  }
  console.log(center);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        onLoad={map => props.getMapRef(map)}
        mapContainerStyle={mapStyles}
        zoom={8}
        center={center}
      >
      </GoogleMap>
     </LoadScript>
  );
}

export default MapContainer;
