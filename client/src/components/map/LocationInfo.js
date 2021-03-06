import React, { Component } from 'react'
import moment from "moment";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getFavourites, setFavourite } from "../../actions/favouritesActions";

class LocationInfo extends Component {

  componentDidMount() {
    // this.props.getFavourites();
  }

  onFaveButtonClick = (e) => {
    this.props.setFavourite(this.props.location.number);
  }

  isFave = (location) => {
    let fave = false;
    if (this.props.faveNums && this.props.faveNums.length > 0) {

      this.props.faveNums.forEach(faved => {
        if (location.number === faved) {
          fave = true;
        }
      })
      return fave;
    }
  }

  render() {
    const isFave = this.isFave(this.props.location);
    return (
      <div
        className={classnames("location", {
          "hide-info": !this.props.isLocationSelected
        })}
      >
        {
          this.props.auth.user.name ?
            <span
              data-number={this.props.location.number}
              title={isFave ? "Go to Favourites Page to remove a favourite!" : "Click to add to favourites"}
              className={classnames("fave-button", {
                "gold": isFave
              })}
              onClick={this.onFaveButtonClick}
            >
              <i className="fas fa-star"></i>
            </span> :
            null
        }
        {!this.props.location.address ? <h2>Please select a location on the map</h2> :
          <p>{this.props.location.address}</p>}
        <div className="availability">
          <span className="availability-info">
            <span
              className={classnames("count", {
                "red": this.props.location.available_bikes < 4
              })}
            >{this.props.location.available_bikes}</span>
            {this.props.location.number ? <span>Bikes</span> : <span></span>}
          </span>
          <span className="availability-info">
            <span
              className={classnames("count", {
                "red": this.props.location.available_bike_stands < 4
              })}
            >{this.props.location.available_bike_stands}</span>
            {this.props.location.number ? <span>Spaces</span> : <span></span>}
          </span>
        </div>
        <div className="status">
          <span
            className={classnames("green", {
              "red": this.props.location.status === "CLOSED"
            })}
          >{this.props.location.status}
          </span>
          <span
            title={this.props.location.banking ? "Machine accepts credit cards" : "Machine does not accept credit cards"}
            id="status-banking"
          >
            {
              this.props.location.number ?
                this.props.location.banking ?
                  <span style={{ color: "#65bf68" }}><i className="far fa-credit-card"></i></span> :
                  <span style={{ color: "salmon" }}><i className="far fa-credit-card"></i></span>
                : <span></span>
            }

          </span>

        </div>
        <div className="last-updated">
          {
            this.props.location.last_update ?
              <span>
                Last updated {moment(new Date(this.props.location.last_update)).fromNow()}

              </span> : ""

          }
        </div>
      </div>
    )
  }
}

LocationInfo.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  faveNums: state.favourites.faveLocationsByNumber
})

export default connect(mapStateToProps, { getFavourites, setFavourite })(LocationInfo);