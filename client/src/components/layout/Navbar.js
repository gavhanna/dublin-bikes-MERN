import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// TODO: make NavLink work correctly

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    if (window.confirm("Log out?")) {
      this.props.logoutUser();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const aboutLink = (
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link" exact to="/about"><i className="fas fa-info-circle"></i> About</NavLink>
      </li>
    )

    const authLinks = (
      <ul className="navbar-nav ml-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/favourites"><i className="fas fa-star"></i> Favourites</NavLink>
        </li>
        {aboutLink}
        <li className="nav-item">
          <a
            onClick={this.onLogoutClick}
            className="nav-link"
            href=""
          ><i className="fas fa-sign-out-alt"></i> Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/login"><i class="fas fa-sign-in-alt"></i> Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/register"><i class="fas fa-user-plus"></i> Register</NavLink>
        </li>
        {aboutLink}
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark text-light bg-dark">
        <div className="container">
          <NavLink activeClassName="active" className="navbar-brand" exact to="/">
            <img id="nav-logo" src="/icons/android-icon-96x96.png" alt="dBikes Logo" />
            <span> DubBikes</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              isAuthenticated ? authLinks : guestLinks
            }
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,

})

export default connect(mapStateToProps, { logoutUser })(Navbar);