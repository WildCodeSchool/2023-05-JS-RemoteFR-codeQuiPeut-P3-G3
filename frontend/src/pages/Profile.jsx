import ProfilPartieHaute from "../components/profil/ProfilPartieHaute"
import "./Profile.scss"

function Profile() {
  return (
    <>
      <section className="avatar">
        <div className="globalContainerProfil">
          <ProfilPartieHaute />
        </div>
      </section>
      <section className="edit">
        <div className="container">
          <p> composant edit ici </p>
        </div>
      </section>

      {/* Rajouter un footer ?  */}
    </>
  )
}

export default Profile
