const express = require('express');
const axios = require('axios'); // Axios to fetch market data
const app = express();
const PORT = process.env.PORT || 5000;

// Endpoint to fetch market data
app.get('/api/getMarketData', async (req, res) => {
  const { interval } = req.query; // Get the interval from the request query
  try {
    let data;

    // Switch statement to handle different intervals
    switch (interval) {
      case '1m':
      case '5m':
      case '1h':
      case '24h':
      case '5d':
      case '1M':
      case '3M':
        data = await fetchMarketData(interval); // Call the function to fetch market data
        break;
      default:
        return res.status(400).json({ error: 'Invalid interval' });
    }

    // Send the fetched data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to fetch market data from Binance API
const fetchMarketData = async (interval) => {
  try {
    const BASE_URL = 'https://api.binance.com/api/v3/klines';
    const symbol = 'BTCUSDT'; // The trading pair

    const response = await axios.get(BASE_URL, {
      params: {
        symbol,
        interval, // Use the interval provided by the user
        limit: 500, // Number of data points (you can adjust this limit)
      },
    });

    // Parse the response and format the market data
    const marketData = response.data.map(item => ({
      time: item[0] / 1000, // Convert timestamp to seconds
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5]),
    }));

    return marketData;
  } catch (error) {
    console.error('Error fetching data from Binance API:', error);
    throw new Error('Failed to fetch market data');
  }
};

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
