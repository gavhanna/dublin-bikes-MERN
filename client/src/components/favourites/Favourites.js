import React, { Component } from 'react'
import axios from "axios";
import classnames from "classnames"
import FavesTable from "./FavesTable";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites, deleteFavourite } from "../../actions/favouritesActions";
import { getLocations } from "../../actions/locationsActions";


class Favourites extends Component {

  constructor() {
    super();
    this.state = {
      faveLocations: [],
      faveNumbers: [],
      faveNums: []
    }
    //this.props.getFavourites();
  }

  componentDidMount() {
    this.props.getFavourites();
    //this.props.getLocations();
    //this.setFaves();
    this.setState({
      faveNums: this.props.faveNums
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.faveLocations !== this.state.faveLocations) {
      //this.setFaves();

    }
    //this.props.getFavourites();
    //this.props.getLocations();
    // this.setState({
    //   faveNums: nextProps.faveNums,
    //   forceUpdate: nextProps
    // })
  }

  onDeleteButtonClick = (location) => {
    // if (window.confirm("Are you sure?")) {
    //   this.props.deleteFavourite(location.number);
    //   this.setState({
    //     faveLocations: this.state.faveLocations
    //   })
    // }
    // console.log(location.target.getAttribute("data-num"));

    // console.log(this.state.faveLocations);
    const num = location.target.getAttribute("data-num");

    if (window.confirm("Are you sure?")) {
      this.props.deleteFavourite(location.target.getAttribute("data-num"));
      const newArr = this.state.faveLocations.filter(location => {
        if (location.number !== parseInt(num)) {
          return location;
        }
      })
      this.setState({ faveLocations: newArr })
    }
  }

  // setFaves() {
  //   console.log(this.props.faveNums);
  //   const fave = this.isFave;
  //   const locations = [];
  //   this.props.locations.forEach(location => {
  //     if (fave(location)) {
  //       locations.push(location);
  //     }
  //   })
  //   this.setState({ faveLocations: locations })
  // }

  // isFave = (location) => {
  //   let fave = false;
  //   if (this.props.faveNums && this.props.faveNums.length > 0) {

  //     this.props.faveNums.forEach(faved => {
  //       if (location.number === faved) {
  //         fave = true;
  //       }
  //     })
  //     return fave;
  //   }
  // }

  render() {
    return (
      <div className="container">
        {this.props.faveLocations &&
          <h1>Saved Locations</h1>
        }
        {/* <table className="table">
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
        </table> */}
        <FavesTable
          //faveLocations={this.state.faveLocations}
          faveNums={this.props.faveNums}
          locations={this.props.locations}
          onDeleteButtonClick={this.onDeleteButtonClick} />
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

export default connect(mapStateToProps, { getFavourites, deleteFavourite, getLocations })(Favourites);