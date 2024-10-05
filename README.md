# BTC-USD Charting Dashboard 📊

## Overview

This project is a responsive charting module built using **Next.js**. It displays **candlestick data** for BTC-USD across multiple timeframes with both **historical** and **live market data**. The dashboard also includes a **volume bar chart**, **Bollinger Bands**, and a **Fibonacci retracement tool**. This interactive trading module is designed for users to analyze Bitcoin price movements and place mock limit orders. The project is perfect for trading enthusiasts, analysts, or developers looking for insights into the BTC-USD market.

## Features

- **Candlestick Chart:** Displays BTC-USD data across multiple timeframes such as 1 minute, 5 minutes, and 1 hour.
- **Volume Bar Chart:** Visualizes the trading volume alongside the candlestick data.
- **Bollinger Bands:** Provides an additional indicator for analyzing price volatility and potential market trends.
- **Fibonacci Retracement Tool:** Allows users to manually draw Fibonacci levels on the chart for trend analysis.
- **Live Market Data:** Fetches live data using the Binance API for up-to-date analysis.
- **Responsive Design:** Optimized for both mobile and desktop devices.
- **Interactive Trading (Mocked):** Users can place mock limit orders on the chart (no actual API interaction).
  
## Tech Stack

- **Next.js:** Server-side rendered React framework for building optimized and fast web applications.
- **MUI (Material-UI):** For designing an intuitive and responsive UI.
- **Charting Library:** Utilized the TradingView open-source library for professional charting.
- **Binance API:** Used to fetch live and historical BTC-USD market data.
- **Axios:** For seamless API data fetching.

### Video Demonstration
A **screen recording** of the project running locally has been provided to give a walkthrough of the codebase, functionality, and the chart's real-time interactions.

https://github.com/user-attachments/assets/f3c0ae20-fa14-4822-841f-fbb9962bd6d2


## Project Setup

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** or **yarn**

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/btc-usd-chart-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd btc-usd-chart-dashboard
   ```

3. Install the required dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file in the root directory with the following contents:
   ```bash
   NEXT_PUBLIC_BINANCE_API=https://api.binance.com
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### API Usage

- **Binance API:** Used to fetch live and historical data for the BTC-USD market.
  - Example Endpoint: `/api/getMarketData`
  - Data Format: OHLCV (Open, High, Low, Close, Volume)

### Key Components

#### Candlestick Chart with Bollinger Bands
- Visualizes real-time and historical price movements.
- Bollinger Bands are dynamically updated based on incoming data.
  
#### Volume Bar Chart
- Provides a clear view of trading activity, aiding in technical analysis.

#### Fibonacci Retracement Tool
- Users can interactively draw Fibonacci levels for trend analysis.

#### Mock Trading Interface
- Users can place mock buy/sell orders, providing an intuitive interface to test strategies.

### Responsive Design
- Designed to work seamlessly across all screen sizes, from mobile devices to large desktop monitors.

## Challenges

- Implementing real-time updates efficiently.
- Ensuring smooth interactions for Fibonacci retracement tool and mock trading.
- Handling large datasets for historical BTC-USD data while maintaining optimal performance.

## Future Enhancements

- Integration with live trading APIs for real-time order execution.
- Additional chart indicators (e.g., MACD, RSI).
- Enhanced UI/UX features for professional traders.

## Conclusion

This project was designed to fulfill the assignment's requirements while showcasing a scalable, modular approach to building financial dashboards. The combination of real-time data handling, responsive UI, and technical charting tools highlights the possibilities for expanding this platform into a more comprehensive trading solution.

## Author

**Prashant Kumar**  
[Portfolio](https://prashantkumar60099.netlify.app/)  
[LinkedIn](https://www.linkedin.com/in/prashant-kumar60099)

---

### How to Contribute
If you'd like to contribute to the project, feel free to submit a pull request. Suggestions, bug reports, and feature requests are also welcome!

---

### License
This project is open-source and available under the MIT License.
