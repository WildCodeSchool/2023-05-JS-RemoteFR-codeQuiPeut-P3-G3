import React, { useState, useEffect } from "react"
import { fabric } from "fabric"

const ContainerCanva = ({
  isAddingText,
  setIsAddingText,
  setViewProperties,
  viewEditProperties,
  selectedColor,
  selectedFont,
  selectedSize,
  selectedAlignment,
}) => {
  const [canvas, setCanvas] = useState("")

  const initCanvas = () =>
    new fabric.Canvas("myCanva", {
      height: 800,
      width: 1250,
      backgroundColor: "grey",
    })

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  useEffect(() => {
    if (isAddingText) {
      addText(canvas)
    }

    const handleDeleteKeyPress = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const activeObject = canvas.getActiveObject()

        if (activeObject instanceof fabric.Textbox) {
          canvas.remove(activeObject)
          canvas.discardActiveObject()
          canvas.renderAll()
        }
      }
    }

    document.addEventListener("keydown", handleDeleteKeyPress)

    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress)
    }
  }, [isAddingText, canvas])

  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject instanceof fabric.Textbox) {
        activeObject.set("fill", selectedColor)
        activeObject.set("fontFamily", selectedFont)
        activeObject.set("fontSize", selectedSize)
        activeObject.set("textAlign", selectedAlignment)
        canvas.renderAll()
      }
    }
  }, [selectedColor, selectedFont, selectedSize, selectedAlignment, canvas])

  // const addRect = (canvi) => {
  //   const rect = new fabric.Rect({
  //     height: 280,
  //     width: 200,
  //     fill: "yellow",
  //   })
  //   canvi.add(rect)
  //   canvi.renderAll()
  // }

  const addText = (canvi) => {
    const text = new fabric.Textbox("Texte", {
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

  return (
    <>
      <canvas id="myCanva" />
    </>
  )
}

export default ContainerCanva
