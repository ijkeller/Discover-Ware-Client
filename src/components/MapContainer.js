import { LoadScript, GoogleMap } from '@react-google-maps/api';

function MapContainer(props) {

  const mapStyles = {
    height: "93vh",
    width: "100%"
  };
  const center = {
    lat: props.center.lat || 47.6062095,
    lng: props.center.lng || -122.3320708
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={props.libraries}
      onLoad={() => props.enablePlaces()}
    >
      <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={8}
      center={center}
      onLoad={map => {
        props.getMapRef(map);
        props.enablePlaces();
      }}>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
