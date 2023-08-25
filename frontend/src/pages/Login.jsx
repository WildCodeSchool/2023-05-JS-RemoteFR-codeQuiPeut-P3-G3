import "./Login.scss"
import userpic from "../assets/images/user2.png"
function Login() {
  return (
    <div className="container-login">
      <div className="top-login">
        <img src={userpic} alt="userpic" className="picture-login" />
        <h4>Log In</h4>
        <div className="logo-montagne-login"></div>
      </div>
      <div className="bot-login">
        <input type="email" placeholder="email" className="input-login" />
        <input
          type="password"
          placeholder="password"
          className="input-login"
          id="password-login"
        />
        <input
          type="button"
          placeholder="submit"
          className="button-login"
          value="S'identifier"
        />
      </div>
    </div>
  )
}

export default Login
