import Select from "react-select"
import "./FontType.scss"

function FontType({ selectedType, setSelectedType }) {
  const typeOptions = [
    { value: "Bold", label: "Bold" },
    { value: "Italic", label: "Italic" },
    { value: "Normal", label: "Normal" },
    { value: "Underlined", label: "Underlined" },
  ]

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption.value)
  }

  return (
    <div className="fontType">
      <Select
        options={typeOptions}
        value={selectedType}
        onChange={handleTypeChange}
        placeholder={selectedType}
      />
    </div>
  )
}

export default FontType
