import React, { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

import "./Apps.scss";

function App() {
  const [{ fullName, email }, setFields] = useState({
    email: "",
    fullName: "",
  });

  const [price, setPrice] = useState(0);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false)

  const paymentOption = [
    { type: "Regular", price: "2000" },
    { type: "VIP", price: "10000" },
    { type: "VVIP", price: "20000" },
  ];

  const config = {
    public_key: "",
    amount: price,
    currency: "NGN",
    customer: {
      email,
      name: fullName,
      phonenumber: "09088765433",
    },
    customization: {
      title: "Lifestyle Party",
      description: "Pay now, to register for turnah's concert",
    },
    tx_ref: Date.now(),
  };

  const handleInput = (e) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(price === 0) {
      setIsPaymentSelected(true)
      return;
    }
    setIsPaymentSelected(false)
    // handleFlutter({
    //   callback: (res) => {
    //     console.log(res);
    //     closePaymentModal();
    //   }
    // })
  };

  // const handleFlutter = useFlutterwave(config)

  return (
    <div className="concert">
      <div className="main">
        <div className="card">
          <div className="show">
            <h1>LifeStyle Party</h1>
            <p>Book your ticket with ease</p>
          </div>

          <div className="showcase">
            <form onSubmit={handleSubmit}>
              <div className="group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full Name"
                  required="true"
                  onChange={handleInput}
                />
              </div>

              <div className="group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  name="email"
                  placeholder="Enter email"
                  required="true"
                  onChange={handleInput}
                />
              </div>

              <div className="group">
                <label for="type">Payment Type </label>
                <div className="payment-type">
                  {paymentOption.map((item, k) => (
                    <button
                      type="button"
                      className={price === item.price && "active"}
                      onClick={() => {
                        setPrice(item.price)
                        setIsPaymentSelected(false)
                      }}
                      key={k}
                    >
                      {item.type}
                    </button>
                  ))}
                </div>
                {isPaymentSelected && <p className="error">Please select a payment type</p>}
              </div>
              <button type="submit">
                <p>Click here to book</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
