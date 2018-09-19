import axios from "axios";

import { GET_FAVOURITES, ADD_FAVOURITE, DELETE_FAVOURITE, FAVOURITES_LOADING } from "./types";


export const getFavourites = (callback) => dispatch => {
  dispatch(setFavouritesLoading());
  axios.get("/api/favourites")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_FAVOURITES,
        payload: [...res.data.locations]
      })
    }, callback)
    .catch(err => console.log(err));
}

export const setFavourite = (num) => dispatch => {
  dispatch(setFavouritesLoading());
  axios.post("/api/favourites/add", { location: num })
    .then(fave => {
      dispatch({
        type: ADD_FAVOURITE,
        payload: fave.data
      })
    })
    .catch(err => console.log(err))
}

export const deleteFavourite = (num) => dispatch => {
  dispatch(setFavouritesLoading());
  axios.delete("api/favourites/remove/" + num)
    .then(res => dispatch({
      type: DELETE_FAVOURITE,
      payload: res.data
    }))
    .catch(err => console.log(err));
}

export const setFavouritesLoading = () => {
  return {
    type: FAVOURITES_LOADING
  }
}