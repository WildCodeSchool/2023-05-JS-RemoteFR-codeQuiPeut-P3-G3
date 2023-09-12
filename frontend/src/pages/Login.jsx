import "./Login.scss"
import userpic from "../assets/images/user2.png"
import { useState } from "react"
import axios from "axios"
function Login() {
  const [mail, setMail] = useState("")
  const [pwd, setPwd] = useState("")

  const handleEmailChange = (e) => {
    setMail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPwd(e.target.value)
  }

  const handleSubmit = () => {
    const userData = { mail, pwd }
    axios.post("http://localhost:4242/login", userData)
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
    </div>
  )
}

export default Login
