import ProfilPartieHaute from "../components/profil/ProfilPartieHaute"
import ProfilPartieBasse from "../components/profil/ProfilPartieBasse"
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
          <ProfilPartieBasse />
        </div>
      </section>

      {/* Rajouter un footer ?  */}
    </>
  )
}

export default Profile
