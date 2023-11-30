import "./widgetScenes.scss"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import imgImport from "../../../../../../assets/user_ui/import.png"
import imgExport from "../../../../../../assets/user_ui/export.png"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"

import { useEditionContext } from "../../../../../../services/contexts/editionContext"

function WidgetScenes() {
  const { editStatus, addScene } = useEditionContext()
  const { getScene, setSearchParams, editSettings } = useEditionContext()

  const MajScene = (idScene) => {
    // console.log("mise à jour scene : ", idScene)
    getScene(editStatus.storyId, idScene)
    setSearchParams({ story: editStatus.storyId, scene: idScene })
    editSettings(editStatus.storyId, idScene)
    // console.log("récupération faite")
  }

  const handleClickScene = (idScene) => {
    MajScene(idScene)
  }

  const [boutons, setBoutons] = useState([])

  useEffect(() => {
    const boutons = []

    for (let i = 0; i < editStatus.nbreScene; i++) {
      boutons.push(
        <ButtonUI
          key={i}
          title={`scene ${i + 1}`}
          bgcolor={parseInt(editStatus.sceneId) === i ? "#3e86bb" : "#0c426a"}
          width={"100%"}
          onClick={() => handleClickScene(i)}
        />
      )
    }

    setBoutons(boutons)
  }, [editStatus])

  useEffect(() => {
    MajScene(0)
  }, [])

  return (
    <>
      <div className="widgetScenes">
        <div className="title-scenes">
          <span>Scenes</span>
        </div>

        <div className="import">
          <div className="import__wrapBtnImport">
            <button type="button">
              <img src={imgImport} alt="import" />
            </button>
            <span>Import</span>
          </div>

          <div className="import__wrapBtnImport">
            <button type="button">
              <img src={imgExport} alt="export" />
            </button>
            <span>Export</span>
          </div>
        </div>

        <div className="wrap-central">
          <div className="uiScenes">
            <div className="uiScenes__btns">{boutons}</div>

            <div className="uiScenes__btnAdd">
              <ButtonUI
                title={"add"}
                bgColor={"#3f7841"}
                width={"100%"}
                onClick={() => addScene(editStatus.storyId)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WidgetScenes
