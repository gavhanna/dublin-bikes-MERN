import React, { Component } from 'react'
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites } from "../../actions/favouritesActions";
import { getLocations } from "../../actions/locationsActions";


class GoogleMap extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    }
  }

  componentWillUnmount() {
    this.removeMarkers(this.state.markers);
  }

  componentDidMount() {
    this.initMap();
    this.props.getLocations();
    console.log("GOOGLEMAP");
  }

  initMap = () => {
    const google = window.google;
    let loc = {
      lat: 53.350929,
      lng: -6.265125
    };
    window.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: loc
    });
    this.initMarkers();
  }

  initMarkers = () => {
    const click = this.props.onMarkerClick;
    const locations = this.props.locations;
    const locationMarkers = [];
    locations.forEach(location => {
      let iconCol = "209cee";
      if (location.available_bikes < 4) {
        iconCol = "cc4444";
      }
      if (location.available_bike_stands < 4) {
        iconCol = "65BF68";
      }
      let marker = new window.google.maps.Marker({
        position: location.position,
        map: window.map,
        icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=bicycle|bbT|" + location.available_bikes + "|" + iconCol + "|353535",
        //label: String(location.available_bikes),
        location: location
      });
      marker.addListener("click", function () {
        click(marker);
        window.map.panTo(marker.getPosition());
        window.map.setZoom(17);
      });
      locationMarkers.push(marker);
    });
    this.setState({ markers: locationMarkers })
  }

  removeMarkers = (markers) => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.markers.length > 0) {
      this.removeMarkers(this.state.markers);
    }
    this.initMarkers();
  }

  render() {
    return (
      <div
        id="map"
      >
      </div>
    )
  }
}

GoogleMap.propTypes = {
  auth: PropTypes.object.isRequired,
  faveNums: PropTypes.array,
  locations: PropTypes.array
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  faveNums: state.faveLocationsByNumber,
  locations: state.locations.locations
})

export default connect(mapStateToProps, { getFavourites, getLocations })(GoogleMap);