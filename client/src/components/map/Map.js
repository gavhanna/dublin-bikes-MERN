import React, { Component } from 'react'
import GoogleMap from "./GoogleMap";
import LocationInfo from "./LocationInfo";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites } from "../../actions/favouritesActions";
import { getLocations } from "../../actions/locationsActions";


class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      infoOpen: false,
      selectedLocation: {},
      isLocationSelected: false,
    }
  }

  componentDidMount = () => {
    // this.props.getFavourites();
    // this.props.getLocations();
    this.getCurrentPosition();
    window.map.addListener("click", (e) => {
      this.onMapClick(e);
    });
  }

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
          selectedLocation={this.state.selectedLocation}
          onMarkerClick={this.onMarkerClick}
          faveNums={this.props.faveNums}
          onMapClick={this.onMapClick} />
        <LocationInfo
          location={this.state.selectedLocation}
          isLocationSelected={this.state.isLocationSelected}
          faveLocations={this.props.faveLocations}
          //faveNums={this.props.faveNums}
          addToFaves={this.props.addToFaves} />
      </div>
    )
  }
}

Map.propTypes = {
  auth: PropTypes.object.isRequired,
  faveNums: PropTypes.array,
  locations: PropTypes.array
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  faveNums: state.faveLocationsByNumber,
  locations: state.locations.locations
})

export default connect(mapStateToProps, { getFavourites, getLocations })(Map);