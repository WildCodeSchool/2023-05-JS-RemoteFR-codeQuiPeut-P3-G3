import SelectorGenerique from "../DropLists/SelectorGenerique"
import "./WidgetButtons.scss"

function WidgetButtons() {
  /* Format */

  /* FAIRE UN AXIOS POUR RECUPERER LES SCENES EN DB */

  const optionsTest = [
    { value: "scene_1", label: "scene 1" },
    { value: "scene_2", label: "scene 2" },
    { value: "scene_3", label: "scene 3" },
    { value: "scene_4", label: "scene 4" },
    { value: "scene_5", label: "scene 5" },
    { value: "scene_6", label: "scene 6" },
  ]

  return (
    <>
      <SelectorGenerique options={optionsTest} />
    </>
  )
}

export default WidgetButtons
