import "./Navbar.scss"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/images/Group 131.png"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import ProfileIcon from "../../assets/images/Ellipse 122.png"
import logout from "../../assets/images/Vector-logout.png"

function NavBar() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const authToken = Cookies.get("authToken")
  useEffect(() => {
    // Vérifier si le JWT est présent dans les cookies

    if (authToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [isAuthenticated, authToken]) // Exécute cette vérification une fois lorsque le composant est monté

  const handleLogout = () => {
    Cookies.remove("authToken")
    Cookies.remove("loggedInUser")
    Cookies.remove("idUser")
    setIsAuthenticated(false)
    navigate("/")
  }
  const handleDropdown = () => {
    setIsExploreOpen(true)
  }
  const handleDropdown2 = () => {
    setIsExploreOpen(false)
  }
  return (
    <>
      <div className="navbar-container">
        <Link to="/">
          <input type="image" src={logo} alt="logo" className="logo-navbar" />
        </Link>

        <div
          className="dropdown-navbar"
          onMouseEnter={handleDropdown}
          onMouseLeave={handleDropdown2}
        >
          <button className="dropbtn-navbar">
            Explore
            <i className="fa fa-caret-down"></i>
          </button>
          {isExploreOpen && (
            <div className="dropdown-content-navbar" id="myDropdown">
              <Link to="/games">
                <option value="">Games</option>
              </Link>
              <Link to="/shop">
                <option value="">Shop</option>
              </Link>
              <Link to="admin">
                <option value="">Admin</option>
              </Link>
            </div>
          )}
        </div>
        <input type="text" placeholder="Search..." className="search-navbar" />
        {isAuthenticated ? (
          <div className="profile-navbar">
            <input
              type="image"
              src={logout}
              alt="logo de déconnexion"
              onClick={handleLogout}
              className="profile-navbar-img"
            />
            <Link to="/profile">
              <input
                type="image"
                src={ProfileIcon}
                alt="Profile"
                className="profile-navbar-img"
                id="resize-profile-image"
              />
            </Link>
          </div>
        ) : (
          <div className="profile-navbar">
            <Link to="/login" className="link-profil-navbar" id="login-navbar">
              <input type="button" value="Log-In" id="input-login-navbar" />
            </Link>
            <Link
              to="/signup"
              className="link-profil-navbar"
              id="signup-navbar"
            >
              <input type="button" value="Sign-Up" id="input-signup-navbar" />
            </Link>
          </div>
        )}
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
