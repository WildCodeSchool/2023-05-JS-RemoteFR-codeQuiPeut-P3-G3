import React from "react"
import icone1 from "../../assets/user_ui/person.png"
import icone2 from "../../assets/user_ui/Payments.png"
import icone3 from "../../assets/user_ui/Key.png"
import icone4 from "../../assets/images/EditPen.png"
import "./ProfilPartieBasse.scss"

function ProfilPartieBasse({ welcome, email, pseudo, lastName, firstName }) {
  return (
    <>
      <div className="GlobalContainerPartieBasseGauche">
        <div className="BlocNumero">
          <img src={icone1} alt="icone person details" />{" "}
          <div className="PersonnalDetails"> Personal details</div>
        </div>
        <div className="BlocNumero">
          <img src={icone2} alt="icone Payment History" />{" "}
          <div className="PaymentHistory"> Payment History </div>
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
          <img src={icone4} alt="icone Pen" className="Pen" />
        </div>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Pseudo:</strong> {pseudo}
        </p>
        <p>
          <strong>Last Name:</strong> {lastName}
        </p>
        <p>
          <strong>First Name:</strong> {firstName}
        </p>
      </div>
    </>
  )
}

export default ProfilPartieBasse

// import React, { useState, useEffect } from "react"
// import icone1 from "../../assets/user_ui/person.png"
// import icone2 from "../../assets/user_ui/Payments.png"
// import icone3 from "../../assets/user_ui/Key.png"
// import icone4 from "../../assets/images/EditPen.png"
// import axios from "axios"
// import "./ProfilPartieBasse.scss"

// function ProfilPartieBasse({
//   welcome,
//   email,
//   pseudo,
//   lastName,
//   firstName,
//   userId,
// }) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedData, setEditedData] = useState({
//     email,
//     pseudo,
//     lastName,
//     firstName,
//   })

//   const handleEditClick = () => {
//     setIsEditing(true)
//   }

//   const handleSaveClick = async () => {
//     const url = `http://localhost:4242/users/${userId}`
//     try {
//       await axios.patch(`http://localhost:4242/users/${userId}`, editedData)
//       setIsEditing(false)
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour du profil :", error)
//     }
//   }

//   const handleCancelClick = () => {
//     setEditedData({ email, pseudo, lastName, firstName })
//     setIsEditing(false)
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setEditedData({ ...editedData, [name]: value })
//   }

//   return (
//     <>
//       <div className="GlobalContainerPartieBasseGauche">
//         <div className="BlocNumero">
//           <img src={icone1} alt="icone person details" />{" "}
//           <div className="PersonnalDetails"> Personal details</div>
//         </div>
//         <div className="BlocNumero">
//           <img src={icone2} alt="icone Payment History" />{" "}
//           <div className="PaymentHistory"> Payment History </div>
//         </div>
//         <div className="BlocNumero">
//           <img src={icone3} alt="icone Key" />{" "}
//           <div className="ResetPassword"> Reset Password </div>
//         </div>
//       </div>
//       <div className="GlobalContainerPartieBasseDroite">
//         <div className="WelcomeContainer">
//           <h4>
//             Welcome, <span className="PseudoText">{welcome}</span>{" "}
//           </h4>
//           {isEditing ? (
//             <>
//               <button onClick={handleSaveClick}>Save</button>
//               <button onClick={handleCancelClick}>Cancel</button>
//             </>
//           ) : (
//             <img
//               src={icone4}
//               alt="icone Pen"
//               className="Pen"
//               onClick={handleEditClick}
//             />
//           )}
//         </div>
//         {isEditing ? (
//           <>
//             <label>Email:</label>
//             <input
//               type="text"
//               name="email"
//               value={editedData.email}
//               onChange={handleInputChange}
//             />
//             <label>Pseudo:</label>
//             <input
//               type="text"
//               name="pseudo"
//               value={editedData.pseudo}
//               onChange={handleInputChange}
//             />
//             <label>Last Name:</label>
//             <input
//               type="text"
//               name="lastName"
//               value={editedData.lastName}
//               onChange={handleInputChange}
//             />
//             <label>First Name:</label>
//             <input
//               type="text"
//               name="firstName"
//               value={editedData.firstName}
//               onChange={handleInputChange}
//             />
//           </>
//         ) : (
//           <>
//             <p>
//               <strong>Email:</strong> {email}
//             </p>
//             <p>
//               <strong>Pseudo:</strong> {pseudo}
//             </p>
//             <p>
//               <strong>Last Name:</strong> {lastName}
//             </p>
//             <p>
//               <strong>First Name:</strong> {firstName}
//             </p>
//           </>
//         )}
//       </div>
//     </>
//   )
// }

// export default ProfilPartieBasse
