import "./CardShop.scss"
import CartShop from "../../assets/images/CartShopWhite.png"
import BuyNow from "../../assets/images/buyNow.png"

const CardShop = (props) => {
  // const handlePaiement = () => {
  //   props.setCardShopPrice(props.cardShopPrice)
  //   props.setCardShopQuantity(props.cardShopQuantity)
  // }

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
          {/* Ternaire pour gérer la disposition de la carte */}
          {props.cardShopId !== 3 ? (
            <>
              <div className="CardShop_BlocItems">
                <p className="QuantityShop">{props.cardShopQuantity}</p>
                {props.items && <p className="CardShop_Items">{props.items}</p>}
              </div>
              <p className="PriceShop">{props.cardShopPrice} $</p>
            </>
          ) : (
            <>
              <p className="PriceShop">{props.cardShopPrice} $</p>
              <div className="CardShop_BlocItems">
                <p className="QuantityShop">{props.cardShopQuantity}</p>
                {props.items && <p className="CardShop_Items">{props.items}</p>}
              </div>
            </>
          )}
          <div
            className="CardShop_BlocCart"
            onClick={() =>
              props.pushToCart(props.cardShopId, props.cardShopQuantity)
            }
          >
            <img src={CartShop} alt="test" className="CartShopPicture" />
            <button className="button_CardShop">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardShop
