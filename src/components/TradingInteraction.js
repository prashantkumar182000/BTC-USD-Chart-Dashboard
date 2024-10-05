import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function TradingInteraction() {
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeMessage, setTradeMessage] = useState('');
  const [balance, setBalance] = useState(0); // Replace with logic to fetch balance

  const handleTrade = async () => {
    if (!tradeAmount) {
      setTradeMessage('Please enter a trade amount');
      return;
    }

    try {
      const response = await axios.post('/api/executeTrade', {
        amount: tradeAmount,
      });

      setBalance(response.data.updatedBalance);
      setTradeMessage(`Trade executed successfully: ${tradeAmount} BTC.`);
    } catch (error) {
      console.error('Error executing trade:', error);
      setTradeMessage('Error executing trade. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Trading Interaction
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Trade Amount (BTC)"
          variant="outlined"
          type="number"
          value={tradeAmount}
          onChange={(e) => setTradeAmount(e.target.value)}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleTrade}
            sx={{ width: '250px' }} // Adjust the width of the button here
          >
            Execute Trade
          </Button>
        </Box>
      </Box>
      {tradeMessage && (
        <Typography color="error" gutterBottom>
          {tradeMessage}
        </Typography>
      )}
      <Typography>Your current balance: {balance} BTC</Typography>
    </Box>
  );
}
