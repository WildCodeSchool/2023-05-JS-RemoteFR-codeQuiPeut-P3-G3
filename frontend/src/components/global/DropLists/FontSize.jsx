import Select from "react-select"
import "./FontSize.scss"

function FontSize({ setSelectedSize, selectedSize }) {
  const sizeOptions = [
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "18", label: "18" },
    { value: "20", label: "20" },
    { value: "22", label: "22" },
    { value: "24", label: "24" },
    { value: "26", label: "26" },
    { value: "28", label: "28" },
    { value: "30", label: "30" },
    { value: "32", label: "32" },
    // Ajoutez plus d'options de tailles ici
  ]

  const handleSizeChange = (selectedOption) => {
    setSelectedSize(selectedOption.value)
  }

  return (
    <div className="font-size">
      <Select
        options={sizeOptions}
        value={selectedSize}
        onChange={handleSizeChange}
        placeholder={selectedSize}
      />
    </div>
  )
}

export default FontSize
