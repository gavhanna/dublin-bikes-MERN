import React from 'react'

const Footer = () => {
  return (
    <footer className="footer mt-5 card">
      <div className="row">
        <div className="col-12">
          <p>This application was made using the MERN stack.</p>
          <p>It makes use of the Google Maps and JCDeceaux APIs.</p>
          <a href="https://github.com/gavhanna"><p>&copy; Gav Hanna {new Date().getFullYear()}</p></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
