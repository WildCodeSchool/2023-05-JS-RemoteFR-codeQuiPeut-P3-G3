import { useState } from "react"

import "./WidgetToolbar.scss"

import imgButton from "../../../../../../../assets/user_ui/button.png"
import imgImage from "../../../../../../../assets/user_ui/image_add.png"
import imgPerson from "../../../../../../../assets/user_ui/person.png"
import imgSwitchOff from "../../../../../../../assets/user_ui/switch_off.png"
import imgSwitchOn from "../../../../../../../assets/user_ui/switch_on.png"
import imgText from "../../../../../../../assets/user_ui/text.png"
import ListDeroulante from "../../../../../../global/ListDeroulante"
import PopupImgFinder from "../../ImageFinderPopup/PopupImgFinder"

function WidgetToolbar({ onAddText, isAddingText }) {
  const [isFight, setFight] = useState(false)
  const [viewImgFinder, setViewImgFinder] = useState(false)

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <button type="button" onClick={() => setViewImgFinder(true)}>
          <img src={imgImage} alt="icon-img" />
        </button>
        <button type="button">
          <img src={imgPerson} alt="icon-person" />
        </button>
        <button
          type="button"
          onClick={onAddText}
          className={isAddingText ? "active" : "inactive"}
        >
          <img src={imgText} alt="icon-text" />
        </button>
        <button type="button">
          <img src={imgButton} alt="icon-button" />
        </button>
      </div>
      <div className="toolbar__right">
        <span> Fight </span>
        <button
          type="button"
          alt="icon-switch"
          onClick={() => setFight(!isFight)}
        >
          <img src={isFight ? imgSwitchOn : imgSwitchOff} alt="icon-switch" />
        </button>
        <span> Enemy</span>
        <ListDeroulante />
      </div>
      {viewImgFinder && (
        <PopupImgFinder
          viewImgFinder={viewImgFinder}
          setViewImgFinder={setViewImgFinder}
        />
      )}
    </div>
  )
}

export default WidgetToolbar
