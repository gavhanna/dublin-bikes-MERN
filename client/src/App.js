import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Map from "./components/map/Map";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Favourites from './components/favourites/Favourites';

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      updating: false,
      faveNums: [],
      faveLocations: []
    }
  }

  componentDidMount() {
    this.getDublinBikesData();

  }

  getDublinBikesData = () => {
    this.setState({ updating: true })
    axios.get("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=ef653629fed566ec812f1444f8bb2b3ddc6e1bbf")
      .then(res => this.setState({
        locations: res.data
      }))
      .then(() => this.setState({ updating: false }))
      .then(() => this.getFaves())
      .catch(err => console.log(err))
  }

  getFaves = () => {
    axios.get("/api/favourites")
      .then(res => this.setState({ faveNums: res.data.locations }))
      .then(() => {
        const locations = [];
        this.state.locations.forEach(location => {
          if (this.isFave(location)) {
            locations.push(location);
          }
        })
        this.setState({ faveLocations: locations })
      })
      .catch(err => console.log(err));
  }

  addToFaves = (location) => {
    this.setState({
      faveNums: [...this.state.faveNums, location.number],
      faveLocations: [...this.state.faveLocations, location]
    })
  }

  isFave = (location) => {
    let fave = false;
    if (this.state.faveNums && this.state.faveNums.length > 0) {

      this.state.faveNums.forEach(faved => {
        if (location.number === faved) {
          fave = true;
        }
      })
      return fave;
    }
  }

  deleteFromFaves = (location) => {
    const newFaveLocations = this.state.faveLocations.filter(fave => {
      if (location.number !== fave.number) {
        return fave;
      } else {
        return null;
      }
    });
    const newFaveNums = this.state.faveNums.filter(fave => {
      if (location.number !== fave) {
        return fave;
      } else {
        return null;
      }
    })

    this.setState({
      faveLocations: newFaveLocations,
      faveNums: newFaveNums
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" render={() => <Map
              locations={this.state.locations}
              updating={this.state.updating}
              faveLocations={this.state.faveLocations}
              faveNums={this.state.faveNums}
              addToFaves={this.addToFaves}
            />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/favourites" component={Favourites} /> */}
            <Route exact path="/favourites" render={() => <Favourites
              locations={this.state.locations}
              updating={this.state.updating}
              faveLocations={this.state.faveLocations}
              deleteFromFaves={this.deleteFromFaves}
            />} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
