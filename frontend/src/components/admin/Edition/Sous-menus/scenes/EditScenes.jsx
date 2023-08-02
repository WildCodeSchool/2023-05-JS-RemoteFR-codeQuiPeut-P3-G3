import { useEffect, useState, useRef } from "react"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/widgetToolbar"
import ButtonUI from "../../../../global/ButtonUI"

function EditScenes() {
  const canvasRef = useRef(null)
  const containerCanvaRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [sizeFound, setSizeFound] = useState(false)

  useEffect(() => {
    const container = containerCanvaRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    setContainerSize({ width, height })
    setSizeFound(true)
  }, [])

  useEffect(() => {
    if (sizeFound) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Utilisez le contexte 2D pour dessiner sur le canvas
      // Par exemple:
      context.fillStyle = "#FF0000"
      context.fillRect(0, 0, containerSize.width, containerSize.height)
    }
  }, [sizeFound])

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
            <WidgetToolbar />
          </div>
          <div ref={containerCanvaRef} className="scenes__constructor__canva">
            {sizeFound ? (
              <canvas
                ref={canvasRef}
                width={containerSize.width}
                height={containerSize.height}
              />
            ) : (
              ""
            )}
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
