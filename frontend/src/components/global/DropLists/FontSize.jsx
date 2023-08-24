import Select from "react-select"
import "./FontSize.scss"

function FontSize({ setSelectedSize, selectedSize }) {
  const sizeOptions = [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
    { value: "20px", label: "20px" },
    { value: "22px", label: "22px" },
    { value: "24px", label: "24px" },
    { value: "26px", label: "26px" },
    { value: "28px", label: "28px" },
    { value: "30px", label: "30px" },
    { value: "32px", label: "32px" },
    // Ajoutez plus d'options de tailles ici
  ]

  const handleSizeChange = (selectedOption) => {
    setSelectedSize(selectedOption)
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
