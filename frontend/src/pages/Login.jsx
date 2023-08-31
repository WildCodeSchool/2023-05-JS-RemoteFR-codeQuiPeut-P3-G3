import "./Login.scss"
import userpic from "../assets/images/user2.png"
import { useState } from "react"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    // TODO: Call a login function here
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
          placeholder="email"
          className="input-login"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          className="input-login"
          id="password-login"
          onChange={handlePasswordChange}
        />
        <input
          type="button"
          placeholder="submit"
          className="button-login"
          value="S'identifier"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Login
