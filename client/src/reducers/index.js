import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import favouritesReducer from "./favouritesReducer";
import locationsReducer from "./locationsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  favourites: favouritesReducer,
  locations: locationsReducer
});