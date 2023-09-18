/* packages */
import { useState } from "react"

/* Components */
import NavEdition from "./NavEdition"
import EditAssets from "./Sous-menus/Assets/EditAssets"
import EditGeneral from "./Sous-menus/general/EditGeneral"
import EditMindmap from "./Sous-menus/mindmap/EditMindmap"
import EditScenes from "./Sous-menus/scenes/EditScenes"

/* styles */
import "./Edition.scss"

function AdminEdition() {
  const [view, setView] = useState("General")

  return (
    <>
      <div className="edition__wrapNav">
        <NavEdition view={view} setView={setView} />
      </div>
      <div className="edition__wrapContent">
        {view === "General" && <EditGeneral />}
        {view === "Assets" && <EditAssets />}
        {view === "Scenes" && <EditScenes />}
        {view === "Mindmap" && <EditMindmap />}
      </div>
    </>
  )
}

export default AdminEdition
