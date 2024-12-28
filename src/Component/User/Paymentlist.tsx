import { Box, Button, Container, Typography, } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { log } from 'node:console';


const Paymentlist: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount] = useState(1200)
    const [status, setstatus] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        try {

            const response = await axios.post('http://localhost:4001/api/payment/create-payment-intent', {
                bookingid: '676fa1a6bbed25778037b3be',
                amount,
                currency: 'inr'
            });
            const { clientSecret } = response.data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement('card')!,
                    billing_details: { name: 'pavi' },
                },
            });

            if (result.error) {
                setstatus(`${result.error.message}`)
                console.log(result.error.message);
                
            } else if (result.paymentIntent?.status === 'succeeded') {
                setstatus("success")
            }
        } catch (error) {
            console.error('Payment failed', error);
        }
    };


    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }} >
            <Container>
                <Box sx={{margin:5,padding:5,bgcolor:'white'}} boxShadow={9}>
                    <form onSubmit={handleSubmit}>
                        <CardElement  />
                        <Button variant="contained" color="primary" type="submit" sx={{margin:5}} disabled={!stripe} >
                            Pay ${Number(amount) / 100}
                        </Button>
                        {status && <Typography color="error">{status}</Typography>}
                    </form>
                </Box>
            </Container>

        </Box>
    );
}

export default Paymentlist;
