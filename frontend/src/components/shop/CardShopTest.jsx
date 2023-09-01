import "./CardShopTest.scss"
import CartShop from "../../assets/images/CartShopWhite.png"
import BuyNow from "../../assets/images/buyNow.png"

const CardShop = (props) => {
  return (
    <div className="wrap-CardShop">
      <div className="background_Cardshop"></div>
      <div className="CardShop_Global">
        <div className="CardShop_Content">
          {props.topSales && (
            <div className="CardShop_TopSales">
              <p className="CardShop_TopSalesText">Number 1 sales</p>
              <img src={BuyNow} alt="BuyNow" />
            </div>
          )}
          {props.promotion && props.promotion.trim() !== "" && (
            <p className="CardShop_Promotion" data-content={props.promotion}>
              {props.promotion}
            </p>
          )}
          <div className="CardShop_BlocItems">
            <p className="QuantityShop">{props.quantity}</p>
            {props.items && <p className="CardShop_Items">{props.items}</p>}
          </div>
          <p className="PriceShop">{props.price}</p>
          <div className="CardShop_BlocCart">
            <img src={CartShop} alt="test" className="CartShopPicture" />
            <button className="button_CardShop">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardShop
