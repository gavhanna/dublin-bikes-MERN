import React, { Component } from 'react'
import axios from "axios";

class Favourites extends Component {
  constructor() {
    super();
    // this.state = {
    //   faveNums: [],
    //   faveLocations: []
    // }
  }

  // componentDidMount() {
  //   this.getFaves();

  // }

  // getFaves = () => {
  //   axios.get("/api/favourites")
  //     .then(res => this.setState({ faveNums: res.data.locations }))
  //     .then(() => {
  //       const locations = [];
  //       this.props.locations.forEach(location => {
  //         if (this.state.faveNums.includes(parseInt(location.number))) {
  //           locations.push(location);
  //         }
  //       })
  //       this.setState({ faveLocations: locations })
  //     })
  //     .catch(err => console.log(err));
  // }

  // componentWillReceiveProps() {
  //   this.getFaves();
  // }


  render() {

    return (
      <div className="container">
        {this.props.faveLocations &&
          <h1>Saved Locations</h1>
        }

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">Bikes</th>
              <th scope="col">Spaces</th>
            </tr>
          </thead>
          <tbody>


            {this.props.faveLocations.map(location => {
              return (
                <tr key={location.id}>
                  <th scope="row">{location.number}</th>
                  <td>{location.address}</td>
                  <td>{location.available_bikes}</td>
                  <td>{location.available_bike_stands}</td>
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