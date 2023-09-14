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

  const { objectSelected, tabObject } = useEditionContext()

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

  const handleAction = () => {
    if (selectedType !== "" && objectSelected) {
      const Actions = {
        ...objectSelected.actions,
        type: selectedType,
        target: selectedTarget,
        number: selectedNumber,
      }

      const wrapper = { Actions }

      tabObject.updateById(wrapper)
      resetLocalState()
    }
  }

  const resetLocalState = () => {
    setSelectedType("")
    setSelectedTarget("")
    setSelectedNumber("")
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

      <div className="images">
        <img src={imgPlus} alt="img-plus" onClick={handleAction} />
      </div>
    </div>
  )
}

export default ActionType
