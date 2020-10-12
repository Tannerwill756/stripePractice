import React from 'react';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Ha0lyG88CLuvWX9W2anIwAQqXvk6nKSEjdKaeiyPfwcMgPdMACfIsvzTENmI6vLo286S4fK8TOib6MJ1ONx2ldU00F2FnrbOW');

function App() {
  return (
    <div className="App">
      <h3>Payment Stuff</h3>
      <Elements stripe={stripePromise}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Elements>
    </div>
  );
}

export default App;
