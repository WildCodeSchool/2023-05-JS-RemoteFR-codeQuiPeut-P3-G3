import { useState } from "react"

import "./DropSection.scss"

function DropSection({ title }) {
  const [dropped, setDrop] = useState(false)
  return (
    <>
      <button className="title" onClick={() => setDrop(!dropped)}>
        <h6> {title}</h6>
      </button>
      <section
        className={`content ${dropped ? "dropped" : "hidden"}`}
      ></section>
    </>
  )
}

export default DropSection
