import "./EditAssets.scss"
import DropSection from "./components/DropSection"

function EditAssets() {
  return (
    <div className="wrap-assets">
      <DropSection title={"Shop"} />
      <DropSection title={"Heroes"} />
      <DropSection title={"Enemies"} />
      <DropSection title={"Consumables"} />
      <DropSection title={"Weapons"} />
    </div>
  )
}

export default EditAssets
