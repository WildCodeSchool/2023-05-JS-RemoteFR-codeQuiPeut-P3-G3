import "./widgetScenes.scss"

import imgImport from "../../../../../../assets/user_ui/import.png"
import imgExport from "../../../../../../assets/user_ui/export.png"
import ButtonUI from "../../../../../global/ButtonUI"

function WidgetScenes() {
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
            <div className="uiScenes__btns">
              <ButtonUI title={"scene 1"} bgColor={"#3e86bb"} width={"100%"} />
              <ButtonUI title={"scene 2"} bgColor={"#3e86bb"} width={"100%"} />
            </div>

            <div className="uiScenes__btnAdd">
              <ButtonUI title={"add"} bgColor={"#3f7841"} width={"100%"} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WidgetScenes
