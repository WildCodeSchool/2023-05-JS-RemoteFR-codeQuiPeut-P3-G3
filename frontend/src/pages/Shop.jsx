import CardShop from "../components/shop/CardShop"
import PaymentShop from "../components/shop/PaymentShop"
import Footer from "../components/global/Footer"
import axios from "axios"
import "./Shop.scss"

const Shop = () => {
  const savePaiement = (cardId, cardShopQuantity, cardShopPrice) => {
    const Paiement = { cardShopQuantity, cardShopPrice, cardId }
    console.info("Paiement:", cardShopPrice)
    console.info("Quantité :", cardShopQuantity)
    console.info("cardId:", cardId)
    axios.post("http://localhost:4242/shop", { Paiement })
  }

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
            <CardShop
              cardId={1}
              promotion=" "
              cardShopQuantity={100}
              items="credits"
              cardShopPrice={5}
              addPaiement={savePaiement}
            />
          </div>
          <div className="cardShop cardShopMiddle">
            <CardShop
              cardId={2}
              topSales="true"
              promotion="get 50% discount"
              cardShopQuantity={1000}
              items="credits"
              cardShopPrice={25}
              addPaiement={savePaiement}
            />
          </div>
          <div className="cardShop cardShopRigth">
            <CardShop
              cardId={3}
              promotion="get 20% discount"
              cardShopQuantity={500}
              items="credits"
              cardShopPrice={20}
              addPaiement={savePaiement}
            />
          </div>
        </div>
        <h3 className="OrangeTitle">&gt; OR</h3>
        <div className="cardShop cardShopMiddle">
          <CardShop
            cardId="4"
            promotion="Unlimited access"
            cardShopQuantity="5$"
            items="/ months"
            cardShopPrice="( 50$ / Year )"
            addPaiement={savePaiement}
          />
        </div>
        <PaymentShop />
      </div>
      <Footer />
    </div>
  )
}

export default Shop
