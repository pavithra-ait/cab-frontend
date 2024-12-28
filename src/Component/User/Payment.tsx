import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe('pk_test_51QarsqB2pSOXCd2YjNNIrfE03vZOmWl97GJRmRUSvKHBu4JIlFe3rJSAiBlSdDlWo9x5OIMzzIXFf8hUUMp1Reoj00EDkBkhrD');

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:4001/api/payment/create-payment-intent", {
        bookingid: "12345",
        amount: 5000,
        currency: "usd",
      });

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "pavithra",
            phone:'8838861146',
            
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent?.status === "succeeded") {
          setSuccess(true);
          console.log("Payment successful!");
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
      {success && <p>Payment succeeded!</p>}
    </form>
  );
};

const App: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <h1>Stripe Payment</h1>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
