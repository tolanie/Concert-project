import React from 'react'

import './Apps.scss'

function App() {
  return (
    
    <div className="concert">
      <div className= 'main'>
        <div className='card'>

        <div className='show'>
        <h1>LifeStyle Party</h1>
        <p>Book your ticket with ease</p>
        </div>
        
        <div className='showcase'>
          <form>
            <div className='group'>
            <label>First Name</label>
            <input type='name' for='name' placeholder='Enter First Name'></input>
            </div>

            <div className='group'>
            <label>Last Name</label>
            <input type='name' for='name' placeholder='Enter Last Name'></input>
            </div>

            <div className='group'> 
            <label>Email</label>
            <input type='email' for='email' placeholder='Enter email'></input>
            </div>
          </form>
          <button>Click here to book</button>
        </div>
        </div>

      </div>
    </div>
  );
}

export default App;
