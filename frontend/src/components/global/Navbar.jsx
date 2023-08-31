import "./Navbar.scss"
import { Link } from "react-router-dom"
import logo from "../../assets/images/logoviolet.png"

import { useState } from "react"

function NavBar() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  const handleDropdown = () => {
    setIsExploreOpen(!isExploreOpen)
  }
  return (
    <>
      <div className="navbar-container">
        <Link to="/">
          <input type="image" src={logo} alt="logo" className="logo-navbar" />
        </Link>

        <div className="dropdown-navbar">
          <button className="dropbtn-navbar" onClick={handleDropdown}>
            Explore
            <i className="fa fa-caret-down"></i>
          </button>
          {isExploreOpen && (
            <div className="dropdown-content-navbar" id="myDropdown">
              <Link to="">
                <option value="">Games</option>
              </Link>
              <option value="">Shop</option>
            </div>
          )}
        </div>
        <input type="text" placeholder="search" className="search-navbar" />
        <div className="profile-navbar">
          <Link to="/login" className="link-profil-navbar" id="login-navbar">
            <input type="button" value="Log-In" id="input-login-navbar" />
          </Link>
          <Link to="/signup" className="link-profil-navbar" id="signup-navbar">
            <input type="button" value="Sign-Up" id="input-signup-navbar" />
          </Link>
        </div>
      </div>
      <div className="bottom-menu" id="bottomMenu">
        <ul>
          <Link to="/">
            <img
              src="./src/assets/images/icons8-accueil-50.png"
              alt="logo-home"
              className="img-mobile-menu"
            />
          </Link>
          <Link to="/game">
            <img
              src="./src/assets/images/icons8-manette-50.png"
              alt="logo-games"
              className="img-mobile-menu"
            />
          </Link>
          <Link to="/profile">
            <img
              src="./src/assets/images/icons8-utilisateur-sexe-neutre-50.png"
              alt="logo-utilisateur"
              className="img-mobile-menu"
            />
          </Link>
        </ul>
      </div>
    </>
  )
}

export default NavBar
