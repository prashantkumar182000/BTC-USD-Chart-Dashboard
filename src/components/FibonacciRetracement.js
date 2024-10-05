import { useEffect, useState } from 'react';
import { Box, TextField, Grid, Typography, Paper } from '@mui/material';

export default function FibonacciRetracement() {
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [levels, setLevels] = useState([]);

  const calculateLevels = (high, low) => {
    const diff = high - low;
    return [
      { level: 0, value: low },
      { level: 0.236, value: low + diff * 0.236 },
      { level: 0.382, value: low + diff * 0.382 },
      { level: 0.5, value: low + diff * 0.5 },
      { level: 0.618, value: low + diff * 0.618 },
      { level: 0.786, value: low + diff * 0.786 },
      { level: 1, value: high },
    ];
  };

  useEffect(() => {
    if (high && low) {
      setLevels(calculateLevels(parseFloat(high), parseFloat(low)));
    }
  }, [high, low]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Fibonacci Retracement
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <TextField
          label="High"
          variant="outlined"
          type="number"
          value={high}
          onChange={(e) => setHigh(e.target.value)}
          fullWidth
        />
        <TextField
          label="Low"
          variant="outlined"
          type="number"
          value={low}
          onChange={(e) => setLow(e.target.value)}
          fullWidth
        />
      </Box>
      <Paper elevation={1} sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <Grid container spacing={2}>
          {levels.map((level) => (
            <Grid item xs={12} key={level.level}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '10px', 
                  borderRadius: '5px',
                  backgroundColor: '#e0e0e0', // Light grey background for levels
                  '&:hover': {
                    backgroundColor: '#d0d0d0', // Slightly darker on hover
                  }
                }} 
              >
                <Typography variant="body1">
                  Level {level.level.toFixed(3)}:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {level.value.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
