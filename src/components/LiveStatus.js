import { Box, Grid, Typography } from '@mui/material';

const dummyData = {
  NIFTY: { value: 19000, status: 'Up +0.5%' },
  BANKNIFTY: { value: 43000, status: 'Down -0.2%' },
  FINNIFTY: { value: 18500, status: 'Up +0.3%' },
};

const getColor = (status) => {
  if (status.startsWith('Up')) {
    return 'green'; // Green for upward trends
  } else if (status.startsWith('Down')) {
    return 'red'; // Red for downward trends
  }
  return 'black'; // Default color
};

export default function LiveStatus() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
        {Object.entries(dummyData).map(([index, { value, status }]) => (
          <Grid item key={index}>
            <Typography variant="body1" sx={{ color: 'white', textAlign: 'right' }}>
              {index}: {value} <br />
              <span style={{ 
                fontSize: '0.8em', 
                color: getColor(status) // Set color based on status
              }}>
                {status}
              </span>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
