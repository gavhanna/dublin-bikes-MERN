import { GET_FAVOURITES, ADD_FAVOURITE, DELETE_FAVOURITE, FAVOURITES_LOADING } from "../actions/types";

const initialState = {
  faveLocationsByNumber: [],
  newFave: "",
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FAVOURITES_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_FAVOURITES:
      return {
        ...state,
        faveLocationsByNumber: action.payload,
        loading: false
      }
    case ADD_FAVOURITE:
      return {
        ...state,
        newFave: action.payload,
        faveLocationsByNumber: [...state.faveLocationsByNumber, action.payload],
        loading: false
      }
    case DELETE_FAVOURITE:
      return {
        ...state,
        faveLocationsByNumber: action.payload,
        newFave: "",
        loading: false
      }
    default:
      return state;
  }
}