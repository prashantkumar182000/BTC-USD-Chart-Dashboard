// pages/api/testBinance.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: 'BTCUSDT',
        interval: '1m',
        limit: 1, // Fetch a small sample
      },
    });
    res.status(200).json({ message: 'Binance API works!', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to Binance API', error });
  }
}
