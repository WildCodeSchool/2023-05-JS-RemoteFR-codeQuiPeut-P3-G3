import "./Register.scss"
import userpic from "../assets/images/user2.png"
import fb from "../assets/images/facebook_5968764 3.png"
import google from "../assets/images/google_300221 3.png"
import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  // States
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [mail, setMail] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [pwd, setPwd] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  // Onchange functions

  const handleFisrtnameChange = (event) => {
    setFirstname(event.target.value)
  }

  const handleLastnameChange = (event) => {
    setLastname(event.target.value)
  }

  const handleEmailChange = (event) => {
    setMail(event.target.value)
  }

  const handlePseudoChange = (event) => {
    setPseudo(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPwd(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }
  // Requete post

  const handleSubmit = () => {
    const userData = { firstname, lastname, pwd, mail, pseudo, confirmPassword }

    axios
      .post("http://localhost:4242/signup", userData)
      .then((response) => {
        // Handle success or do something with the response
        if (response.data !== undefined && response.data !== null) {
          navigate("/login")
        } else {
          // Gérer le cas où l'inscription n'a pas réussi
        }
      })
      .catch((error) => {
        console.error(error)
        setError("Email and pseudo must be unique and passwords must match")
        // Handle error
      })
  }

  return (
    <div className="register-container">
      <div className="register-top">
        <img src={userpic} alt="userlogo" className="logo-img-register" />
        <h4 className="register-title">Sign Up</h4>
        <div className="logo-montagne-register">
          <div className="white-background-register">
            <img src={fb} alt="facebook-logo" className="register-img" />
          </div>
          <div className="white-background-register">
            <img src={google} alt="google-logo" className="register-img" />
          </div>
        </div>
      </div>
      <div className="register-form">
        <div className="register-name">
          <input
            type="text"
            className="register-input"
            placeholder="Firstname"
            onChange={handleFisrtnameChange}
          />
          <input
            type="text"
            className="register-input"
            placeholder="Lastname"
            onChange={handleLastnameChange}
          />
        </div>
        <div className="register-email">
          <input
            type="text"
            className="register-long-input"
            placeholder="Pseudo"
            id="long-input-pseudo"
            onChange={handlePseudoChange}
          />
          <input
            type="email"
            className="register-long-input"
            placeholder="Email"
            id="long-input-mail"
            onChange={handleEmailChange}
          />
        </div>
        <div className="register-password">
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Verify password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        <input
          type="button"
          placeholder="submit"
          id="register-submit"
          value="Sign-Up"
          onClick={handleSubmit}
        />
        {error && <div className="error-message">{error}</div>}
        <Link to="/login" className="link-register">
          <p className="p-link-register">Already have an account click here!</p>
        </Link>
      </div>
    </div>
  )
}

export default Register
