import { useEffect, useState } from "react"
import Payment from "../../assets/images/logoPaypal.png"
import "./PaymentShop.scss"
import axios from "axios"

const PaymentShop = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartItemsTotal, setCartItemsTotal] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/shop/cart")
      .then((response) => {
        console.info(response.data)
        if (cartItems.length !== response.data.length) {
          setCartItems(response.data)
          let total = 0
          response.data.forEach(element => {
            total += element.price
          });
          setCartItemsTotal(total)
        }
      })
      .catch((error) => {
        console.warn("POUETPOUET")
        console.error("TA MERDE ! C'est de la merde", error)
      })
  })

  return (
    <div className="Shop_PaymentContainerGlobal">
      <div className="Shop_Payment_Title_Container">
        <h3>
          <span className="OrangeTitle">PAY</span>MENT
        </h3>
      </div>
      <div className="Shop_Payment_Body">
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
        <div className="Shop_Payment_Left">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.credit_quantity} credits - {item.price}$
              </li>
            ))}
          </ul>
          <p>
            To Pay <br />
            <span className="BillsValues">{cartItemsTotal}$</span>
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
                  <input type="text" placeholder="1234 5678 9012 3456" />
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
                  <input type="text" placeholder="123" />
                </label>
              </div>
              <div className="Shop_Payment_Cat4">
                <button className="Payment_ButtonPay">Pay Now</button>
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
