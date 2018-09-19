import React, { Component } from 'react'
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
  }

  componentDidMount() {
    this.props.getFavourites();
    this.setState({
      faveNums: this.props.faveNums
    })
  }


  onDeleteButtonClick = (location) => {
    const num = location.target.getAttribute("data-num");

    if (window.confirm("Are you sure?")) {
      this.props.deleteFavourite(location.target.getAttribute("data-num"));
      const newArr = this.state.faveLocations.filter(location => {
        if (location.number !== parseInt(num, 10)) {
          return location;
        }
      })
      this.setState({ faveLocations: newArr })
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.faveLocations &&
          <h1>Saved Locations</h1>
        }
        <FavesTable
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