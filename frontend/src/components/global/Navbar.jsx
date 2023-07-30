import "./NavBar.scss"
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>
      <p> Navbar temporaire </p>
      <ul>
        <li>
          <Link to="/"> Accueil </Link>
        </li>
        <li>
          <Link to="/admin"> Admin </Link>
        </li>
        <li>
          <Link to="/profile"> Profil </Link>
        </li>
        <li>
          <Link to="/games"> Jeux </Link>
        </li>
      </ul>
    </>
  )
}

export default NavBar
