import React from "react"
import "./ListDeroulante.scss" // Importez directement le fichier SCSS ici

function ListDeroulante() {
  return (
    <>
      <label className="select" htmlFor="slct">
        <select id="slct" required>
          <option value="" disabled selected>
            Select option
          </option>
          <option value="#">One</option>
          <option value="#">Two</option>
          <option value="#">Three</option>
          <option value="#">Viva l'algérie</option>
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>{" "}
        </svg>
      </label>

      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </>
  )
}

export default ListDeroulante
