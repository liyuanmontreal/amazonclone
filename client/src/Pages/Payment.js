import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"

import CheckoutForm from "./CheckoutForm";

//import "./payment.css";

// Make sure to call loadStripe outside of a component�s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_key");

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  /*
  //const [amountGet, setAmountGet] = useState(0);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery() 
  //setAmountGet(query.get('amount')) ;
  const amountGet = query.get('amount');   
  console.log( amountGet)*/
  const amount = JSON.parse(localStorage.getItem("amount"));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //if (amountGet){
    if (amount){
      fetch("http://localhost:4000/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ "amount":500.00 }),
        //body: JSON.stringify({ "amount":amountGet*100}),
        body: JSON.stringify({ "amount":amount*100}),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
  
      {/* {(amountGet) ?
        <label>Your amount is ${amountGet} </label>
        :<><label> Your amount is  0</label> <Link to="/">Continue Shopping</Link></>
      } */}
       {(amount) ?
        <label>Your amount is ${amount} </label>
        :<><label> Your amount is  0</label> <Link to="/">Continue Shopping</Link></>
      }
    
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}