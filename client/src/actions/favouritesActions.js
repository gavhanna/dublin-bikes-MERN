import axios from "axios";

import { GET_FAVOURITES } from "./types";


export const getFavourites = () => dispatch => {
  axios.get("/api/favourites")
    .then(res => dispatch({
      type: GET_FAVOURITES,
      payload: res.data.locations
    }))
    // .then(() => {
    //   const locations = [];
    //   this.state.locations.forEach(location => {
    //     if (this.isFave(location)) {
    //       locations.push(location);
    //     }
    //   })
    //   this.setState({ faveLocations: locations })
    // })
    .catch(err => console.log(err));
}