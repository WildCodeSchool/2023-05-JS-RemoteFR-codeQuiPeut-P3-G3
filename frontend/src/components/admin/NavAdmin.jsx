/* Packages */

/* Styles */
import "./NavAdmin.scss"

function NavAdmin({ setNav, selected }) {
  return (
    <>
      <div className="nav__left">
        <span> &lt;ADMIN /&gt;</span>
      </div>

      <div className="nav__right">
        <ul>
          <li>
            <button
              type="button"
              className={`nav__item ${selected === "General" ? "active" : ""}`}
              onClick={() => setNav("General")}
            >
              General
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav__item ${selected === "Edition" ? "active" : ""}`}
              onClick={() => setNav("Edition")}
            >
              Edition
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav__item ${selected === "Stats" ? "active" : ""}`}
              onClick={() => setNav("Stats")}
            >
              Statistiques
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavAdmin
