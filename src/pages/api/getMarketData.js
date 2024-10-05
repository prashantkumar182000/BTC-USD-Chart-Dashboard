import axios from 'axios';

export default async function handler(req, res) {
  const { interval } = req.query;
  const BASE_URL = 'https://api.binance.com/api/v3/klines';
  const symbol = 'BTCUSDT';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        symbol,
        interval, // Make sure this matches what Binance accepts
        limit: 500, // Number of data points
      },
    });

    const marketData = response.data.map(item => ({
      time: item[0] / 1000,
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5]),
    }));

    res.status(200).json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching market data' });
  }
}
