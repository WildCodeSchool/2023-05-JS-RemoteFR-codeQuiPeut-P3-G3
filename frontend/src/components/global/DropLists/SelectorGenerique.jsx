import Select from "react-select"
import "./SelectorGenerique.scss"

function SelectorGenerique({
  selectedCategory,
  setSelectedCategory,
  options,
  styles,
}) {
  // const categoryOptions = [
  //   { value: "Action", label: "Action" },
  //   { value: "CyberPunk", label: "CyberPunk" },
  //   { value: "Fantastic", label: "Fantastic" },
  //   { value: "Horror", label: "Horror" },
  //   { value: "Medieval", label: "Medieval" },
  //   { value: "Mythology", label: "Mythology" },
  //   { value: "Post-Apocaliptic", label: "Post-Apocaliptic" },
  //   { value: "Prehistoric", label: "Prehistoric" },
  //   { value: "Renaissance", label: "Renaissance" },
  //   { value: "Sci-fi", label: "Sci-fi" },
  //   { value: "Space", label: "Space" },
  //   { value: "Western", label: "Western" },
  // ]
  // console.log(options)
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value)
  }

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
