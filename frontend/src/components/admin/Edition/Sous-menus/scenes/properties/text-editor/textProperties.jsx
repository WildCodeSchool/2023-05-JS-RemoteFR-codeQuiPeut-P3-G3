import React, { useState } from "react"
import "./textProperties.scss"
import iconAlignLeft from "../../../../../../../assets/text_ui/align-left.png"
import iconAlignRight from "../../../../../../../assets/text_ui/align-right.png"
import iconAlignCenter from "../../../../../../../assets/text_ui/align-center.png"
import iconAlignJustify from "../../../../../../../assets/text_ui/align-justify.png"
import ButtonRound from "../../../../../../global/Buttons/ButtonRound"

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
          onClick={() => handleAlignmentClick("text-align: left")}
          active={selectedAlignment === "text-align: left"}
        />
        <ButtonRound
          img={iconAlignCenter}
          onClick={() => handleAlignmentClick("text-align: center")}
          active={selectedAlignment === "text-align: center"}
        />
        <ButtonRound
          img={iconAlignRight}
          onClick={() => handleAlignmentClick("text-align: right")}
          active={selectedAlignment === "text-align: right"}
        />
        <ButtonRound
          img={iconAlignJustify}
          onClick={() => handleAlignmentClick("text-align: justify")}
          active={selectedAlignment === "text-align: justify"}
        />
      </div>
    </div>
  )
}

export default TextProperties
