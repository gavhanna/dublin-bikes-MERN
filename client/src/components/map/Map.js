import React, { Component } from 'react'
// import axios from "axios";
import GoogleMap from "./GoogleMap";
import LocationInfo from "./LocationInfo";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites, setFavourite } from "../../actions/favouritesActions";
import { getLocations } from "../../actions/locationsActions";


class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      infoOpen: false,
      selectedLocation: {},
      isLocationSelected: false,
      //updating: false
    }
  }

  componentDidMount = () => {
    //this.getDublinBikesData();
    this.props.getFavourites();
    this.props.getLocations();
    this.getCurrentPosition();
    console.log("MAP");
    //this.initMarkers();
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

  // initMarkers = () => {
  //   console.log("INIT MARKERS", this.props.locations);
  //   const click = this.onMarkerClick;
  //   const locations = this.props.locations;
  //   const locationMarkers = [];
  //   locations.forEach(location => {
  //     let iconCol = "209cee";
  //     if (location.available_bikes < 4) {
  //       iconCol = "cc4444";
  //     }
  //     if (location.available_bike_stands < 4) {
  //       iconCol = "65BF68";
  //     }
  //     let marker = new window.google.maps.Marker({
  //       position: location.position,
  //       map: window.map,
  //       icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=bicycle|bbT|" + location.available_bikes + "|" + iconCol + "|353535",
  //       //label: String(location.available_bikes),
  //       location: location
  //     });
  //     marker.addListener("click", function () {
  //       click(marker);
  //       window.map.panTo(marker.getPosition());
  //       window.map.setZoom(17);
  //     });
  //     locationMarkers.push(marker);
  //   });
  //   this.setState({ markers: locationMarkers })
  // }



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
          //locations={this.props.locations}
          selectedLocation={this.state.selectedLocation}
          onMarkerClick={this.onMarkerClick}
          faveNums={this.props.faveNums}
          onMapClick={this.onMapClick} />
        <LocationInfo
          location={this.state.selectedLocation}
          isLocationSelected={this.state.isLocationSelected}
          faveLocations={this.props.faveLocations}
          faveNums={this.props.faveNums}
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