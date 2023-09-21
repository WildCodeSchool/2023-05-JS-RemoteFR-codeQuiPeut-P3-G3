/* eslint-disable no-restricted-syntax */
import React, { useEffect, useLayoutEffect } from "react"
import { useEditionContext } from "../../../../../../../services/contexts/editionContext.jsx"

const ContainerCanva = ({
  setViewProperties,
  viewEditProperties,
  canvaHeight,
  canvaWidth,
}) => {
  /* <============= Variables & fonctions du contexte ================> */

  // Variables canva
  const { canvas, setCanvas } = useEditionContext()

  // Variables environnement canva
  const { initCanvas, updateSelectedProperties, updateStates } =
    useEditionContext()

  // Triggers getters toolbar
  const { isAddingText, isAddingRect, isAddingPic, isAddingBackground } =
    useEditionContext()

  // Fonctions de creation d'objets fabricJS
  const { addRect, addImage, addText, addBackground, keyDeleteObject } =
    useEditionContext()

  const { backgroundPath, imgPath, setObjectSelected } = useEditionContext()

  /* <===================================================================> */

  /* 01. - Initialisation du canvas */
  useEffect(() => {
    setCanvas(initCanvas())
    // console.log("Recupération story : ", editStatus.storyId, " scene 0 ")
    // getScene(editStatus.storyId, 0)
  }, [])

  /* 02. - Resize canva */
  useLayoutEffect(() => {
    if (canvaHeight || canvaWidth) {
      canvas.setDimensions({
        width: canvaWidth,
        height: canvaHeight,
      })
      canvas.renderAll()
    }
  }, [canvaHeight, canvaWidth, canvas])

  /* 03. - Ajout d'un élément */
  useEffect(() => {
    if (isAddingText) {
      addText(canvas)
    }

    if (isAddingRect) {
      addRect(canvas)
    }

    if (isAddingPic && imgPath !== "") {
      const pathPic = `http://localhost:4242/uploads/${imgPath}`
      addImage(canvas, pathPic)
    }

    if (isAddingBackground) {
      addBackground()
    }
  }, [
    isAddingText,
    isAddingPic,
    isAddingRect,
    isAddingBackground,
    backgroundPath,
    imgPath,
    canvas,
  ])

  /* 04. - Suppression d'un élément */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        keyDeleteObject()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [canvas])

  /* 05. - Gestion manipulation des objets */

  /***********************************************/
  /*           DELETE ALL ELEMENTS               */
  /***********************************************/

  /***********************************************/
  /*          RENDER FROM LOAD SCENE             */
  /***********************************************/
  // useEffect(() => {
  //   console.log("test")
  //   if (objects) {
  //     console.log(objects)

  //     // Suppression de tous les éléments
  //     if (canvas) {
  //       canvas.clear()

  //       for (const textboxId in objects.textbox) {
  //         console.log(textboxId)
  //         const textboxData = objects.textbox[textboxId]
  //         const textbox = new fabric.Textbox(textboxData.text, {
  //           left: textboxData.left,
  //           top: textboxData.top,
  //           width: textboxData.width,
  //           height: textboxData.height,
  //           fill: textboxData.fill,
  //           fontFamily: textboxData.fontFamily,
  //           fontSize: textboxData.fontSize,
  //           textAlign: textboxData.textAlign,
  //           // Ajoutez d'autres propriétés de style ici si nécessaire
  //         })

  //         canvas.add(textbox)
  //       }
  //     }
  //   }
  // }, [editStatus.sceneId])

  useEffect(() => {
    if (canvas) {
      const objectModifiedHandler = function (options) {
        // setObjectSelected({ selected: true })
      }

      const selectionCreatedHandler = function (options) {
        // console.log("selection créé")
        updateSelectedProperties(options.selected[0])
        updateStates(options.selected[0])
        setViewProperties(true)
      }

      const selectionClearedHandler = function (options) {
        setViewProperties(false)
        setObjectSelected({ selected: false })
      }

      const selectionModified = function (options) {
        // console.log("selection modifiée")
        updateSelectedProperties(options.selected[0])
        updateStates(options.selected[0])
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
  }, [canvas])

  /* 06. - Render */

  /*
  /*
  /*
  /*
  /* ================================================================= */
  /* ================================================================= */
  /* ==================/         RETURN        /====================== */
  /* ================================================================= */
  /* ================================================================= */
  /*
  /*
  /*
  /*
  */

  return (
    <>
      <canvas id="myCanva" />
    </>
  )
}

export default ContainerCanva
