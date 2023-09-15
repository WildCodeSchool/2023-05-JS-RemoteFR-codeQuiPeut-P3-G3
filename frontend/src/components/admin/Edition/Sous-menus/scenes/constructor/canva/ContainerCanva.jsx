/* eslint-disable no-restricted-syntax */
import React, { useEffect, useLayoutEffect } from "react"
import { useEditionContext } from "../../../../../../../services/contexts/editionContext.jsx"
import { fabric } from "fabric"
import { v4 as uuidv4 } from "uuid"

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
  const { canvas, setCanvas } = useEditionContext()
  const { tabObject, initCanvas, objects, render, setRender } =
    useEditionContext()

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

  /* triggers ajout / suppression */
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

        if (activeObject) {
          // Check if activeObject exists
          console.log("activeObject : ", activeObject)
          console.log("id de l'active object : ", activeObject.id)
          tabObject.delete(activeObject.type, activeObject.id)
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
  }, [isAddingText, isAddingPic, isAddingRect, imgPath, canvas])

  /* ------------ PROPERTIES ---------------- */

  /* Modifications de l'objet selectionné */
  useEffect(() => {
    if (canvas) {
      const objectModifiedHandler = function (options) {
        console.log("objet modifié", options.target)
        tabObject.updateSelectedProperties(options.target)
      }

      const selectionCreatedHandler = function (options) {
        console.log("selection créé")
        tabObject.updateSelectedProperties(options.selected[0])
        setViewProperties(true)
      }

      const selectionClearedHandler = function (options) {
        console.log("selection clear")
        setViewProperties(false)
        if (options) {
          tabObject.resetProperties(options.target)
        }
      }

      const selectionModified = function (options) {
        console.log("selection modifiée")
        // if (options) {
        //   // tabObject.resetProperties(options.target)
        //   tabObject.updateSelectedProperties(options.selected[0])
        // }
      }

      canvas.on("object:modified", objectModifiedHandler)
      canvas.on("selection:created", selectionCreatedHandler)
      canvas.on("selection:cleared", selectionClearedHandler)
      canvas.on("selection:updated", selectionModified)

      return () => {
        canvas.off("object:modified", objectModifiedHandler)
        canvas.off("selection:created", selectionCreatedHandler)
        canvas.off("selection:cleared", selectionClearedHandler)
        canvas.off("selection:updated", selectionModified)
      }
    }
  }, [canvas, tabObject, objects, render])

  useEffect(() => {
    console.log("========= RENDERING ========== ")
    if (render) {
      console.log(">> Render...")
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const { item } = tabObject.getById(activeObject)
        console.log("object to update.... ", item)
        if (item) {
          activeObject.set(item)
          canvas.requestRenderAll()
          // canvas.renderAll()

          // tabObject.updateSelectedProperties(activeObject)
        }
      }
      setRender(false)
    }
  }, [render, objects])

  /* -------------- TEXTE ---------------- */

  const addText = (canvi) => {
    const textId = uuidv4()
    const text = new fabric.Textbox("Texte", {
      height: 280,
      width: 200,
      fill: "black",
      id: textId,
      Actions: [],
    })

    canvi.add(text)
    canvi.renderAll()
    tabObject.add(text, textId)
    setIsAddingText(false)
  }

  /* -------------- IMAGES ---------------- */

  const addImage = (canvi, imageUrl) => {
    const imgId = uuidv4()
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scale(0.75)
      img.id = imgId
      img.Actions = []
      canvi.add(img)
      tabObject.add(img, imgId)
    })

    canvi.renderAll()
  }

  /* ------------- RECTANGLE ---------------- */

  const addRect = (canvi) => {
    const rectId = uuidv4()

    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: "grey",
      id: rectId,
      Actions: [],
    })

    canvi.add(rect)
    canvi.renderAll()
    tabObject.add(rect, rectId)
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
