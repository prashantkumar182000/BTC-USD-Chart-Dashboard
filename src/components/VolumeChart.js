import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function VolumeChart({ interval }) {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const volumeSeriesRef = useRef(null);

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

    volumeSeriesRef.current = chartRef.current.addHistogramSeries({
      color: 'rgba(0, 150, 136, 0.6)',
      priceScaleId: '',
      scaleMargins: { top: 0.8, bottom: 0 },
    });

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
      const volumes = response.data.map(item => ({
        time: item.time,
        value: item.volume,
      }));
      volumeSeriesRef.current.setData(volumes);
    } catch (error) {
      console.error('Error fetching volume data:', error);
      alert('Failed to fetch volume data. Please try again later. Note: Binance is restricting access from your current deployment region due to legal or regulatory reasons');
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
      <h2 className={styles.chartTitle}>Volume Chart</h2>
      <div ref={chartContainerRef} className={styles.chart} />
    </div>
  );
}
