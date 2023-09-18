import { useRef, useState, useEffect } from "react"

import "./EditScenes.scss"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/WidgetToolbar"
import ButtonUI from "../../../../global/Buttons/ButtonUI"
import ContainerCanva from "./constructor/canva/ContainerCanva"
import PopupImgFinder from "../../../../global/popups/ImageFinderPopup/PopupImgFinder"
import WidgetPosition from "../../../../global/widgets/WidgetPosition"
import WidgetTexts from "../../../../global/widgets/WidgetTexts"
import WidgetRect from "../../../../global/widgets/WidgetRect"
import WidgetScenesLink from "../../../../global/widgets/WidgetScenesLink"
import { useEditionContext } from "../../../../../services/contexts/editionContext.jsx"
import { objects } from "../../../../../services/variables/objEdition"
import { useLocation } from "react-router-dom"

function EditScenes() {
  const canvasRef = useRef(null)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const story = params.get("story")
  const scene = params.get("scene")

  const [viewEditProperties, setViewProperties] = useState(false)

  /* RECUPERATION DES PROPRIETES */
  const { objectSelected, setObjectSelected, exportScenes } =
    useEditionContext()

  /* Popup image viewer */
  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)
  const [imgPath, setImgPath] = useState("")
  const [backgroundPath, setBackgroundPath] = useState("")
  console.info(backgroundPath)

  /* Taille de l'élément canva */
  const [canvaWidth, setCanvaWidth] = useState(0)
  const [canvaHeight, setCanvaHeight] = useState(0)

  const { isAddingPic, isAddingBackground, isAddingText } = useEditionContext()
  const { setIsAddingPic, setIsAddingBackground } = useEditionContext()
  const { editStatus, editSettings, deleteScene } = useEditionContext()

  /* Init */
  useEffect(() => {
    const handleResize = () => {
      calculateChildSize()
    }
    window.addEventListener("resize", handleResize)
    calculateChildSize()

    // Recupération scene en cours
    // if (story && scene) {
    //   getScene(story, scene)
    // }
    return () => {
      window.removeEventListener("resize", handleResize)
    }

    /* récupération id scene */
  }, [])

  useEffect(() => {
    if (story && scene) {
      editSettings(story, scene)
    }
  }, [story, scene])

  /* Actions quand quitte la popup */
  useEffect(() => {
    if (!viewImgFinder) {
      setIsAddingPic(false)
      setIsAddingBackground(false)
      setImgPath("")
      setBackgroundPath("")
      setSelectedPath("")
    }
  }, [viewImgFinder])

  /* Calcul de la taille du canvas par rapport à parent 16/9 */
  const calculateChildSize = () => {
    const canvasElement = canvasRef.current

    if (canvasElement) {
      const parentWidth = canvasElement.clientWidth - 0
      const childWidth = parentWidth
      const childHeight = (childWidth * 9) / 16
      canvasElement.style.height = childHeight + "px"
      setCanvaWidth(childWidth)
      setCanvaHeight(childHeight)
    }
  }

  /* Actions quand selection d'une image */
  useEffect(() => {
    if (isAddingPic || isAddingBackground) {
      setViewImgFinder(true)
    }

    if (isAddingPic && selectedPath) {
      setImgPath(selectedPath)
    }

    if (isAddingBackground && selectedPath) {
      setBackgroundPath(selectedPath)
    }
  }, [isAddingPic, isAddingBackground, isAddingText, selectedPath])

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
          <div ref={canvasRef} className="scenes__constructor__canva">
            <ContainerCanva
              canvasRef={canvasRef}
              setViewProperties={setViewProperties}
              viewEditProperties={viewEditProperties}
              backgroundPath={selectedPath}
              imgPath={imgPath}
              canvaWidth={canvaWidth}
              canvaHeight={canvaHeight}
            />
            {/* <CanvasWithText /> */}
          </div>
          <div className="scenes__constructor__btn">
            <ButtonUI
              title={"save"}
              bgcolor={"#3f7841"}
              onClick={() => exportScenes(objects, story, scene)}
            />
            <ButtonUI title={"reset"} bgcolor={"#0A0A0A"} />
            <ButtonUI
              title={"delete"}
              bgcolor={"#902B00"}
              onClick={() =>
                deleteScene(editStatus.storyId, editStatus.sceneId)
              }
            />
          </div>
        </div>
        <div className="scenes__properties">
          <WidgetPosition />

          {objectSelected.type === "textbox" && (
            <WidgetTexts
              viewEditProperties={viewEditProperties}
              objectSelected={objectSelected}
              setObjectSelected={setObjectSelected}
            />
          )}

          <WidgetRect viewEditProperties={viewEditProperties} />
          <WidgetScenesLink />
        </div>
      </div>
      {/* Popup recherche image */}
      {viewImgFinder && (
        <PopupImgFinder
          setViewImgFinder={setViewImgFinder}
          setSelectedPath={setSelectedPath}
          selectedPath={selectedPath}
        />
      )}
    </>
  )
}

export default EditScenes
