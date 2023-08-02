import { useState } from "react"

import "./DropSection.scss"

function DropSection({ title, init }) {
  const [dropped, setDrop] = useState(init)
  return (
    <>
      <button className="title-drop" onClick={() => setDrop(!dropped)}>
        <span> {title}</span>
      </button>
      <section
        className={`content ${dropped ? "dropped" : "hidden"}`}
      ></section>
    </>
  )
}

export default DropSection
