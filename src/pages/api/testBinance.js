// pages/api/testBinance.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: req.query.interval || '1', // 1 day, 7 days, etc.
      },
    });
    res.status(200).json({ message: 'Binance API works!', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to Binance API', error });
  }
}
