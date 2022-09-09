import { Component } from 'react'
import MapContainer from '../components/MapContainer';

class Map extends Component {
  render() {
    return (
      <MapContainer
        center={this.props.center}
        getMapRef={this.props.getMapRef}
        libraries={this.props.libraries}
        enablePlaces={this.props.enablePlaces}
        mapRef={this.props.mapRef}
      />
    );
  }
}

export default Map;
