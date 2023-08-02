import React from "react"
// import avatar from "../../assets/user_ui/avatar.png"
import avatar from "../../assets/user_ui/avatar_test.jpeg"
import "./ProfilPartieHaute.scss"

function ProfilPartieHaute() {
  return (
    <>
      <div className="GlobalContainerPartieHaute">
        <div className="ImageProfilContainer">
          <img src={avatar} alt="avatar" />{" "}
        </div>

        <div className="UserName">
          <h2>USER NAME</h2>
        </div>
        <div className="enrollmentDate"> 25/12/2000</div>
      </div>
    </>
  )
}

export default ProfilPartieHaute
