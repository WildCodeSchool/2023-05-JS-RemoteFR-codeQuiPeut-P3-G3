import CardShop from "../components/shop/CardShop"
import PaymentShop from "../components/shop/PaymentShop"
import Footer from "../components/global/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import "./Shop.scss"

const Shop = () => {
  // Récupération des informations des cards pour les afficher
  const [cardInfo, setCardInfo] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/shop")
      .then((response) => {
        setCardInfo(response.data)
      })
      .catch((error) => {
        console.warn("Pouetpouet")
        console.error(
          "Une erreur est survenue lors de la récupération des fichiers.",
          error
        )
      })
  }, [])

  // Envoi card choisie à la BDD
  const pushToCart = (cardShopId) => {
    console.info("Step 1 OK \nRécupération idCard sélectionner")
    console.info(cardShopId)
    axios.put(`http://localhost:4242/shop/${cardShopId}`, {
      cardShopId,
    })
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
              cardShopId={cardInfo[0]?.id}
              topSales={null}
              promotion={cardInfo[0]?.discount}
              cardShopQuantity={cardInfo[0]?.credit_quantity}
              items={cardInfo[0]?.items}
              cardShopPrice={cardInfo[0]?.price}
              pushToCart={pushToCart}
            />
          </div>
          <div className="cardShop cardShopMiddle">
            <CardShop
              cardShopId={cardInfo[1]?.id}
              topSales={cardInfo[1]?.best_seller}
              promotion={`get ${cardInfo[1]?.discount}% discount`}
              cardShopQuantity={cardInfo[1]?.credit_quantity}
              items={cardInfo[1]?.items}
              cardShopPrice={cardInfo[1]?.price}
              pushToCart={pushToCart}
            />
          </div>
          <div className="cardShop cardShopRigth">
            <CardShop
              cardShopId={cardInfo[2]?.id}
              promotion={`get ${cardInfo[2]?.discount}% discount`}
              cardShopQuantity={cardInfo[2]?.credit_quantity}
              items={cardInfo[2]?.items}
              cardShopPrice={cardInfo[2]?.price}
              pushToCart={pushToCart}
            />
          </div>
        </div>
        <h3 className="OrangeTitle">&gt; OR</h3>
        <div className="cardShop cardShopMiddle">
          <CardShop
            cardShopId={cardInfo[3]?.id}
            promotion="Unlimited access"
            cardShopQuantity={cardInfo[3]?.credit_quantity}
            items={cardInfo[3]?.items}
            cardShopPrice={cardInfo[3]?.price}
            pushToCart={pushToCart}
          />
        </div>
        <PaymentShop />
      </div>
      <Footer />
    </div>
  )
}

export default Shop
