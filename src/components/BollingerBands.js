import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const calculateBollingerBands = (data, windowSize = 20, numStdDev = 2) => {
  const upper = [];
  const middle = [];
  const lower = [];

  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) continue;

    const slice = data.slice(i - windowSize + 1, i + 1);
    const prices = slice.map(point => point.close);
    const avg = prices.reduce((a, b) => a + b) / windowSize;
    const stdDev = Math.sqrt(prices.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / windowSize);

    upper.push({ time: slice[windowSize - 1].time, value: avg + numStdDev * stdDev });
    middle.push({ time: slice[windowSize - 1].time, value: avg });
    lower.push({ time: slice[windowSize - 1].time, value: avg - numStdDev * stdDev });
  }

  return { upper, middle, lower };
};

export default function BollingerBands({ interval }) {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const upperBandSeriesRef = useRef(null);
  const middleBandSeriesRef = useRef(null);
  const lowerBandSeriesRef = useRef(null);

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { backgroundColor: '#ffffff', textColor: '#333' },
      grid: {
        vertLines: { color: '#e1e1e1' },
        horzLines: { color: '#e1e1e1' },
      },
      crosshair: { mode: 0 },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickInterval: getTickInterval(interval),
      },
    });

    upperBandSeriesRef.current = chartRef.current.addLineSeries({ color: 'rgba(255, 0, 0, 0.5)' });
    middleBandSeriesRef.current = chartRef.current.addLineSeries({ color: 'rgba(0, 255, 0, 0.5)' });
    lowerBandSeriesRef.current = chartRef.current.addLineSeries({ color: 'rgba(0, 0, 255, 0.5)' });

    fetchData(interval);

    const handleResize = () => {
      chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) fetchData(interval);
  }, [interval]);

  const fetchData = async (selectedInterval) => {
    try {
      const response = await axios.get('/api/getMarketData', { params: { interval: selectedInterval } });
      const prices = response.data.map(item => ({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
      const { upper, middle, lower } = calculateBollingerBands(prices);
      upperBandSeriesRef.current.setData(upper);
      middleBandSeriesRef.current.setData(middle);
      lowerBandSeriesRef.current.setData(lower);
    } catch (error) {
      console.error('Error fetching Bollinger Bands data:', error);
      alert('Failed to fetch Bollinger Bands data. Please try again later.');
    }
  };

  const getTickInterval = (interval) => {
    switch (interval) {
      case '1m': return '1m';
      case '5m': return '5m';
      case '1h': return '1h';
      case '24h': return '1d';
      case '5d': return '1d';
      case '1M': return '1w';
      case '3M': return '1M';
      default: return '1d';
    }
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Bollinger Bands</h2>
      <div ref={chartContainerRef} className={styles.chart} />
    </div>
  );
}
