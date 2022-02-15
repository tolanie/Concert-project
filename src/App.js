import React, { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

import "./Apps.scss";
import SuccessImg from "./img/success.png";
import FailImg from "./img/fail.png";

function App() {
  const [{ fullName, email }, setFields] = useState({
    email: "",
    fullName: "",
  });

  const [price, setPrice] = useState(0);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 2000,
    currency: "NGN",
    status: "successful",
    name: "Hello World",
  });

  const paymentOption = [
    { type: "Regular", price: 10 },
    { type: "VIP", price: 5000 },
  ];

  const handleInput = (e) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price === 0) {
      setIsPaymentSelected(true);
      return;
    }
    setIsPaymentSelected(false);
    handleFlutter({
      callback: (res) => {
        console.log(res);
        closePaymentModal();
        setPaymentDetails(res);
        setShowStatus(true);
      },
    });
  };

  const handleClose = () => {
    if (showStatus) {
      setFields({
        email: "",
        fullName: "",
      });
      setPrice(0)
    }
    setShowStatus(false);
  };

  const config = {
    public_key: "FLWPUBK-6c22bb36e48a919db211777df257a762-X", //"FLWPUBK_TEST-94cc9257f32ea519c9f2012d9c7290c7-X",
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
  const handleFlutter = useFlutterwave(config);

  const PaymentStatus = ({ details }) => (
    <div className="paymentCard">
      {details?.status === "successful" ? (
        <>
          <img src={SuccessImg} alt="success" />
          <h1>Payment Successful</h1>
          <p>
            You have now registered for Turnah's concert. Use the payment
            receipt sent to your email as your enterance permit.
          </p>
        </>
      ) : (
        <>
          <img src={FailImg} alt="fail" />
          <h1>Payment Not Successful</h1>
          <p>Sorry, your payment wasn't accepted, please try again.</p>
        </>
      )}
      <button onClick={handleClose}>Close</button>
    </div>
  );

  return (
    <>
      {showStatus && <PaymentStatus details={paymentDetails} />}
      <div
        className={`concert ${showStatus ? "site-dark" : undefined}`}
        onClick={handleClose}
      >
        <div className="main">
          <div className="card">
            <div className="show">
              <h1>LifeStyle Party</h1>
              <p>Book your ticket with ease</p>
            </div>

            <div className="showcase">
              <form onSubmit={handleSubmit}>
                <div className="group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    id="fullName"
                    name="fullName"
                    placeholder="Enter full Name"
                    required={true}
                    onChange={handleInput}
                  />
                </div>

                <div className="group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    placeholder="Enter email"
                    required={true}
                    onChange={handleInput}
                  />
                </div>

                <div className="group">
                  <label htmlFor="type">Payment Type </label>
                  <div className="payment-type">
                    {paymentOption.map((item, k) => (
                      <button
                        type="button"
                        className={price === item.price ? "active" : undefined}
                        onClick={() => {
                          setPrice(item.price);
                          setIsPaymentSelected(false);
                        }}
                        key={k}
                      >
                        {item.type}
                      </button>
                    ))}
                  </div>
                  {isPaymentSelected && (
                    <p className="error">Please select a payment type</p>
                  )}
                </div>
                <button type="submit">
                  <p>Click here to book</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
