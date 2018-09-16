import React, { Component } from 'react'
import moment from "moment";
import classnames from "classnames";

class LocationInfo extends Component {
  render() {
    return (
      <div
        className={classnames("location", {
          "hide-info": !this.props.isLocationSelected
        })}
      >
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


export default LocationInfo;