import { Component } from 'react'
import MapContainer from '../components/MapContainer';

class Map extends Component {
  render() {
    return <MapContainer center={this.props.center}/>
  }
}

export default Map;
