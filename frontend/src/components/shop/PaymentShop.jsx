import { useEffect, useState } from "react"
import Payment from "../../assets/images/logoPaypal.png"
import "./PaymentShop.scss"
import axios from "axios"

const PaymentShop = (props) => {
  const [cartItems, setCartItems] = useState([])
  const [cartItemsTotal, setCartItemsTotal] = useState(0)

  useEffect(() => {
    // Effectuez une requête pour récupérer les produits de la table shopping_card_item depuis votre API
    axios
      .get("http://localhost:4242/shopping_card_item")
      .then((response) => {
        // Récupérez les données des produits
        const items = response.data

        // Mettez à jour l'état des produits
        console.info(cartItemsTotal)
        setCartItems(items)

        // Calculez le total du prix en additionnant les prix de chaque produit
        const total = items.reduce((acc, item) => acc + item.price, 0)
        setCartItemsTotal(total)
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des produits.",
          error
        )
      })
  }, [])

  // Récupération info cards

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

  // Calcul du total des prix
  let totalPrice = 0

  // Ajoutez les prix à totalPrice
  cartItems.forEach((item) => {
    totalPrice += cardInfo[item.shop_credit_item_id - 1]?.price
  })

  const [cardNumber, setCardNumber] = useState("")
  const [expirationMonth, setExpirationMonth] = useState("")
  const [expirationYear, setExpirationYear] = useState("")
  const [cvc, setCvc] = useState("")

  // Fonction de validation pour n'accepter que des chiffres
  const handleCardNumberChange = (e) => {
    let input = e.target.value

    // Supprime tous les caractères non numériques
    input = input.replace(/\D/g, "")

    // Ajoute des espaces après chaque groupe de quatre chiffres
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ")

    if (input.length > 19) {
      input = input.slice(0, 16)
    }

    setCardNumber(input)
  }

  const handleCvcChange = (e) => {
    let input = e.target.value

    // Utilisez une expression régulière pour vérifier que l'entrée contient uniquement des chiffres
    input = input.replace(/\D/g, "") // Supprime les caractères non numériques

    // Limite la longueur de la saisie à 3 chiffres
    if (input.length > 3) {
      input = input.slice(0, 3)
    }

    setCvc(input)
  }

  // Fonction de gestionnaire d'événements pour le bouton "Pay Now"
  const handlePayNowClick = (props) => {
    // Collectez toutes les informations dont vous avez besoin
    const paymentData = {
      cardNumber,
      expirationMonth,
      expirationYear,
      cvc,
    }

    console.info(paymentData)

    // Vous pouvez ici envoyer ces données au serveur ou effectuer d'autres actions nécessaires
    // Par exemple, vous pouvez utiliser Axios pour effectuer une requête POST au serveur
    // axios.post("/votre/url/de/serveur", paymentData)
    //   .then((response) => {
    //     // Gérer la réponse du serveur si nécessaire
    //   })
    //   .catch((error) => {
    //     // Gérer les erreurs si nécessaire
    //   });

    setCardNumber("")
    setExpirationMonth("")
    setExpirationYear("")
    setCvc("")
  }

  return (
    <div className="Shop_PaymentContainerGlobal">
      <div className="Shop_Payment_Title_Container">
        <h3>
          <span className="OrangeTitle">PAY</span>MENT
        </h3>
      </div>
      <div className="Shop_Payment_Body">
        <div className="Shop_Payment_Left">
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {cardInfo[item.shop_credit_item_id - 1]?.credit_quantity}{" "}
                crédits - {cardInfo[item.shop_credit_item_id - 1]?.price} $
              </li>
            ))}
          </ul>
          <p>
            To Pay <br />
            <span className="BillsValues">{totalPrice} $</span>
          </p>
        </div>
        <div className="Shop_Payment_Right">
          <div className="Shop_Payment_Titles">
            <div className="Shop_Payment_Title">
              <h3>Payments </h3>
            </div>
            <div>
              <p className="Shop_Payment_Subtitle">Pay with credit card</p>
            </div>
          </div>
          <div className="wrap-info">
            <div className="Shop_Payment_Info">
              <div className="Shop_Payment_Cat1">
                <label>
                  Card Number
                  <input
                    type="tel"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </label>
              </div>
              <div className="Shop_Payment_Cat2">
                <label>
                  Expiration Date
                  <div className="expiration-inputs">
                    <select className="expiration-select">
                      <option value="" disabled selected>
                        Month
                      </option>
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                    <span>/</span>
                    <select className="expiration-select">
                      <option value="" disabled selected>
                        Year
                      </option>
                      <option value="23">2023</option>
                      <option value="24">2024</option>
                      <option value="25">2025</option>
                      <option value="26">2026</option>
                      <option value="27">2027</option>
                      <option value="28">2028</option>
                      <option value="29">2029</option>
                      <option value="30">2030</option>
                      <option value="31">2031</option>
                      <option value="32">2032</option>
                    </select>
                  </div>
                </label>
              </div>
              <div className="Shop_Payment_Cat3">
                <label>
                  CVC/CW
                  <input
                    type="tel"
                    placeholder="123"
                    value={cvc}
                    onChange={handleCvcChange}
                  />
                </label>
              </div>
              <div className="Shop_Payment_Cat4">
                <button
                  className="Payment_ButtonPay"
                  onClick={handlePayNowClick}
                >
                  Pay Now
                </button>
                <div className="Payment_Separator"></div>
                <p>or select other payment method</p>
                <img src={Payment} alt="Logo Payment" className="PayPal_Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentShop
