import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import Map from "./components/map/Map";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Map />
      </div>
    );
  }
}

export default App;
