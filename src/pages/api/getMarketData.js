import axios from 'axios';

export default async function handler(req, res) {
  const { interval } = req.query; // Get interval from query parameters
  const BASE_URL = 'https://api.binance.com/api/v3/klines';
  const symbol = 'BTCUSDT'; // The symbol for Bitcoin to US Dollar trading pair

  if (!interval) {
    return res.status(400).json({ error: 'Interval is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        symbol,
        interval, // Pass the interval from the query parameter to Binance API
        limit: 500, // Number of data points
      },
    });

    // Format the market data received from Binance API
    const marketData = response.data.map(item => ({
      time: item[0] / 1000, // Convert timestamp to seconds
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5]),
    }));

    // Send the formatted data as a JSON response
    res.status(200).json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Error fetching market data' });
  }
}
