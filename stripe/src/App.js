import React, { useState }  from 'react';
import './App.css';
import{loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('tanner@gmail.com')

  const handleSubmit = async (event) =>{
    event.preventDefault();
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })


    if(!error){
      console.log(paymentMethod)
      const {id} = paymentMethod

      try{
        const res = await axios.post("http://98.242.245.160:8000/pay", {id, amount: 1099, quantity: 69, email: 'tannerwill756@gmail.com'})
        const clientSecret = res.data['client_secret']
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email
            }
          }
        })

        if(result.error){
          console.log(result.error.message)
        }else{
          if(result.paymentIntent.status === 'succeeded'){
            console.log(result.paymentIntent)
          }
        }
      }catch(error){
        console.log(error)
      }
    }
  }

  return <form onSubmit={handleSubmit} >
    <CardElement />
    <button type='submit' disabled={!stripe}>pay</button>
  </form>
}

const stripPromise = loadStripe("pk_test_51HbTxLIV3JLVItGFEFvVyPjR9WIuHmtin99dZxtDL2BnMcXgeB4GZKCDenDMMxlR9miCaEs5bewVOnRMDgsyIZ1f003SnAbSoV");

function App() {
  

  return (
    <div className="App" style={{maxWidth: '400px', margin: '0 auto'}}>
      <h3>Price: 10.99</h3>
      <Elements stripe={stripPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
