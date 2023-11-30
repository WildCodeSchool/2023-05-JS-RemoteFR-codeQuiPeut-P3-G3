import "./Login.scss"
import userpic from "../assets/images/user2.png"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

function Login() {
  const navigate = useNavigate()
  const [mail, setMail] = useState("")
  const [pwd, setPwd] = useState("")
  const [error, setError] = useState("")

  const handleEmailChange = (e) => {
    setMail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPwd(e.target.value)
  }

  const handleSubmit = () => {
    const userData = { mail, pwd }
    axios
      .post("http://localhost:4242/login", userData)
      .then((response) => {
        // console.log(response) // Ajoutez cette ligne pour voir la réponse complète
        // console.log(response.data.token)
        if (response.data !== undefined && response.data !== null) {
          const token = response.data.token
          // const expirationDate = new Date(Date.now() + 10 * 1000)

          Cookies.set("authToken", token, {
            expires: 0.5,
            sameSite: "strict",
          })
          Cookies.set("loggedInUser", JSON.stringify(response.data.user), {
            sameSite: "strict",
          })
          Cookies.set("idUser", JSON.stringify(response.data.user.id), {
            sameSite: "strict",
          })
          Cookies.set("userRole", JSON.stringify(response.data.user.role), {
            sameSite: "strict",
          })

          navigate("/")
        } else {
          alert("Connexion echouée")
        }
      })
      .catch((error) => {
        setError(error.response.data.message)
      })
  }

  return (
    <div className="container-login">
      <div className="top-login">
        <img src={userpic} alt="userpic" className="picture-login" />
        <h4>Log In</h4>
        <div className="logo-montagne-login"></div>
      </div>
      <div className="bot-login">
        <input
          type="email"
          placeholder="Email"
          className="input-login"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-login"
          id="password-login"
          onChange={handlePasswordChange}
        />
        <input
          type="button"
          placeholder="submit"
          className="button-login"
          value="Log-In"
          onClick={handleSubmit}
        />
      </div>
      <div className="error-message">{error}</div>
    </div>
  )
}

export default Login
