import React from "react"
import "./JdRCard.scss"

const JdrCard = (props) => {
  const {
    jdrName,
    jdrNameFont,
    jdrNameColor,
    jdrNameFontSize,
    jdrNameTextStyle,
    jdrImg1,
    jdrImg2,
    jdrText,
    textColor,
    textFont,
    jdrBgColor1,
    jdrBgColor2,
    buttonColor,
    buttonFont,
  } = props

  const jdrNameStyle = {
    fontFamily: jdrNameFont,
    color: jdrNameColor,
    fontSize: jdrNameFontSize,
    fontStyle: jdrNameTextStyle,
  }

  const jdrBg1Style = {
    backgroundColor: jdrBgColor1,
  }

  const buttonStyle = {
    backgroundColor: buttonColor,
    fontFamily: buttonFont,
  }

  const textStyle = {
    color: textColor,
    fontFamily: textFont,
  }

  return (
    <div className="jdrCardGlobal" style={jdrBg1Style}>
      <div className="jdrImgNom">
        <div className="jdrName" style={jdrNameStyle}>
          "{jdrName}"
        </div>

        <img className="jdrImg1" src={jdrImg1} alt="img1" />
      </div>

      {/* <div className="jdrBg2" style={jdrBg2Style}> */}

      <div className="jdrImgTexte">
        <img className="jdrImg2" src={jdrImg2} alt="img2" />
        <div className="jdrTextBouton">
          <div className="jdrText" style={textStyle}>
            {jdrText}
          </div>
          <button className="jdrButton" style={buttonStyle}>
            Play
          </button>
        </div>
      </div>
      <div className="jdrBg2">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 580 213"
          fill={jdrBgColor2}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M579.708 70.3188C566.206 70.3187 597.112 -34.176 426.894 11.5973C0 104.294 0 104.294 0 104.206V104.294V212.108C0 212.108 111.59 213 181.454 213C251.319 213 321.709 213 391.573 213C455.43 213 531.005 213 570.004 213C575.534 213 579.991 208.51 579.98 202.98L579.708 70.3188Z"
            fill={jdrBgColor2}
          />
        </svg>
      </div>
    </div>
  )
}

export default JdrCard
