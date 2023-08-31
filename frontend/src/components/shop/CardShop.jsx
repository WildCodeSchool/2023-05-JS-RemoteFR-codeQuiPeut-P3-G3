import "./CardShop.scss"
import CartShop from "../../assets/images/CartShopWhite.png"
import BuyNow from "../../assets/images/buyNow.png"

const CardShop = (props) => {
  return (
    <div className="CardShop_Global">
      <div className="CardShop_Content">
        {props.topSales && (
          <div className="CardShop_TopSales">
            <p className="CardShop_TopSalesText">Number 1 sales</p>
            <img src={BuyNow} alt="BuyNow" />
          </div>
        )}
        {props.promotion && (
          <p className="CardShop_Promotion">{props.promotion}</p>
        )}
        <p className="QuantityShop">{props.quantity}</p>
        {props.items && <p className="CardShop_Items">{props.items}</p>}
        <p className="PriceShop">{props.price}</p>
        <img src={CartShop} alt="test" className="CartShopPicture" />
        <button className="button_CardShop">Add to cart</button>
      </div>
    </div>
  )
}

export default CardShop
