import React from 'react'
import Footer from "../layout/Footer"

const About = () => {
  return (
    <div class="container text-center" style={{ marginTop: "20px", padding: "10px" }}>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <img src="/icons/android-icon-96x96.png" alt="dBikes Logo" />
          <h1>About this App</h1>
        </div>
        <div className="col-md-6">
          <div className="card">
            <h2>Map Icons</h2>
            <aside>Colours and their meaning</aside>
            <ul className="list-group text-left">
              <li className="list-group-item">
                <img src="https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bbT|10%20/%2015|209cee|000000" alt="Map marker" />
                <span> Represents plenty of available bikes and spaces</span>
              </li>
              <li className="list-group-item">
                <img src="https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bbT|1%20/%2029|cc4444|000000" alt="Map marker" />
                <span> Represents less than 4 bikes available</span>
              </li>
              <li className="list-group-item">
                <img src="https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bbT|20%20/%202|65BF68|000000" alt="Map marker" />
                <span> Represents less than 4 parking spaces available</span>
              </li>
              <li className="list-group-item">
                <img src="https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bbT|10%20/%2015|209cee|FFFF00" alt="Map marker" />
                <span> Gold text represnts a favourite location</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <h2>How to use this app</h2>

            <ul className="list-group text-left">
              <li className="list-group-item">
                The first number in a map icon represents the number of bikes
              </li>
              <li className="list-group-item">
                The second number represents the number of available spaces
              </li>
              <li className="list-group-item">
                Click on an icon to show information about a location
              </li>
              <li className="list-group-item">
                Click on the map to hide the location information
              </li>
              <li className="list-group-item">
                Sign up or log in to be able to save your favourite locations
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About;