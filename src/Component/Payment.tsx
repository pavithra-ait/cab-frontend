import React, { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert, Box, Typography, Paper } from "@mui/material";
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

interface PaymentStatus {
    success: boolean;
    message: string;
}

const Payment: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async () => {
        setLoading(true);
        setPaymentStatus(null);

        try {
            // Step 1: Call your backend to create a PaymentIntent
            const response = await fetch('http://localhost:4242/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 2000,  
                    currency: 'usd',
                    pickupLocation: "gp",
                    dropoffLocation: "gnmiils",
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { clientSecret } = await response.json();

            // Step 2: Create a payment method using Stripe Elements
            const cardElement = elements?.getElement(CardNumberElement);

            if (!cardElement) {
                throw new Error("Card element is missing");
            }

            const { error: paymentMethodError, paymentMethod } = await stripe!.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }
            const { error, paymentIntent } = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod!.id,
            });

            if (error) {
                setPaymentStatus({
                    success: false,
                    message: `Payment failed: ${error.message}`,
                });
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                setPaymentStatus({
                    success: true,
                    message: 'Payment successful!',
                });
            }

            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error initiating payment:", error);
            setPaymentStatus({
                success: false,
                message: `Payment initiation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={2}
            style={{ height: "100vh", backgroundColor: "#f4f4f4" }}
        >
            <Typography variant="h4" gutterBottom>
                Complete Your Payment
            </Typography>

            {/* Paper container for a clean UI */}
            <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 400, borderRadius: '10px', backgroundColor: '#fff' }}>
                <Typography variant="h6" gutterBottom align="center">
                    Enter Card Details
                </Typography>

                {/* Stripe Elements Card Number Field */}
                <div style={{ marginBottom: "10px" }}>
                    <CardNumberElement />
                </div>

                {/* Stripe Elements Expiry Date Field */}
                <div style={{ marginBottom: "10px" }}>
                    <CardExpiryElement />
                </div>

                {/* Stripe Elements CVC Field */}
                <div style={{ marginBottom: "10px" }}>
                    <CardCvcElement />
                </div>

                {/* Payment Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayment}
                    disabled={loading || !stripe || !elements}
                    fullWidth
                    style={{ marginTop: '20px', padding: '12px' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : `Pay ${2000}`}
                </Button>
            </Paper>

            {/* Snackbar to show success or error messages */}
            {paymentStatus && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={paymentStatus.success ? "success" : "error"}
                        sx={{ width: "100%" }}
                    >
                        {paymentStatus.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default Payment;
