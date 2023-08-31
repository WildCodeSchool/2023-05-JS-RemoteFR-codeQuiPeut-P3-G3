import CardShopTest from "../components/shop/CardShopTest"
import PaymentShop from "../components/shop/PaymentShop"
import Footer from "../components/global/Footer"
import "./Shop.scss"

const Shop = () => {
  return (
    <div className="GlobalContainerShop">
      <div className="titleShopOffers">
        <h3>
          <span className="OrangeTitle">&gt; OUR</span> OFFERS
        </h3>
      </div>
      <div className="Shop_OffersContainer">
        <div className="ShopFirstOffers">
          <div className="cardShop cardShopLeft">
            <CardShopTest
              promotion=" "
              quantity="100"
              items="credits"
              price="5 $"
            />
          </div>
          <div className="cardShop cardShopMiddle">
            <CardShopTest
              topSales="true"
              promotion="get 25% discount"
              quantity="1000"
              items="credits"
              price="25 $"
            />
          </div>
          <div className="cardShop cardShopRigth">
            <CardShopTest
              promotion="get 10% discount"
              quantity="500"
              items="credits"
              price="20 $"
            />
          </div>
        </div>
        <h3 className="OrangeTitle">&gt; OR</h3>
        <div className="cardShop cardShopMiddle">
          <CardShopTest
            promotion="Unlimited access"
            quantity="5$"
            items="/ months"
            price="( 50$ / Year )"
          />
        </div>
        <PaymentShop />
      </div>
      <Footer />
    </div>
  )
}

export default Shop
