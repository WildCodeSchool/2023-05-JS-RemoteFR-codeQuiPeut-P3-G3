import "./EditAssets.scss"
import DropSection from "./components/DropSection"

function EditAssets() {
  return (
    <div className="wrap-assets">
      <DropSection title={"Shop"} init={true} />
      <DropSection title={"Heroes"} init={false} />
      <DropSection title={"Enemies"} init={false} />
      <DropSection title={"Consumables"} init={false} />
      <DropSection title={"Weapons"} init={false} />
    </div>
  )
}

export default EditAssets
