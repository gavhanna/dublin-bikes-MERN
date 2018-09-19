import { GET_FAVOURITES } from "../actions/types";

const initialState = {
  faveLocationsByNumber: [],
  newFave: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        faveLocationsByNumber: action.payload
      }

    default:
      return state;
  }
}