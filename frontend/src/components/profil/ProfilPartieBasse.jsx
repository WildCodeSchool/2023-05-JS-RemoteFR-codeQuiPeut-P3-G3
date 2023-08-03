import React from "react"
import icone1 from "../../assets/user_ui/person.png"
import icone2 from "../../assets/user_ui/Payments.png"
import icone3 from "../../assets/user_ui/Email.png"
import icone4 from "../../assets/user_ui/Key.png"
import icone5 from "../../assets/user_ui/Logout.png"
import "./ProfilPartieBasse.scss"

function ProfilPartieBasse() {
  return (
    <>
      <div className="GlobalContainerPartieBasseGauche">
        <div className="BlocNumero1">
          <img src={icone1} alt="icone person details" />{" "}
          <div className="PersonnalDetails"> Personal details</div>
        </div>
        <div className="BlocNumero2">
          <img src={icone2} alt="icone Payment History" />{" "}
          <div className="PaymentHistory"> Payment History </div>
        </div>
        <div className="BlocNumero3">
          <img src={icone3} alt="icone Inbox" />{" "}
          <div className="Inbox"> Inbox </div>
        </div>
        <div className="BlocNumero4">
          <img src={icone4} alt="icone Key" />{" "}
          <div className="ResetPassword"> Reset Password </div>
        </div>
        <div className="BlocNumero5">
          <img src={icone5} alt="icone Logout" />{" "}
          <div className="Logout">Logout </div>
        </div>
      </div>
    </>
  )
}

export default ProfilPartieBasse
