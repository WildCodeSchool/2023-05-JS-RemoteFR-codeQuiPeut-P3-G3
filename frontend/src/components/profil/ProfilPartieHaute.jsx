import React from "react"
import avatar from "../../assets/user_ui/avatar.png"
import "./ProfilPartieHaute.scss"

function ProfilPartieHaute({ pseudo }) {
  return (
    <>
      <div className="GlobalContainerPartieHaute">
        <div className="ImageProfilContainer">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="Pseudo">
          <h2>{pseudo}</h2>
        </div>
      </div>
    </>
  )
}

export default ProfilPartieHaute
