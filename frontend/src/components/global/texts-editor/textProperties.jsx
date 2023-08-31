import React, { useState } from "react"
import "./textProperties.scss"
import iconAlignLeft from "../../../assets/text_ui/align-left.png"
import iconAlignRight from "../../../assets/text_ui/align-right.png"
import iconAlignCenter from "../../../assets/text_ui/align-center.png"
import iconAlignJustify from "../../../assets/text_ui/align-justify.png"
import ButtonRound from "../../global/Buttons/ButtonRound"

function TextProperties({ setAlignment }) {
  const [selectedAlignment, setSelectedAlignment] = useState(null)

  const handleAlignmentClick = (alignment) => {
    setAlignment(alignment)
    setSelectedAlignment(alignment)
  }

  return (
    <div className="fontProps">
      <p> Alignment</p>
      <div className="fontProps__alignment">
        <ButtonRound
          img={iconAlignLeft}
          onClick={() => handleAlignmentClick("left")}
          active={selectedAlignment === "left"}
        />
        <ButtonRound
          img={iconAlignCenter}
          onClick={() => handleAlignmentClick("center")}
          active={selectedAlignment === "center"}
        />
        <ButtonRound
          img={iconAlignRight}
          onClick={() => handleAlignmentClick("right")}
          active={selectedAlignment === "right"}
        />
        <ButtonRound
          img={iconAlignJustify}
          onClick={() => handleAlignmentClick("justify")}
          active={selectedAlignment === "justify"}
        />
      </div>
    </div>
  )
}

export default TextProperties
