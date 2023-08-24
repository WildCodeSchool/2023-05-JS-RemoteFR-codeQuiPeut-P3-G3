import React, { useState, useEffect } from "react"
import { fabric } from "fabric"

const ContainerCanva = ({
  isAddingText,
  setIsAddingText,
  setViewProperties,
  viewEditProperties,
}) => {
  const [canvas, setCanvas] = useState("")

  const initCanvas = () =>
    new fabric.Canvas("myCanva", {
      height: 800,
      width: 800,
      backgroundColor: "pink",
    })

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
    })
    canvi.add(rect)
    canvi.renderAll()
  }

  const addText = (canvi) => {
    const text = new fabric.Textbox("testText", {
      height: 280,
      width: 200,
      fill: "yellow",
    })
    canvi.add(text)
    canvi.renderAll()
    canvi.on("mouse:down", (options) => {
      // console.log("test")
    })
    canvi.on("selection:created", (options) => {
      // console.log(canvi._activeObject)
      setViewProperties(true)
    })

    canvi.on("selection:cleared", (options) => {
      // console.log("déselectionné")
      setViewProperties(false)
    })

    setIsAddingText(false)
  }

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  useEffect(() => {
    if (isAddingText) {
      addText(canvas)
    }
  }, [isAddingText])

  return (
    <>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <button onClick={() => addText(canvas)}>Text</button>
      <canvas id="myCanva" />
    </>
  )
}

export default ContainerCanva
