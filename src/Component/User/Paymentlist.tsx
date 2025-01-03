import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Paymentlist: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      setStatus('Stripe.js not loaded. Please try again.');
      return;
    }

    setIsProcessing(true);
    setStatus(''); // Clear previous status messages

    // Mock payload for the API request
    const payload = {
      amount: 100.5,
      currency: 'usd',
      bookingid: '67727c55d2761a88dd6f5e1d',
    };

    try {

      const response = await axios.post('http://localhost:4001/api/web', payload, {

        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Backend response:', response.data);

      const { clientSecret } = response.data;

      // Ensure the card element is present
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setStatus('Card element is not available.');
        setIsProcessing(false);
        return;
      }

      // Confirm the payment using the clientSecret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'pavi',
          },
        },
      });

      if (error) {
        // Handle error
        console.error(error.message);
        setStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        console.log('Payment succeeded!');
        setStatus('Payment successful!');
      }
    } catch (error) {
      // Handle API or network errors
      console.error('Payment failed:', error);
      setStatus('Payment failed: Unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        gap: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ padding: 4, bgcolor: 'white' }} boxShadow={3}>
          <Typography variant="h5" marginBottom={2}>
            Complete Your Payment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <CardElement />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!stripe || isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${(100.5).toFixed(2)}`}
            </Button>
            {status && (
              <Typography color="error" marginTop={2}>
                {status}
              </Typography>
            )}
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Paymentlist;
