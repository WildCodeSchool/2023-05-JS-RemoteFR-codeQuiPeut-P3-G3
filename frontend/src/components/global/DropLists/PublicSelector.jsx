import Select from "react-select"
import "./PublicSelector.scss"

function PublicSelector({ selectedPublic, setSelectedPublic }) {
  const publicOptions = [
    { value: "6 to 12 yrs old", label: "6 to 12 yrs old" },
    { value: "12 to 18 yrs old", label: "12 to 18 yrs old" },
    { value: "18 to 101 yrs old", label: "18 to 101 yrs old" },
  ]

  const handlePublicChange = (selectedOption) => {
    setSelectedPublic(selectedOption.value)
  }

  return (
    <div className="publicSelector">
      <Select
        options={publicOptions}
        value={selectedPublic}
        onChange={handlePublicChange}
        placeholder={selectedPublic}
      />
    </div>
  )
}

export default PublicSelector
