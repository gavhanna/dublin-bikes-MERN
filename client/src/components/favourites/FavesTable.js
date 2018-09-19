import React from 'react'
import classnames from "classnames"

const FaveTable = (props) => {
  const faves = props.locations.filter(location => {
    if (props.faveNums.indexOf(location.number) > -1) {
      return location;
    }
  })
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Address</th>
          <th scope="col">Bikes</th>
          <th scope="col">Spaces</th>
          <th scope="col">Unfavourite</th>
        </tr>
      </thead>
      <tbody>
        {faves.map(location => {
          const onDelete = props.onDeleteButtonClick;
          return (
            <tr key={location.number}>
              <td>{location.address}</td>
              <td className={classnames("", {
                "red": location.available_bikes < 4
              })}>{location.available_bikes}</td>
              <td className={classnames("", {
                "red": location.available_bike_stands < 4
              })}>{location.available_bike_stands}</td>
              <td><button data-num={location.number} onClick={onDelete} className="btn btn-warning">Remove</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default FaveTable;