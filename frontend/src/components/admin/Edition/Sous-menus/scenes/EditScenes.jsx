import { useRef, useState } from "react"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/widgetToolbar"
import ButtonUI from "../../../../global/ButtonUI"
import ContainerCanva from "./constructor/canva/ContainerCanva"

function EditScenes() {
  const [addText, setAddText] = useState(false)
  const containerRef = useRef(null)

  const addTextToCanvas = () => {
    setAddText(true)
  }

  return (
    <>
      <div className="scenes">
        <div className="scenes__scenes">
          <WidgetScenes />
        </div>
        <div className="scenes__constructor">
          <div className="scenes__constructor__resume">
            <label htmlFor="message">Description scene :</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              cols="50"
              placeholder="Enter resume scene"
            ></textarea>
          </div>
          <div className="scenes__constructor__toolbar">
            <WidgetToolbar onAddText={addTextToCanvas} />
          </div>
          <div ref={containerRef} className="scenes__constructor__canva">
            <ContainerCanva addText={addText} setAddText={setAddText} />
          </div>
          <div className="scenes__constructor__btn">
            <ButtonUI title={"save"} bgColor={"#3f7841"} />
            <ButtonUI title={"reset"} bgColor={"#0A0A0A"} />
            <ButtonUI title={"delete"} bgColor={"#902B00"} />
          </div>
        </div>
        <div className="scenes__properties">
          <WidgetProperties />
        </div>
      </div>
    </>
  )
}

export default EditScenes
