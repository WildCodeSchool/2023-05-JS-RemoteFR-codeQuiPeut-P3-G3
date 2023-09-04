import React, { useState, useEffect } from "react"
import { fabric } from "fabric"

const ContainerCanva = ({
  /* Ajout background */
  isAddingBackground,
  setIsAddingBackground,
  /* Ajout texte */
  isAddingText,
  setIsAddingText,
  /* Ajout image */
  setIsAddingPic,
  isAddingPic,
  /* Popup load image */
  setViewProperties,
  viewEditProperties,
  /* Font properties */
  selectedColor,
  selectedFont,
  selectedSize,
  selectedAlignment,
  /* Chemin de fichiers */
  backgroundPath,
  imgPath,
  /* Sizes canva */
  canvaHeight,
  canvaWidth,
}) => {
  const [canvas, setCanvas] = useState("")

  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("myCanva", {
      backgroundColor: "red",
    })

    // const width = window.innerWidth <= 1000 ? window.innerWidth : 1000
    // const height = window.innerHeight <= 1000 ? window.innerHeight : 1000

    // newCanvas.setDimensions({ width, height })

    return newCanvas
    // const testCanva = new fabric.Canvas("myCanva", {
    //   height: 800,
    //   width: 1200,
    //   backgroundColor: "white",
    //   // backgroundColor: "red",
    //   margin: "auto",
    // })
  }

  useEffect(() => {
    if (canvaHeight || canvaWidth) {
      canvas.setDimensions({ width: canvaWidth, height: canvaHeight })
      canvas.renderAll()
    }
  }, [canvaHeight, canvaWidth, canvas])

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  useEffect(() => {
    if (canvas && backgroundPath !== "" && isAddingBackground) {
      const backendBaseUrl = `http://localhost:4242/uploads/${backgroundPath}`

      fabric.Image.fromURL(backendBaseUrl, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        })
      })
    }
  }, [isAddingBackground, backgroundPath, canvas])

  useEffect(() => {
    if (isAddingText) {
      addText(canvas)
    }

    if (isAddingPic && imgPath !== "") {
      const pathPic = `http://localhost:4242/uploads/${imgPath}`
      // console.log("ajout picture, valeur path : " + pathPic)
      addImage(canvas, pathPic)
    }

    /* Suppression element */
    const handleDeleteKeyPress = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const activeObject = canvas.getActiveObject()

        // if (activeObject instanceof fabric.Textbox) {
        canvas.remove(activeObject)
        canvas.discardActiveObject()
        canvas.renderAll()
        // }
      }
    }

    document.addEventListener("keydown", handleDeleteKeyPress)

    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress)
    }
  }, [isAddingText, isAddingPic, imgPath, canvas])

  /* ------------ PROPERTIES ---------------- */

  /* Modifications de l'objet selectionné */
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

  /* -------------- TEXTE ---------------- */

  /* Fonction ajout de texte */
  const addText = (canvi) => {
    const text = new fabric.Textbox("Texte", {
      height: 280,
      width: 200,
      fill: "black",
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

  /* -------------- IMAGES ---------------- */

  /* Fonction ajout d'image */
  const addImage = (canvi, imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      // img.set({ selectable: true })
      img.scale(0.75)
      canvi.add(img)
      // img.bringToFront() // Amener l'image à l'avant-plan
    })
    canvi.renderAll()
  }

  // const addRect = (canvi) => {
  //   const rect = new fabric.Rect({
  //     height: 280,
  //     width: 200,
  //     fill: "yellow",
  //   })
  //   canvi.add(rect)
  //   canvi.renderAll()
  // }

  return (
    <>
      <canvas id="myCanva" />
    </>
  )
}

export default ContainerCanva
