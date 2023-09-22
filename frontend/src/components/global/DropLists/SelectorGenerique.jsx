import Select from "react-select"
import "./SelectorGenerique.scss"
import { useEffect } from "react"

function SelectorGenerique({
  selectedCategory,
  setSelectedCategory,
  options,
  styles,
}) {
  const handleCategoryChange = (selectedOption) => {
    // console.log(selectedOption)
    setSelectedCategory(selectedOption.value)
  }

  useEffect(() => {
    // console.log(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="SelectorGenerique">
      <Select
        options={options}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder={selectedCategory}
        styles={styles}
      />
    </div>
  )
}

export default SelectorGenerique
