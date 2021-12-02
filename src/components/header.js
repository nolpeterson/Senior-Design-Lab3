import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { isLoggedIn } from "../services/auth"

let accountState = ""
if (isLoggedIn()) {
  accountState = `Logout`
} else {
  accountState = "Login"
}

const Header = ({ siteTitle }) => (
  <header style={{background: `#557A95`,marginBottom: `1.5rem`}}>
    <div style={{margin: `0 auto`,maxWidth: 960, padding: `3rem 1.0875rem`}}>
      {/* Site title with clickable link to homepage */}
      <div id="SiteName" style={{ float: "left" }}>
        <h1> 
          <Link to="/" style={{color: `white`,textDecoration: `none`}}>
            {siteTitle}
          </Link>
        </h1>
      </div>

      {/* Login/Logout button */}
      <div id="AccountStateButton" style={{ float: "right" , marginTop: "10px" }}> 
        <Link to="/loginPage/">
          <button>
            {accountState}
          </button>
        </Link>
      </div>
      
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
