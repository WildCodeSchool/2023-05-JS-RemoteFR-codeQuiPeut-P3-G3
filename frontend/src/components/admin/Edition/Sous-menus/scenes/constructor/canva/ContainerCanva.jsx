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
  const { tabObject, initCanvas, objects, render } = useEditionContext()

  // Triggers getters toolbar
  const { isAddingText, isAddingRect, isAddingPic, isAddingBackground } =
    useEditionContext()

  // Fonctions de creation d'objets fabricJS
  const { addRect, addImage, addText, addBackground, keyDeleteObject } =
    useEditionContext()

  const { backgroundPath, imgPath } = useEditionContext()

  /* <===================================================================> */

  /* 01. - Initialisation du canvas */
  useEffect(() => {
    setCanvas(initCanvas())
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
      // console.log("ajout picture, valeur path : " + pathPic)
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
        console.log("touche supp")
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
        console.log("objet modifié", options.target)

        // tabObject.saveProperties(options.target)

        // tabObject.updateSelectedProperties(options.target)
      }

      const selectionCreatedHandler = function (options) {
        console.log("selection créé")
        // tabObject.resetProperties(options.target)
        tabObject.updateSelectedProperties(options.selected[0])
        tabObject.saveProperties(options.selected[0])
        setViewProperties(true)
        // setRender(true)
      }

      const selectionClearedHandler = function (options) {
        // console.log("selection clear")
        setViewProperties(false)
        // if (options) {
        //   tabObject.resetProperties(options.target)
        // }
      }

      const selectionModified = function (options) {
        console.log("selection modifiée")
        // console.log(options)
        // console.log(options.deselected[0])
        // // tabObject.resetProperties(options.target)
        // // tabObject.saveProperties(options.deselected[0])
        // tabObject.updateSelectedProperties(options.selected[0])
      }

      const objectMouseDownHandler = function (options) {
        console.log("mousedown")

        // tabObject.resetProperties(options.target)
        // tabObject.updateSelectedProperties(options.selected[0])
      }

      canvas.on("mouse:down", objectMouseDownHandler)
      canvas.on("object:modified", objectModifiedHandler)
      canvas.on("selection:created", selectionCreatedHandler)
      canvas.on("selection:cleared", selectionClearedHandler)
      canvas.on("selection:updated", selectionModified)

      return () => {
        canvas.off("mouse:down", objectMouseDownHandler)
        canvas.off("object:modified", objectModifiedHandler)
        canvas.off("selection:created", selectionCreatedHandler)
        canvas.off("selection:cleared", selectionClearedHandler)
        canvas.off("selection:updated", selectionModified)
      }
    }
  }, [canvas, tabObject, objects, render])

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
