import React, { Component } from 'react'
import axios from "axios";
import GoogleMap from "./GoogleMap";
import LocationInfo from "./LocationInfo";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      //locations: [],
      infoOpen: false,
      selectedLocation: {},
      isLocationSelected: false,
      //updating: false
    }
  }

  componentDidMount = () => {
    //this.getDublinBikesData();
    this.getCurrentPosition();
    window.map.addListener("click", (e) => {
      this.onMapClick(e);
    });
  }

  // getDublinBikesData = () => {
  //   this.setState({ updating: true })
  //   axios.get("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=ef653629fed566ec812f1444f8bb2b3ddc6e1bbf")
  //     .then(res => this.setState({
  //       locations: res.data
  //     }))
  //     .then(() => this.setState({ updating: false }))
  // }

  onMarkerClick = (marker) => {
    this.setState({
      selectedLocation: marker.location,
      isLocationSelected: true
    })
  }

  onMapClick = (e) => {
    if (e.latLng) {
      this.setState({ isLocationSelected: false })
    }
  }

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let initialLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        window.map.setCenter(initialLocation);
        new window.google.maps.Marker({
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          map: window.map,
          icon: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=glyphish_user|65bf68|",
        });
      });
    }
  }

  render() {
    return (
      <div>
        <GoogleMap
          locations={this.props.locations}
          selectedLocation={this.state.selectedLocation}
          onMarkerClick={this.onMarkerClick}
          onMapClick={this.onMapClick} />
        <LocationInfo
          location={this.state.selectedLocation}
          isLocationSelected={this.state.isLocationSelected}
          faveLocations={this.props.faveLocations}
          faveNums={this.props.faveNums} />
      </div>
    )
  }
}

export default Map;