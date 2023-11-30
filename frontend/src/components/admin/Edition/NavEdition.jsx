/* Styles */
import "./NavEdition.scss"

function NavEdition({ view, setView }) {
  return (
    <>
      <ul className="nav__edition">
        <li className="nav__edition_link">
          <button
            type="button"
            className={`nav__button ${view === "Vignette" ? "active" : ""}`}
            onClick={() => setView("Vignette")}
          >
            Vignette
          </button>
        </li>

        <div className="nav__separator"></div>

        <li className="nav__edition_link">
          <button
            type="button"
            className={`nav__button ${view === "Assets" ? "active" : ""}`}
            onClick={() => setView("Assets")}
          >
            Assets
          </button>
        </li>

        <div className="nav__separator"></div>

        <li className="nav__edition_link">
          <button
            type="button"
            className={`nav__button ${view === "Scenes" ? "active" : ""}`}
            onClick={() => setView("Scenes")}
          >
            Scenes
          </button>
        </li>

        {/* <li>
          <button
            type="button"
            className={`nav__button ${view === "Mindmap" ? "active" : ""}`}
            onClick={() => setView("Mindmap")}
          >
            Mindmap
          </button>
        </li> */}
      </ul>
    </>
  )
}

export default NavEdition
