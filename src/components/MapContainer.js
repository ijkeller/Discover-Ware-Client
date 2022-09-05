import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapContainer() {

  const mapStyles = {
    height: "90vh",
    width: "100%"};

  const defaultCenter = {
    lat: 47, 
    lng: -122
  }

  return (
     <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
