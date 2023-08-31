import { ChromePicker } from "react-color"
import "./ColorSelector.scss"

function ColorSelector({ state, onClose, selectedColor, setSelectedColor }) {
  const handleColorChange = (color) => {
    setSelectedColor(color.hex)
  }

  const handleConfirm = () => {
    onClose(selectedColor)
  }

  return (
    <div className={`color-picker ${state ? "visible" : ""}`}>
      <ChromePicker color={selectedColor} onChange={handleColorChange} />
      <button onClick={handleConfirm}>Confirmer</button>
    </div>
  )
}

export default ColorSelector
