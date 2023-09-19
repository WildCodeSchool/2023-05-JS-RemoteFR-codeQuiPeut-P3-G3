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
