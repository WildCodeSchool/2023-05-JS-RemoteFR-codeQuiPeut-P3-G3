import React, { useState, useEffect } from "react"
import ProfilPartieHaute from "../components/profil/ProfilPartieHaute"
import ProfilPartieBasse from "../components/profil/ProfilPartieBasse"
import "./Profile.scss"
import axios from "axios"
import Cookies from "js-cookie"

function Profile() {
  const [profileData, setProfileData] = useState({})
  const [error, setError] = useState("")
  const userId = Cookies.get("idUser")

  useEffect(() => {
    if (!userId) {
      setError("L'ID de l'utilisateur n'est pas défini.")
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4242/users/${userId}`
        )
        const userData = response.data
        setProfileData(userData)
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du profil :",
          error
        )
        setError("Erreur lors de la récupération des données du profil.")
      }
    }

    fetchUserData()
  }, [userId])

  return (
    <>
      <section className="avatar">
        <div className="globalContainerProfil">
          <ProfilPartieHaute pseudo={profileData.pseudo} />
        </div>
      </section>
      <section className="edit">
        <div className="container">
          <ProfilPartieBasse
            welcome={profileData.firstname}
            email={profileData.mail}
            pseudo={profileData.pseudo}
            lastName={profileData.lastname}
            firstName={profileData.firstname}
          />
          {error && <p>{error}</p>}
        </div>
      </section>
    </>
  )
}

export default Profile
