import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';

const Paymentlist: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setStatus('Stripe.js not loaded. Please try again.');
      return;
    }

    setIsProcessing(true);
    setStatus(''); // Clear previous status

    try {
      // Make sure you're sending to the correct endpoint for creating a PaymentIntent
      const response = await axios.post('http://localhost:4001/api/web', {
        bookingid: '67727c55d2761a88dd6f5e1d', // Make sure this is dynamic
        amount:4000,
        currency: 'usd',
      });

      // Extract the clientSecret from the response
      const { clientSecret } = response.data;

      // Confirm the payment using the clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: 'pavi' }, // Replace 'pavi' with the actual user's name
        },
      });

      if (result.error) {
        handleStripeError(result.error); // Handle error if any
      } else if (result.paymentIntent?.status === 'succeeded') {
        setStatus('Payment successful!');
      } else {
        setStatus('Payment failed: Unknown error occurred.');
      }
    } catch (error) {
      console.error('Payment failed', error);
      setStatus('Payment failed: Unexpected error.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripeError = (error: StripeError) => {
    // Switch case to handle different error types
    switch (error.type) {
      case 'card_error':
        setStatus(`Card error: ${error.message}`);
        break;
      case 'validation_error':
        setStatus(`Validation error: ${error.message}`);
        break;
      case 'api_error':
        setStatus(`API error: ${error.message}`);
        break;
      default:
        setStatus(`Error: ${error.message}`);
        break;
    }

    // Log error details for troubleshooting
    console.error('Error details:', {
      type: error.type,
      code: error.code,
      message: error.message,
      payment_intent: error.payment_intent,
    });
  };

  return (
    <Box
      sx={{
        height: '506px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        justifyContent: 'start',
        position: 'relative',
        top: '120px',
      }}
    >
      <Container>
        <Box sx={{ margin: 5, padding: 5, bgcolor: 'white' }} boxShadow={9}>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ margin: 5 }}
              disabled={!stripe || isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${(4000 / 100).toFixed(2)}`}
            </Button>
            {status && <Typography color="error">{status}</Typography>}
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Paymentlist;
