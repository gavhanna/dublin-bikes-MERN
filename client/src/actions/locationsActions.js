import axios from "axios";

import { GET_LOCATIONS } from "./types";


export const getLocations = () => dispatch => {

  axios.get("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=ef653629fed566ec812f1444f8bb2b3ddc6e1bbf")
    .then(res => dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    }))
    .catch(err => console.log(err))
}