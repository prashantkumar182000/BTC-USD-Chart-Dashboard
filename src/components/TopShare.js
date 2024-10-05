// src/components/TopShare.js

import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

const TopShare = () => {
  // Sample data
  const performers = [
    { name: 'Tata Power', price: 150, change: 5.2 },
    { name: 'Asian Paints', price: 200, change: -3.1 },
    { name: 'HDFC Bank', price: 250, change: 10.0 },
    { name: 'Mid India', price: 300, change: -1.5 },
  ];

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Paper elevation={3} sx={{ padding: '10px', backgroundColor: '#fff', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom sx={{marginBottom: '20px'}}>
          Top Performers [Shares]
        </Typography>
        <Grid container spacing={2}>
          {performers.map((performer, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '5px',
                  backgroundColor: performer.change >= 0 ? '#e8f5e9' : '#e8f5e9',
                  display: 'flex',
                  justifyContent: 'space-between', // Space between content and buttons
                  alignItems: 'center', // Center align items vertically
                }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                    {performer.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#424242' }}>
                    Price: ${performer.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: performer.change >= 0 ? 'green' : 'red' }}>
                    Up: {performer.change}%
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#c8e6c9', color: '#000', marginRight: '5px' }} // Light green color
                  >
                    B
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#ffcdd2', color: '#000' }} // Light red color
                  >
                    S
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default TopShare;
