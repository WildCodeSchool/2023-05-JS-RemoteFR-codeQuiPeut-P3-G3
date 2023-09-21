import React, { useState } from "react"
import icone1 from "../../assets/user_ui/person.png"
import icone3 from "../../assets/user_ui/Key.png"
import icone4 from "../../assets/images/EditPen.png"
import axios from "axios"
import "./ProfilPartieBasse.scss"

function ProfilPartieBasse({
  welcome,
  mail,
  pseudo,
  lastname,
  firstname,
  userId,
  hashedPassword,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    mail,
    pseudo,
    lastname,
    firstname,
    hashedPassword,
  })

  const handleEditClick = () => {
    setEditedData({ mail, pseudo, lastname, firstname, hashedPassword })
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:4242/users/${userId}`, editedData)
      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error)
    }
  }

  const handleCancelClick = () => {
    setEditedData({ mail, pseudo, lastname, firstname })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedData({ ...editedData, [name]: value })
  }

  return (
    <>
      <div className="GlobalContainerPartieBasseGauche">
        <div className="BlocNumero">
          <img src={icone1} alt="icone person details" />{" "}
          <div className="PersonnalDetails"> Personal details</div>
        </div>
        <div className="BlocNumero">
          <img src={icone3} alt="icone Key" />{" "}
          <div className="ResetPassword"> Reset Password </div>
        </div>
      </div>
      <div className="GlobalContainerPartieBasseDroite">
        <div className="WelcomeContainer">
          <h4>
            Welcome, <span className="PseudoText">{welcome}</span>{" "}
          </h4>
          {isEditing ? (
            <></>
          ) : (
            <img
              src={icone4}
              alt="icone Pen"
              className="Pen"
              onClick={handleEditClick}
            />
          )}
        </div>
        {isEditing ? (
          <>
            <label htmlFor="email" className="label-bold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedData.mail}
              onChange={handleInputChange}
              className="input-style"
            />
            <label htmlFor="pseudo" className="label-bold">
              Pseudo:
            </label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={editedData.pseudo}
              onChange={handleInputChange}
              className="input-style"
            />
            <label htmlFor="lastName" className="label-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editedData.lastname}
              onChange={handleInputChange}
              className="input-style"
            />
            <label htmlFor="firstName" className="label-bold">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editedData.firstname}
              onChange={handleInputChange}
              className="input-style"
            />
            <div className="button-saveandcancel">
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </>
        ) : (
          <div className="container-form">
            <p>
              <strong>Email:</strong> {mail}
            </p>
            <p>
              <strong>Pseudo:</strong> {pseudo}
            </p>
            <p>
              <strong>Last Name:</strong> {lastname}
            </p>
            <p>
              <strong>First Name:</strong> {firstname}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilPartieBasse
