import "./Navbar.scss"
import { Link } from "react-router-dom"
import logo from "../../assets/images/logoviolet.png"
import account from "../../assets/images/account.png"
import profileicon from "../../assets/images/profileicon.png"
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
        {/* <div className="explore-nav">
          <select name="Explore" id="navbar-select">
            <option value="explore">Explore</option>
          </select>
        </div> */}
        <div className="dropdown-navbar">
          <button className="dropbtn-navbar" onClick={handleDropdown}>
            Explore
            <i className="fa fa-caret-down"></i>
          </button>
          {isExploreOpen && (
            <div className="dropdown-content-navbar" id="myDropdown">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          )}
        </div>
        <input type="text" placeholder="search" className="search-navbar" />
        <div className="profile-navbar">
          <Link to="/profile" className="link-profil-navbar">
            <img src={account} alt="logo" className="left-img-navbar" />
          </Link>
          <img src={profileicon} alt="logo" className="right-img-navbar" />
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
          <Link to="/profile">
            <img
              src="./src/assets/images/icons8-manette-50.png"
              alt="logo-games"
              className="img-mobile-menu"
            />
          </Link>
          <Link to="/games">
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
