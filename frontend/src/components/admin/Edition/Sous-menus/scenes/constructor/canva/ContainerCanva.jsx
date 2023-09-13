import React, { useState, useEffect, useLayoutEffect } from "react"
import { useEditionContext } from "../../../../../../../services/contexts/editionContext.jsx"
import { fabric } from "fabric"
import { v4 as uuidv4 } from "uuid"
import { object } from "prop-types"

const ContainerCanva = ({
  /* Ajout background */
  isAddingBackground,
  setIsAddingBackground,
  /* Ajout texte */
  isAddingText,
  setIsAddingText,
  /* Ajout rectangle */
  isAddingRect,
  setIsAddingRect,
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
  const { tabObject, objectSelected, objects, initCanvas } = useEditionContext()

  /* Initialisation du canvas */
  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  /* Resize canva quand les valeurs calculees ont changees */
  useLayoutEffect(() => {
    if (canvaHeight || canvaWidth) {
      canvas.setDimensions({
        width: canvaWidth,
        height: canvaHeight,
      })

      canvas.renderAll()
    }
  }, [canvaHeight, canvaWidth, canvas])

  /* TEST */
  useEffect(() => {
    // console.log(isAddingRect)
  }, [isAddingRect])

  /* Ajout d'un background */
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

  /* Déclenchement ajout d'un texte, d'un image & suppression */
  useEffect(() => {
    if (isAddingText) {
      addText(canvas)
    }

    if (isAddingRect) {
      addRect(canvas)
    }

    if (isAddingPic && imgPath !== "") {
      const pathPic = `http://localhost:4242/uploads/${imgPath}`
      // console.log("ajout picture, valeur path : " + pathPic)
      addImage(canvas, pathPic)
    }

    /* Suppression element */
    const handleDeleteKeyPress = (event) => {
      if (event.key === "Delete") {
        const activeObject = canvas.getActiveObject()

        // if (activeObject instanceof fabric.Textbox) {

        console.log("activeObject : ", activeObject)
        console.log("id de l'active object : ", activeObject.id)
        tabObject.delete(activeObject.type, activeObject.id)
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
  }, [isAddingText, isAddingPic, isAddingRect, imgPath, canvas])

  /* ------------ PROPERTIES ---------------- */

  /* Modifications de l'objet selectionné */
  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const { key, item } = tabObject.getById(activeObject)
        if (item) {
          // Si vous utilisez fabric.js 3.x, utilisez activeObject.setOptions(item) au lieu de activeObject.set(item)
          activeObject.set(item)
          canvas.requestRenderAll() // Utilisez requestRenderAll() au lieu de renderAll() pour une meilleure performance
        }
      }
    }
  }, [canvas, tabObject])

  // useEffect(() => {
  //   if (canvas && updated) {
  //     console.log("modification dans canvas")
  //     const activeObject = canvas.getActiveObject()
  //     if (activeObject && updated) {
  //       activeObject.set(objectSelected.properties)
  //       canvas.renderAll()
  //     }
  //   }
  // }, [objectSelected, canvas])

  /* -------------- TEXTE ---------------- */

  /* Fonction ajout de texte */
  const addText = (canvi) => {
    const textId = uuidv4()
    const text = new fabric.Textbox("Texte", {
      height: 280,
      width: 200,
      fill: "black",
      id: textId,
    })

    canvi.add(text)
    canvi.renderAll()
    tabObject.add(text, textId)

    text.on("changed", function (options) {})

    canvi.on("object:modified", function (options) {
      tabObject.getProperties(options.target)
    })

    canvi.on("mouse:down", (options) => {
      // console.log("test")
    })
    canvi.on("selection:created", (options) => {
      tabObject.getProperties(options.selected[0])
      setViewProperties(true)
    })

    canvi.on("selection:cleared", (options) => {
      setViewProperties(false)
      // console.log("selection cleaaaaaared", options)
      // tabObject.saveProperties(options.deselected[0])
      // tabObject.resetProperties(options)
    })

    setIsAddingText(false)
  }

  /* -------------- IMAGES ---------------- */

  /* Fonction ajout d'image */
  const addImage = (canvi, imageUrl) => {
    const imgId = uuidv4()
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scale(0.75)
      img.id = imgId
      canvi.add(img)
      tabObject.add(img, imgId)
    })

    canvi.on("selection:created", (options) => {
      tabObject.getProperties(options.selected[0])
      setViewProperties(true)
    })

    canvi.on("selection:cleared", (options) => {
      setViewProperties(false)
    })

    canvi.renderAll()
  }

  /* ------------- RECTANGLE ---------------- */
  const addRect = (canvi) => {
    const rectId = uuidv4()

    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
      id: rectId,
    })

    tabObject.add(rect, rectId)

    canvi.on("object:modified", function (options) {
      tabObject.getProperties(options.target)
    })

    /* Gestion selections */
    canvi.on("selection:created", (options) => {
      tabObject.getProperties(options.selected[0])
      setViewProperties(true)
    })

    canvi.on("selection:cleared", (options) => {
      setViewProperties(false)
      // tabObject.resetProperties()
    })

    canvi.add(rect)
    canvi.renderAll()

    setIsAddingRect(false)
  }

  /* ------------- RECUPERATION DES INFORMATIONS ELEMENTS ------------------------- */

  const getAllObjectProperties = (canvas) => {
    const objectProperties = {}

    canvas.getObjects().forEach((object, index) => {
      // Extraire toutes les propriétés de l'objet
      objectProperties[`object${index + 1}`] = { ...object.toObject() }
      console.log(objectProperties)
    })

    // Affiche les propriétés dans la console (vous pouvez les utiliser autrement)
    // console.log(objectProperties)
  }

  return (
    <>
      <canvas id="myCanva" />
      <button onClick={() => getAllObjectProperties(canvas)} type="button">
        Récupérer les informations des éléments
      </button>
    </>
  )
}

export default ContainerCanva
