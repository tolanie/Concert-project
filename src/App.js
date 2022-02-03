import React, { useState } from 'react'
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3"

import './Apps.scss'

function App() {
  const [{ firstName, lastName, email }, setFields] = useState({
    email: "",
    firstName: "",
    lastName: ""
  })

  const config = {
    public_key: "",
    amount: 10,
    currency: "NGN",
    customer: {
      email,
      name: `${firstName} ${lastName}`,
      phonenumber: "09088765433"
    },
    customization: {
      title: "Lifestyle Party",
      description: "Pay now, to register for turnah's concert"
    },
    tx_ref: Date.now()
  }

  const handleInput = (e) => {
    setFields(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFlutter({
      callback: (res) => {
        console.log(res);
        closePaymentModal();
      }
    })
  }

  const handleFlutter = useFlutterwave(config)

  return (
    
    <div className="concert">
      <div className= 'main'>
        <div className='card' >

        <div className='show'>
        <h1>LifeStyle Party</h1>
        <p>Book your ticket with ease</p>
        </div>
        
        <div className='showcase'>
          <form onSubmit={handleSubmit}>
            <div className='group'>
            <label for="firstName">First Name</label>
            <input type='text' value={firstName}  id='firstName' name="firstName" placeholder='Enter First Name' required="true" onChange={handleInput} />
            </div>

            <div className='group'>
            <label for="lastName">Last Name</label>
            <input type='text' value={lastName} id="lastName" name="lastName" placeholder='Enter Last Name' required="true" onChange={handleInput} />
            </div>

            <div className='group'> 
            <label for="email">Email</label>
            <input type='email' id="email" value={email} name="email" placeholder='Enter email' required="true" onChange={handleInput} />
            </div>
            <button type="submit"><p>Click here to book</p></button>
          </form>
        </div>
        </div>

      </div>
    </div>
  );
}

export default App;
