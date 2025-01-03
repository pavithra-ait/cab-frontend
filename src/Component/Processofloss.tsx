

// Cancel.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Processofloss: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Payment Cancelled</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        The payment was not successful. Please try again later.
      </Typography>
    </Box>
  );
};

export default Processofloss;
