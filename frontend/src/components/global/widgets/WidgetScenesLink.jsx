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
import ActionType from "./ActionsType"
import { useEditionContext } from "../../../services/contexts/editionContext"
import { stylesDLAdminActions } from "../DropLists/stylesDropList"

function WidgetScenesLink() {
  const [linkView, setLinkView] = useState(false)
  const [extend, setExtend] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [tabElem, setTabElem] = useState([])

  // eslint-disable-next-line no-unused-vars
  const { objectSelected, objects, tabObject, render } = useEditionContext()

  // const handleDelete = (indexToDelete) => {
  //   const updatedActions = { ...objects }

  //   const { id, type } = objectSelected

  //   console.log(" ==== DELETE ==== ")
  //   console.log("id : ", indexToDelete, " log : ", updatedActions)

  //   const currentActions = [...updatedActions[type][id].Actions]
  //   console.log("Actions avant splice : ", currentActions)

  //   currentActions.splice(indexToDelete, 1)
  //   console.log("Actions après splice ", currentActions)

  //   updatedActions[type][id].Actions = currentActions
  //   console.log("actions mises à jour  : ", updatedActions)

  //   tabObject.saveProperties(updatedActions)
  // }

  useEffect(() => {
    if (objectSelected.type !== "") {
      console.log("maj table map")
      // majTab() << attention
    }
  }, [objects])

  /* gestion affichage options */
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

  // const majTab = () => {
  //   const { type, id } = objectSelected

  //   if (type !== "" && id !== "" && objects[type][id].Actions.length > 0) {
  //     // Utilisez "map" pour créer le tableau d'éléments JSX
  //     const newTabElem = objects[type][id].Actions.map((elem, index) => (
  //       <tr key={index}>
  //         <td>{elem.type}</td>
  //         <td>{elem.target}</td>
  //         <td>{elem.number}</td>
  //         <td>
  //           <img
  //             src={imgDelete}
  //             alt="img-delete"
  //             onClick={() => handleDelete(index)}
  //           />
  //         </td>
  //       </tr>
  //     ))

  //     // Définissez le tableau d'éléments JSX dans l'état "tabElem"
  //     setTabElem(newTabElem)
  //   }
  // }

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

      <div className={`objectProps ${extend ? "extended links" : "hidden"}`}>
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
                  <WidgetButtons styles={stylesDLAdminActions} />
                </div>
              </div>
            </>
          )}
          <h6> Actions </h6>
        </div>

        <>
          <div className="objectProps__section__props">
            {tabElem.length > 0 ? (
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
                  <tbody>{tabElem}</tbody>
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
