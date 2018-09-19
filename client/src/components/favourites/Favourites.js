import React, { Component } from 'react'
import axios from "axios";
import classnames from "classnames"
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites } from "../../actions/favouritesActions";
import { getLocations } from "../../actions/locationsActions";


class Favourites extends Component {

  constructor() {
    super();
    this.state = {
      faveLocations: []
    }
    //this.props.getFavourites();
  }

  componentDidMount() {
    this.props.getFavourites();
    this.props.getLocations();
    this.setFaves();
  }

  componentWillReceiveProps() {
    this.props.getFavourites();
    this.props.getLocations();
    this.setFaves();
  }

  onDeleteButtonClick = (e) => {
    if (window.confirm("Are you sure?")) {
      axios.delete("api/favourites/remove/" + e.number)
        .then(res => this.props.deleteFromFaves(e))
        .catch(err => console.log(err));
    }
  }

  setFaves() {
    const fave = this.isFave;
    const locations = [];
    this.props.locations.forEach(location => {
      if (fave(location)) {
        locations.push(location);
      }
    })
    this.setState({ faveLocations: locations })
  }

  addToFaves = (location) => {
    this.setState({
      // faveNums: [...this.state.faveNums, location.number],
      faveLocations: [...this.state.faveLocations, location]
    })
  }

  isFave = (location) => {
    let fave = false;
    if (this.props.faveNums && this.props.faveNums.length > 0) {

      this.props.faveNums.forEach(faved => {
        if (location.number === faved) {
          fave = true;
        }
      })
      return fave;
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.faveLocations &&
          <h1>Saved Locations</h1>
        }
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Bikes</th>
              <th scope="col">Spaces</th>
              <th scope="col">Unfavourite</th>
            </tr>
          </thead>
          <tbody>
            {this.state.faveLocations.map(location => {
              return (
                <tr key={location.number}>
                  <td>{location.address}</td>
                  <td className={classnames("", {
                    "red": location.available_bikes < 4
                  })}>{location.available_bikes}</td>
                  <td className={classnames("", {
                    "red": location.available_bike_stands < 4
                  })}>{location.available_bike_stands}</td>
                  <td><button onClick={() => this.onDeleteButtonClick(location)} className="btn btn-warning">Remove</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


Favourites.propTypes = {
  auth: PropTypes.object.isRequired,
  faveNums: PropTypes.array,
  locations: PropTypes.array
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  faveNums: state.favourites.faveLocationsByNumber,
  locations: state.locations.locations
})

export default connect(mapStateToProps, { getFavourites, getLocations })(Favourites);