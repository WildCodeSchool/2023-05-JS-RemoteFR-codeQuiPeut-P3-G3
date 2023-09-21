import { useEffect, useState } from "react"
import Payment from "../../assets/images/logoPaypal.png"
import "./PaymentShop.scss"
import axios from "axios"

const PaymentShop = (props) => {
  // ------------------ Fonnction call lors activ paynow
  const removeItemsFromCart = () => {
    // Envoie une requête DELETE au serveur pour supprimer les éléments du panier
    if (cardNumber.trim() !== "" && cvc.trim() !== "") {
      axios
        .delete("http://localhost:4242/shopping_card_item/removeAll") // L'URL dépend de votre configuration de routage
        .then((response) => {
          if (response.status === 204) {
            // Les champs sont valides, vous pouvez effectuer le paiement ici
            // ...
            // Suppression réussie, réinitialisez les champs de saisie et effectuez d'autres actions si nécessaire
            setCardNumber("")
            setCartItems([])
            setCvc("")
            alert("✅  Commande validée ! ")
          } else {
            // La suppression a échoué, gérez l'erreur ici si nécessaire
          }
        })
        .catch((error) => {
          // Gérez les erreurs de requête ici si nécessaire
          console.error(error)
        })
    } else {
      // Affichez un message d'erreur et empêchez le paiement
      alert(" Merci remplir tout les champs ")
    }
  }

  // ------------------ Récupération info cards page shop
  const [cardInfo, setCardInfo] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/shop")
      .then((response) => {
        setCardInfo(response.data)
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des fichiers.",
          error
        )
      })
  }, [props.cartItems])

  // ------------------ Récupération items de la table shopping_card_item
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/shopping_card_item")
      .then((response) => {
        // Récup Data bdd de cart
        const items = response.data
        // MAJ CartItems
        setCartItems(items)
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des produits.",
          error
        )
      })
  }, [props.cartItems])

  // ------------------ Partie totalToPay Panier
  let totalPrice = 0
  cartItems.forEach((item) => {
    totalPrice += cardInfo[item.shop_credit_item_id - 1]?.price
  })

  // ------------------ Parametrage saisie Section saisie de Payment
  const [cardNumber, setCardNumber] = useState("")
  const [cvc, setCvc] = useState("")

  const handleCardNumberChange = (e) => {
    let input = e.target.value

    // Autorise uniquement chiffres
    input = input.replace(/\D/g, "")

    // Faire un espace tout les quatres chiffres
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ")

    if (input.length > 19) {
      input = input.slice(0, 16)
    }

    setCardNumber(input)
  }

  const handleCvcChange = (e) => {
    let input = e.target.value

    // Autorise uniquement chiffres
    input = input.replace(/\D/g, "")

    if (input.length > 3) {
      input = input.slice(0, 3)
    }

    setCvc(input)
  }

  const handleDeleteItemCartClick = (deleteId) => {
    const isSure = window.confirm("⚠️ Are you sure to delete this article?")
    if (isSure) {
      axios
        .delete(`http://localhost:4242/shop/${deleteId}`)
        .then((response) => {
          if (response.status === 204) {
            // useEffect(() => {
            axios
              .get("http://localhost:4242/shopping_card_item")
              .then((response) => {
                // Récup Data bdd de cart
                const items = response.data
                // MAJ CartItems
                setCartItems(items)
              })
              .catch((error) => {
                console.error(
                  "Une erreur est survenue lors de la récupération des produits.",
                  error
                )
              })
            // }, [])
            alert("✅  article deleted ")
          }
        })
        .catch((err) => console.warn(err))
    }
  }

  const handlePayNowClick = () => {
    removeItemsFromCart()
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
                <a
                  onClick={() => handleDeleteItemCartClick(item.id)}
                  className="deleteShopButton"
                >
                  {" "}
                  X{" "}
                </a>
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
                <a
                  href="https://www.paypal.com/fr/home"
                  className="shopLinkPaypal"
                >
                  <img
                    src={Payment}
                    alt="Logo Payment"
                    className="PayPal_Logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentShop
