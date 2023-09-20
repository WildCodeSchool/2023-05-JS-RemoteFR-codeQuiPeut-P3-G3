import { useState } from "react"

import "./DropSection.scss"
import CharacterSettings from "./CharacterSettings/CharacterSettings"

function DropSection({ title, init }) {
  const [dropped, setDrop] = useState(init)
  return (
    <>
      <button className="title-drop" onClick={() => setDrop(!dropped)}>
        <span> {title}</span>
      </button>
      <section className={`content ${dropped ? "dropped" : "hidden"}`}>
        <CharacterSettings />
      </section>
    </>
  )
}

export default DropSection
