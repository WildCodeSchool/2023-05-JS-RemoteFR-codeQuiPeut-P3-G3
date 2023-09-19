import SelectorGenerique from "../DropLists/SelectorGenerique"
import "./WidgetButtons.scss"

function WidgetButtons({ styles, data, selected, setter }) {
  /* Format */

  /* FAIRE UN AXIOS POUR RECUPERER LES SCENES EN DB */

  return (
    <>
      <SelectorGenerique
        options={data}
        styles={styles}
        selectedCategory={selected}
        setSelectedCategory={setter}
      />
    </>
  )
}

export default WidgetButtons
