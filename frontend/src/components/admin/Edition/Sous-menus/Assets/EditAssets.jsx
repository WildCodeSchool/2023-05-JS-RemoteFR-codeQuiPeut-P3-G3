import "./EditAssets.scss"
import DropSection from "./components/DropSection"
import CharacterSettings from "./components/CharacterSettings/CharacterSettings"

function EditAssets() {
  return (
    <div className="wrap-assets">
      {/* <DropSection title={"Shop"} init={true} Composant={CharacterSettings} /> */}
      <DropSection title={"Heroes"} init={true} Composant={CharacterSettings} />
      {/* <DropSection
        title={"Enemies"}
        init={false}
        Composant={CharacterSettings}
      /> */}
      <DropSection
        title={"Consumables"}
        init={false}
        Composant={CharacterSettings}
      />
      <DropSection
        title={"Weapons"}
        init={false}
        Composant={CharacterSettings}
      />
    </div>
  )
}

export default EditAssets
