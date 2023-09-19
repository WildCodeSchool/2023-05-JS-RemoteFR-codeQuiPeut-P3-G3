import React from "react"
// import axios from "axios"
import "./PictureGeneral.scss"
// import jeuImg from "../../../../../../assets/images/JeuLeDestin.png"
import editPen from "../../../../../../assets/images/EditPen.png"

function PictureGeneral() {
  // const [jdrImg1, setJdrImg1] = useState("")
  // const [jdrImg2, setJdrImg2] = useState("")

  // const saveCard = () => {
  //   const cardData = {
  //     jdrImg1,
  //     jdrImg2,
  //   }
  //   axios.post("http://localhost:4242/card", cardData)
  // }

  return (
    <>
      <div className="pictureGeneral">
        <div className="pictureAndPen">
          <div className="pictureMain">
            {/* <div className="cardMain"></div> */}
            <div className="cardTop">
              <h2 className="cardTopTitle"></h2>
              <img className="cardTopImg" />
            </div>
            <div className="cardBottom">
              <img className="cardBottomImg" />
              <div className="cardBottomTextButton">
                <h3 className="cardBottomText"></h3>
                <button type="button" className="cardBottomButton"></button>
              </div>
            </div>
          </div>
          <img className="editPen" src={editPen} alt="pen" />
        </div>
      </div>
      {/* <div className="pictureGeneral">
        <div className="pictureGeneralTop">
          <div className="jeuImgDiv">
            <img className="jeuImg" src={jeuImg} alt="jeuImg" />
            <img className="editPen" src={editPen} alt="pen" />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default PictureGeneral
