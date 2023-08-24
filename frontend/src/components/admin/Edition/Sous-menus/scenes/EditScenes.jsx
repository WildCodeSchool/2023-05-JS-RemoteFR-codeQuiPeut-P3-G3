import { useRef, useState, useEffect } from "react"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/WidgetToolbar"
import ButtonUI from "../../../../global/Buttons/ButtonUI"
import ContainerCanva from "./constructor/canva/ContainerCanva"
import EditorRichText from "./constructor/text-toolbar/EditorRichText"

function EditScenes() {
  const canvasRef = useRef(null)
  const [isAddingText, setIsAddingText] = useState(false)
  const [viewEditProperties, setViewProperties] = useState(false)

  const handleAddTextButtonClick = () => {
    setIsAddingText(!isAddingText)
  }

  useEffect(() => {
    // console.log(viewEditProperties)
  }, [viewEditProperties])

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
            <WidgetToolbar
              onAddText={handleAddTextButtonClick}
              isAddingText={isAddingText}
            />
          </div>
          <EditorRichText />
          <div ref={canvasRef} className="scenes__constructor__canva">
            <ContainerCanva
              canvasRef={canvasRef}
              isAddingText={isAddingText}
              setIsAddingText={setIsAddingText}
              setViewProperties={setViewProperties}
              viewEditProperties={viewEditProperties}
            />
            {/* <CanvasWithText /> */}
          </div>
          <div className="scenes__constructor__btn">
            <ButtonUI title={"save"} bgcolor={"#3f7841"} />
            <ButtonUI title={"reset"} bgcolor={"#0A0A0A"} />
            <ButtonUI title={"delete"} bgcolor={"#902B00"} />
          </div>
        </div>
        <div className="scenes__properties">
          <WidgetProperties viewEditProperties={viewEditProperties} />
        </div>
      </div>
    </>
  )
}

export default EditScenes
