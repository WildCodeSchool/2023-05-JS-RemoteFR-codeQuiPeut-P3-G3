import "./PopupImgFinder.scss"

import imgQuit from "../../../../../../assets/user_ui/quit_white.png"

function PopupImgFinder({ viewImgFinder, setViewImgFinder }) {
  return (
    <div className="popupFinder">
      <div className="popupFinder__toolbar">
        <div className="toolbar__menu">
          <ul className="toolbar__list">
            <li> Local </li>
            <li> Download </li>
            <li> Web search </li>
          </ul>
          <div className="toolbar__buttons">
            <button
              className="toolbar__quit"
              onClick={() => setViewImgFinder(false)}
            >
              <img src={imgQuit} alt="imgQuit" />
            </button>
          </div>
        </div>
      </div>

      <div className="popupFinder__content">
        <div className="popupContent__local"></div>
        <div className="popupContent__download"></div>
        <div className="popupContent__webSearch"></div>
      </div>
    </div>
  )
}

export default PopupImgFinder
