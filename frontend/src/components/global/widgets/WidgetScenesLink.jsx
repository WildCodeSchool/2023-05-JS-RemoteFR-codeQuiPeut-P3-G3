/* eslint-disable no-restricted-syntax */
/* Packages */
import { useState, useEffect } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import WidgetButtons from "./WidgetButtons"

/* Images */
import imgSwitchOff from "../../../assets/user_ui/switch_off.png"
import imgSwitchOn from "../../../assets/user_ui/switch_on.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"
import imgDelete from "../../../assets/text_ui/minus.png"
// import imgPlus from "../../../assets/text_ui/plus.png"
import ActionType from "./ActionsType"
import { useEditionContext } from "../../../services/contexts/editionContext"
// Importez "object" des "prop-types" si nécessaire

function WidgetScenesLink({
  viewEditRect,
  setSelectedColorBg,
  setSelectedColorBorder,
  selectedColorBg,
  selectedColorBorder,
}) {
  const [linkView, setLinkView] = useState(false)
  const [extend, setExtend] = useState(false)
  const [tabElem, setTabElem] = useState([])

  const { objectSelected, objects, tabObject, render } = useEditionContext()

  const styles = {
    valueContainer: (base) => ({
      ...base,
      maxHeight: 20,
      fontSize: 15,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 120,
      //   maxWidth: 130,
    }),
    control: (base) => ({
      ...base,
      maxHeight: 15,
      maxWidth: 100,
      minWidth: 80,
      alignItems: "center",
    }),
  }

  const handleDelete = (indexToDelete) => {
    const updatedActions = { ...objectSelected }

    console.log("id : ", indexToDelete, " log : ", updatedActions)
    console.log(" ==== DELETE ==== ")
    console.log("test , ", updatedActions.properties.Actions)
    const currentActions = [updatedActions.properties.Actions]
    console.log("Actions avant splice : ", currentActions)

    currentActions.splice(indexToDelete, 1)
    console.log("Actions après splice ", currentActions)

    updatedActions.properties.Actions = currentActions
    console.log("actions mises à jour  : ", updatedActions)

    tabObject.saveProperties(updatedActions)

    // tabObject.updateSelectedProperties(updatedActions)

    //   tabObject.saveProperties(objectSelected)
    //   return {
    //     ...prev,
    //     Actions: updatedActions,
    //   }
    // })
  }

  useEffect(() => {
    console.log("objects refresh")
    majTab()
  }, [objects])

  useEffect(() => {
    console.log(tabElem)
  }, [tabElem])

  // useEffect(() => {
  //   console.log("selected refresh")
  // }, [objects])

  // useEffect(() => {
  //   console.log("save refresh")
  // }, [objects])

  useEffect(() => {
    if (objectSelected.type === "") {
      setExtend(false)
    } else {
      setExtend(true)
    }
  }, [objects, objectSelected, render])

  const checkExtend = () => {
    if (objectSelected.type !== "") {
      setExtend(!extend)
    } else {
      setExtend(false)
    }
  }

  const majTab = () => {
    const type = objectSelected.type
    const id = objectSelected.id

    if (
      objects &&
      objectSelected &&
      objectSelected.Actions &&
      objectSelected.Actions.length > 0
    ) {
      // Utilisez "map" pour créer le tableau d'éléments JSX
      const newTabElem = objects[type][id].Actions.map((elem, index) => (
        <tr key={index}>
          <td>{elem.type}</td>
          <td>{elem.target}</td>
          <td>{elem.number}</td>
          <td>
            <img
              src={imgDelete}
              alt="img-delete"
              onClick={() => handleDelete(index)}
            />
          </td>
        </tr>
      ))

      // Définissez le tableau d'éléments JSX dans l'état "tabElem"
      setTabElem(newTabElem)
    }
  }

  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => checkExtend()}>
        <span>Scenes link</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>

      <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
        <div className="objectProps__section">
          <h6> Scene Link </h6>
          <div className="objectProps__section__props">
            <span> activate </span>
            <button
              type="button"
              className="btn-switchLinkScene"
              alt="icon-switch"
              onClick={() => setLinkView(!linkView)}
            >
              <img
                src={linkView ? imgSwitchOn : imgSwitchOff}
                alt="icon-switch"
              />
            </button>
          </div>
          {linkView && (
            <>
              <div className="objectProps__section__props">
                <span className="item"> Scene to link </span>

                <div className="sets">
                  <WidgetButtons styles={styles} />
                </div>
              </div>
            </>
          )}
          <h6> Actions </h6>
        </div>

        <>
          <div className="objectProps__section__props">
            {tabElem ? (
              <div className="listActions">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Target</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {tabElem && tabElem.length > 0 && <tbody>{tabElem}</tbody>}
                </table>
              </div>
            ) : (
              <div className="objectProps__section__props">
                <span>
                  <strong>No actions currently.</strong>
                </span>
              </div>
            )}
          </div>
          <div className="objectProps__section__props">
            <div className="separator"></div>
          </div>
          {/* <button onClick={test} /> */}
          <div className="objectProps__section__props">
            {/* <div className="sets"> */}
            <ActionType />
            {/* </div> */}
          </div>
        </>
      </div>
    </div>
  )
}

export default WidgetScenesLink
