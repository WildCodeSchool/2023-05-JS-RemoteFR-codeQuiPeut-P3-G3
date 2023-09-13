/* packages */
import { useState } from "react"

/* Components */
import InfoGeneral from "./components/InfoGeneral"

/* styles */
import "./EditGeneral.scss"
// import PictureGeneral from "./components/PictureGeneral"

function EditGeneral() {
  const [view, setView] = useState("General")

  return (
    <>
      <div className="edition__content">
        <div className="edition__content__left">
          <InfoGeneral view={view} setView={setView} />
        </div>
        {/* <div className="edition__content__separator"></div>
        <div className="edition__content__right">
          <PictureGeneral view={view} setView={setView} />
        </div> */}
      </div>
    </>
  )
}

export default EditGeneral
