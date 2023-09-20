import { useState } from "react"

import "./DropSection.scss"

function DropSection({ title, init, Composant: Composant }) {
  const [dropped, setDrop] = useState(init)
  return (
    <>
      <button className="title-drop" onClick={() => setDrop(!dropped)}>
        <span> {title}</span>
      </button>
      <section className={`content ${dropped ? "dropped" : "hidden"}`}>
        {Composant && <Composant />}
      </section>
    </>
  )
}

export default DropSection
