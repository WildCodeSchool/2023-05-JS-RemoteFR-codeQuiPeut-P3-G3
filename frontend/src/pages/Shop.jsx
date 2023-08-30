import CardShop from "../components/shop/CardShop"
import "./Shop.scss"

const Shop = () => {
  return (
    <div className="GlobalContainerShop">
      <div className="Shop_OffersContainer">
        <div className="titleShopOffers">
          <h3> OUR OFFERS</h3>
        </div>
        <div className="ShopFirstOffers">
          <div className="cardShop cardShopLeft">
            <CardShop promotion=" " quantity="100" price="5" />
          </div>
          <div className="cardShop cardShopMiddle">
            <CardShop
              topSales="true"
              promotion="get 25% discount"
              quantity="1000"
              price="25"
            />
          </div>
          <div className="cardShop cardShopRigth">
            <CardShop promotion="get 10% discount" quantity="500" price="20" />
          </div>
        </div>
        <h3>OR</h3>
        <div className="cardShop cardShopMiddle">
          <CardShop promotion="Unlimited access" price="5" />
        </div>
        <div className="Shop_PaypalContainer"></div>
      </div>
    </div>
  )
}

export default Shop
