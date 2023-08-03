import "./Footer.scss"

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="top-block-footer">
          <p>Contact-us</p>
          <p>
            <span className="icon">&#x260E;</span> 08 92 92 92 92
          </p>
          <p>
            <span className="icon">&#x2709;</span> chickenlord@gmail.com
          </p>
          <div className="line-div-footer"></div>
        </div>
        <div className="bottom-block-footer">
          <div className="bottom-left-footer">
            <p> Terms of Service</p>
            <p> Privacy Policy</p>
          </div>
          <div className="logo-title-footer">
            <img src="./src/assets/images/logoviolet.png" alt="logo" />
            <p>.ENIGMA.</p>
          </div>
          <div className="pay-logo-footer">
            <img src="./src/assets/images/Paypal.png" alt="paypal-icone" />
            <img src="./src/assets/images/Vector.png" alt="mastercard-icone" />
            <img src="./src/assets/images/Group.png" alt="visa-icone" />
          </div>
        </div>

        <p className="copyright">&copy; 2023 [Enigma]. Tous droits réservés.</p>
      </div>
    </>
  )
}

export default Footer
