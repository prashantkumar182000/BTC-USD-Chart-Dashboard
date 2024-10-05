const express = require('express');
const axios = require('axios'); // or any library you use to fetch market data
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/getMarketData', async (req, res) => {
  const { interval } = req.query;
  try {
    let data;

    // Implement logic based on the interval requested
    switch (interval) {
      case '1m':
        data = await fetchMarketData('1 minute'); // Fetch data for the last 1 minute
        break;
      case '5m':
        data = await fetchMarketData('5 minutes'); // Fetch data for the last 5 minutes
        break;
      case '1h':
        data = await fetchMarketData('1 hour'); // Fetch data for the last 1 hour
        break;
      case '24h':
        data = await fetchMarketData('1 hour'); // Fetch hourly data for the last 24 hours
        break;
      case '5d':
        data = await fetchMarketData('1 day'); // Fetch daily data for the last 5 days
        break;
      case '1M':
        data = await fetchMarketData('1 week'); // Fetch weekly data for the last month
        break;
      case '3M':
        data = await fetchMarketData('1 month'); // Fetch monthly data for the last 3 months
        break;
      default:
        return res.status(400).send('Invalid interval');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Sample fetchMarketData function, replace with your actual data retrieval logic
const fetchMarketData = async (timeFrame) => {
  // Replace with actual data fetching logic from a database or an external API
  // Simulated response
  const simulatedData = [
    { time: '2024-01-01', open: 100, high: 110, low: 90, close: 105, volume: 2000 },
    // More data...
  ];
  return simulatedData;
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
