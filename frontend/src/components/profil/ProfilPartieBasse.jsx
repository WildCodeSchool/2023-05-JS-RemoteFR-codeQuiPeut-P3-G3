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
        <div className="BlocNumero">
          <img src={icone1} alt="icone person details" />{" "}
          <div className="PersonnalDetails"> Personal details</div>
        </div>
        <div className="BlocNumero">
          <img src={icone2} alt="icone Payment History" />{" "}
          <div className="PaymentHistory"> Payment History </div>
        </div>
        <div className="BlocNumero">
          <img src={icone3} alt="icone Inbox" />{" "}
          <div className="Inbox"> Inbox </div>
        </div>
        <div className="BlocNumero">
          <img src={icone4} alt="icone Key" />{" "}
          <div className="ResetPassword"> Reset Password </div>
        </div>
        <div className="BlocNumero">
          <img src={icone5} alt="icone Logout" />{" "}
          <div className="Logout">Logout </div>
        </div>
      </div>
      <div className="GlobalContainerPartieBasseDroite">
        <div className="GlobalContainerWelcome">
          <div className="WELCOME">Welcome,</div>
          <div className="TestIs">Maggle</div>
        </div>
        <div className="GlobalContainerinfos">
          <div className="FirstName">
            <b> First name : </b>
          </div>
          <div className="TestIs"> Maggle </div>
        </div>
        <div className="GlobalContainerinfos">
          <div className="LastName">
            <b> Last name : </b>
          </div>
          <div className="TestIs"> Miller </div>
        </div>
        <div className="GlobalContainerinfos">
          <div className="Email">
            <b> Email : </b>
          </div>
          <div className="TestIs"> Maggle@gmail.com </div>
        </div>
        <div className="GlobalContainerinfos">
          <div className="NickName">
            <b> Nick name : </b>
          </div>
          <div className="TestIs"> SuperMaggle </div>
        </div>
        <div className="GlobalContainerinfos">
          <div className="AccountRole">
            <b> Account rôle : </b>
          </div>
          <div className="TestIs"> Roler </div>
        </div>
      </div>
    </>
  )
}

export default ProfilPartieBasse
