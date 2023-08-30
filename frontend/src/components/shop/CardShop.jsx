import "./CardShop.scss"
import CartShop from "../../assets/images/CartShopWhite.png"
import BuyNow from "../../assets/images/buyNow.png"

const CardShop = (props) => {
  return (
    <div className="CardShop_Global">
      <div className="CardShop_TopSales">
        {props.topSales ? (
          <>
            <p className="CardShop_TopSalesText">Number 1 sales</p>
            <img src={BuyNow} alt="BuyNow" />
          </>
        ) : null}
      </div>
      {props.promotion ? (
        <p className="CardShop_Promotion">{props.promotion}</p>
      ) : null}
      <p className="QuantityShop">{props.quantity}</p>
      <p>crédits</p>
      <p>{props.price}</p>
      <img src={CartShop} alt="test" className="CartShopPicture" />
      <button>Add to cart</button>
    </div>
  )
}

export default CardShop
