// Success.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Processpay: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Payment Successful!</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Thank you for your purchase. Your subscription is now active.
      </Typography>
    </Box>
  );
};

export default Processpay;