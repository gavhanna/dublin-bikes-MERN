import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getFavourites } from "./actions/favouritesActions";
import { getLocations } from "./actions/locationsActions"

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Map from "./components/map/Map";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Favourites from './components/favourites/Favourites';
import About from "./components/static/About"

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration (if its has one)
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

store.dispatch(getLocations());
store.dispatch(getFavourites());

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Map} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/favourites" component={Favourites} /> */}
            <Route exact path="/favourites" component={Favourites} />
            <Route exact path="/about" component={About} ></Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
