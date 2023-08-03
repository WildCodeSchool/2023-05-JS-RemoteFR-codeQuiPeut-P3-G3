import { useState } from "react"

import "./WidgetToolbar.scss"

import imgButton from "../../../../../../../assets/user_ui/button.png"
import imgImage from "../../../../../../../assets/user_ui/image_add.png"
import imgPerson from "../../../../../../../assets/user_ui/person.png"
import imgSwitchOff from "../../../../../../../assets/user_ui/switch_off.png"
import imgSwitchOn from "../../../../../../../assets/user_ui/switch_on.png"
import imgText from "../../../../../../../assets/user_ui/text.png"
import ListDeroulante from "../../../../../../global/ListDeroulante"

function WidgetToolbar({ onAddText }) {
  const [isFight, setFight] = useState(false)

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <button type="button">
          <img src={imgImage} alt="icon-img" />
        </button>
        <button type="button">
          <img src={imgPerson} alt="icon-person" />
        </button>
        <button type="button" onClick={onAddText}>
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
    </div>
  )
}

export default WidgetToolbar
