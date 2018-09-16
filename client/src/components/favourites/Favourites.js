import React, { Component } from 'react'
import axios from "axios";

class Favourites extends Component {
  onDeleteButtonClick = (e) => {
    if (window.confirm("Are you sure?")) {
      axios.delete("api/favourites/remove/" + e.number)
        .then(res => this.props.deleteFromFaves(e))
        .catch(err => console.log(err));
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
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.props.faveLocations.map(location => {
              return (
                <tr key={location.number}>
                  <td>{location.address}</td>
                  <td>{location.available_bikes}</td>
                  <td>{location.available_bike_stands}</td>
                  <td><button onClick={() => this.onDeleteButtonClick(location)} className="btn btn-warning">Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Favourites;