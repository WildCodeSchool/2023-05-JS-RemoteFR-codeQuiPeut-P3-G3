import { useRef, useState } from "react"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/WidgetToolbar"
import ButtonUI from "../../../../global/ButtonUI"
import ContainerCanva from "./constructor/canva/ContainerCanva"

function EditScenes() {
  const canvasRef = useRef(null)
  const [isAddingText, setIsAddingText] = useState(false)

  const handleAddTextButtonClick = () => {
    setIsAddingText(true)
  }

  // const handleDeleteTextButtonClick = () => {
  //   const canvas = canvasRef.current;
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject && activeObject.type === 'textbox') {
  //     canvas.remove(activeObject);
  //     canvas.renderAll();
  //   }
  // };

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
            <button onClick={handleAddTextButtonClick}>Add Text</button>
            <WidgetToolbar onAddText={handleAddTextButtonClick} />
          </div>
          <div ref={canvasRef} className="scenes__constructor__canva">
            <ContainerCanva
              canvasRef={canvasRef}
              isAddingText={isAddingText}
              setIsAddingText={setIsAddingText}
            />
          </div>
          <div className="scenes__constructor__btn">
            <ButtonUI title={"save"} bgcolor={"#3f7841"} />
            <ButtonUI title={"reset"} bgcolor={"#0A0A0A"} />
            <ButtonUI title={"delete"} bgcolor={"#902B00"} />
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
