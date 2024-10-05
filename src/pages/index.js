// pages/index.js

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Box } from '@mui/material';
import CandlestickChart from '../components/CandlestickChart';
import BollingerBands from '../components/BollingerBands';
import VolumeChart from '../components/VolumeChart';
import FibonacciRetracement from '../components/FibonacciRetracement';
import TradingInteraction from '../components/TradingInteraction';
import TimeIntervalSelector from '../components/TimeIntervalSelector'; 
import TopShare from '../components/TopShare'; // Import TopShare
import TopCrypto from '../components/TopCrypto'; // Import TopCrypto
import LiveStatus from '../components/LiveStatus'; // Import LiveStatus
import styles from '../styles/Home.module.css';

export default function Home() {
  const [interval, setInterval] = useState('1m'); // Default interval

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5' }}>
      {/* Top AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#0070f3' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BTC-USD Trading Dashboard
          </Typography>
          <LiveStatus /> {/* Add LiveStatus Component */}
        </Toolbar>
      </AppBar>

      {/* Main Dashboard Layout */}
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {/* Left Sidebar for Time Intervals */}
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', marginBottom: '130px' }}>
            <Typography variant="h6" gutterBottom>
              Time Intervals
            </Typography>
            <TimeIntervalSelector interval={interval} onIntervalChange={setInterval} />
          </Paper>
          <Box sx={{ marginBottom: '30px' }}>
            <TopShare />
          </Box>
          <TopCrypto /> {/* Add Top Performers Component */}
        </Grid>

        {/* Chart Area */}
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {/* Candlestick Chart */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: '10px', height: '500px', backgroundColor: '#fff', borderRadius: '10px' }}>
                <CandlestickChart interval={interval} />
              </Paper>
            </Grid>

            {/* Volume Chart */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: '10px', height: '500px', backgroundColor: '#fff', borderRadius: '10px' }}>
                <VolumeChart interval={interval} />
              </Paper>
            </Grid>

            {/* Bollinger Bands */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: '10px', height: '500px', backgroundColor: '#fff', borderRadius: '10px' }}>
                <BollingerBands interval={interval} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Section for Trading Interaction and Fibonacci */}
      <Grid container spacing={2} sx={{ padding: '20px', marginTop: '20px' }}>
        {/* Fibonacci Retracement */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              backgroundColor: '#fff', 
              borderRadius: '10px',
              minHeight: '200px' 
            }}
          >
            <FibonacciRetracement />
          </Paper>
        </Grid>

        {/* Trading Interaction */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              backgroundColor: '#fff', 
              borderRadius: '10px',
              minHeight: '200px' 
            }}
          >
            <TradingInteraction />
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <AppBar position="static" sx={{ backgroundColor: '#0070f3', marginTop: '20px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2" color="inherit">
            © 2024 BTC Trading Dashboard | Designed and Developed by <a href="https://prashantkumar60099.netlify.app/" style={{ color: '#fff', textDecoration: 'underline' }}>Prashant Kumar</a>
          </Typography>
          <Typography variant="body2" color="inherit">
            Privacy Policy | Terms of Service
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
