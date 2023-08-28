import Select from "react-select"
import "./FontSelector.scss"

function FontSelector({ setSelectedFont, selectedFont }) {
  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Courier New, monospace", label: "Courier New" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
    { value: "Impact, sans-serif", label: "Impact" },
    { value: "Comic Sans MS, sans-serif", label: "Comic Sans MS" },
    { value: "Arial Black, sans-serif", label: "Arial Black" },
    { value: "Palatino, serif", label: "Palatino" },
    { value: "Lucida Sans Unicode, sans-serif", label: "Lucida Sans Unicode" },
    { value: "Tahoma, sans-serif", label: "Tahoma" },
    { value: "Century Gothic, sans-serif", label: "Century Gothic" },
    { value: "Garamond, serif", label: "Garamond" },
    { value: "Book Antiqua, serif", label: "Book Antiqua" },
    { value: "Copperplate, sans-serif", label: "Copperplate" },
    {
      value: "Franklin Gothic Medium, sans-serif",
      label: "Franklin Gothic Medium",
    },
    { value: "Baskerville, serif", label: "Baskerville" },
    { value: "Futura, sans-serif", label: "Futura" },
    { value: "Helvetica Neue, sans-serif", label: "Helvetica Neue" },
    { value: "Rockwell, serif", label: "Rockwell" },
    { value: "Arial Narrow, sans-serif", label: "Arial Narrow" },
    { value: "Myriad Pro, sans-serif", label: "Myriad Pro" },
    { value: "Cambria, serif", label: "Cambria" },
    { value: "Segoe UI, sans-serif", label: "Segoe UI" },
    { value: "Candara, sans-serif", label: "Candara" },
    { value: "Optima, sans-serif", label: "Optima" },
    {
      value: "Arial Rounded MT Bold, sans-serif",
      label: "Arial Rounded MT Bold",
    },
    { value: "Didot, serif", label: "Didot" },
  ]

  const handleFontChange = (selectedOption) => {
    setSelectedFont(selectedOption.value)
  }

  return (
    <div className="font-selector">
      <Select
        options={fontOptions}
        value={selectedFont}
        onChange={handleFontChange}
        placeholder={selectedFont}
      />
      {/* <p style={{ fontFamily: selectedFont ? selectedFont.value : "inherit" }}>
        Texte d'exemple avec la police sélectionnée.
      </p> */}
    </div>
  )
}

export default FontSelector
