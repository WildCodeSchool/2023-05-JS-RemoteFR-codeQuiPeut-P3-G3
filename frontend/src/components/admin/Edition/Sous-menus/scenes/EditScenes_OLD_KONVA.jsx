import { useState, useRef } from "react"
import { Stage, Layer, Group, Text, Rect } from "react-konva"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/widgetToolbar"
import ButtonUI from "../../../../global/ButtonUI"

function EditScenes() {
  const containerRef = useRef(null)
  const [selected, setSelected] = useState(false)
  const [text, setText] = useState("Click to resize. Double click to edit.")
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(200)
  const [isTextEditing, setIsTextEditing] = useState(false) // Nouvel état pour suivre l'état d'édition du texte.

  const [newText, setNewText] = useState({
    x: 50,
    y: 50,
    width: 300,
    height: 100,
    content: "Your text here",
    draggable: true,
    id: "addedText",
    fill: "black",
  })

  const addTextToCanvas = () => {}

  const handleTextDblClick = () => {
    setIsTextEditing(true)
  }

  const handleInputChange = (event) => {
    setNewText({ ...newText, content: event.target.value })
  }

  const handleInputBlur = () => {}

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
            <Stage
              width={500}
              height={500}
              onClick={(e) => {
                if (e.currentTarget._id === e.target._id) {
                  // setIsEditing(false)
                }
              }}
            >
              <Layer className="Stage">
                <Rect x={0} y={0} width={500} height={500} fill="#f0f0f0" />
                {/* Condition pour rendre le champ de saisie de texte lorsque en mode d'édition */}
                {isTextEditing ? (
                  <Group>
                    <Text
                      x={newText.x}
                      y={newText.y}
                      text={newText.content}
                      width={newText.width}
                      height={newText.height}
                      fill={newText.fill}
                    />
                    <textarea
                      style={{
                        position: "absolute",
                        top: newText.y,
                        left: newText.x,
                        width: newText.width,
                        height: newText.height,
                        fontSize: "14px",
                        color: newText.fill,
                        background: "none",
                        border: "none",
                        padding: "0",
                        margin: "0",
                        resize: "none",
                        overflow: "hidden",
                        outline: "none",
                        fontFamily: "Arial",
                      }}
                      value={newText.content}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur} // Ajoutez un gestionnaire pour l'événement de perte de focus du champ de saisie.
                      autoFocus // Met le focus sur le champ de saisie directement après l'avoir rendu.
                    />
                  </Group>
                ) : (
                  // Rend le texte normal lorsqu'il n'est pas en mode d'édition
                  <Text
                    x={50}
                    y={50}
                    text={text}
                    colour="#FFDAE1"
                    onTextChange={(value) => setText(value)}
                    width={width}
                    height={height}
                    selected={selected}
                    onTextResize={(newWidth, newHeight) => {
                      setWidth(newWidth)
                      setHeight(newHeight)
                    }}
                    onClick={() => {
                      setSelected(!selected)
                    }}
                    onTextClick={(newSelected) => {
                      setSelected(newSelected)
                    }}
                    onDblClick={handleTextDblClick} // Ajoutez un gestionnaire pour l'événement de double-clic.
                  />
                )}
              </Layer>
            </Stage>
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
