/* eslint-disable no-restricted-syntax */
import WidgetButtons from "./WidgetButtons"
import "./style/ActionsType.scss"
import { useState, useEffect } from "react"
import imgPlus from "../../../assets/text_ui/plus.png"
import { useEditionContext } from "../../../services/contexts/editionContext"

function ActionType() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedTarget, setSelectedTarget] = useState("")
  const [selectedNumber, setSelectedNumber] = useState("")

  const [showTarget, setShowTarget] = useState(false)

  const { canvas, setUpdateActions } = useEditionContext()

  const styles = {
    valueContainer: (base) => ({
      ...base,
      maxHeight: 20,
      fontSize: 15,
    }),
    // Menu deroulat (partie texte)
    menu: (base) => ({
      ...base,
      width: 150,
    }),
    // Menu deroulant (partie "box")
    menuList: (base) => ({
      ...base,
      maxHeight: 150,
      width: 150,
    }),
    // Selecteur
    control: (base) => ({
      ...base,
      maxHeight: 15,
      //   width: 150,
      minWidth: 80,
      alignItems: "center",
    }),
  }

  const valueType = [
    { value: "add", label: "add" },
    { value: "subs", label: "subs" },
    { value: "shop", label: "shop" },
    { value: "fight", label: "fight" },
  ]

  const valueTarget = [
    { value: "life", label: "life" },
    { value: "attack", label: "attack" },
    { value: "defense", label: "defense" },
    { value: "assets", label: "assets" },
  ]

  const valueNumber = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ]

  const handlePushAction = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        // Récupérez la valeur actuelle du tableau "Actions"
        const currentActions = activeObject.get("Actions") || []

        // Créez un nouvel objet à pousser dans le tableau
        const newAction = {
          type: selectedType,
          target: selectedTarget,
          number: selectedNumber,
        }

        // Ajoutez le nouvel objet au tableau
        currentActions.push(newAction)

        // Mettez à jour les propriétés de l'objet actif avec le tableau mis à jour
        activeObject.set({ Actions: currentActions })

        // Appelez renderAll pour mettre à jour l'affichage du canvas
        canvas.renderAll()
        setUpdateActions(true)
      }
    }
  }

  useEffect(() => {
    if (selectedType === "add" || selectedType === "subs") {
      setShowTarget(true)
    } else {
      setShowTarget(false)
    }
  }, [selectedType, selectedTarget, selectedNumber])

  return (
    <div className="actionType">
      <div className="col">
        <span> Type</span>
        <WidgetButtons
          styles={styles}
          data={valueType}
          selected={selectedType}
          setter={setSelectedType}
        />
      </div>
      {showTarget && (
        <>
          <div className="col">
            <span> Target</span>
            <WidgetButtons
              styles={styles}
              data={valueTarget}
              selected={selectedTarget}
              setter={setSelectedTarget}
            />
          </div>
          <div className="col">
            <span> Number</span>
            <WidgetButtons
              styles={styles}
              data={valueNumber}
              selected={selectedNumber}
              setter={setSelectedNumber}
            />
          </div>
        </>
      )}
      <div className="col">
        <span> add</span>
        <div className="images">
          <img src={imgPlus} alt="img-plus" onClick={handlePushAction} />
        </div>
      </div>
    </div>
  )
}

export default ActionType
