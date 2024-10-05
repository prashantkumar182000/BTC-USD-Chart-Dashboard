import React, { useState } from 'react';
import CandlestickChart from './CandlestickChart';
import VolumeChart from './VolumeChart';
import BollingerBands from './BollingerBands';
import TimeIntervalSelector from './TimeIntervalSelector';
import styles from '../styles/Home.module.css';

export default function ChartContainer() {
  const [interval, setInterval] = useState('1h');
  const [activeChart, setActiveChart] = useState('candlestick');

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  return (
    <div className={styles.chartContainer}>
      <TimeIntervalSelector interval={interval} onIntervalChange={handleIntervalChange} />
      <div className={styles.chartToggle}>
        <button onClick={() => setActiveChart('candlestick')} className={activeChart === 'candlestick' ? styles.active : ''}>
          Candlestick
        </button>
        <button onClick={() => setActiveChart('volume')} className={activeChart === 'volume' ? styles.active : ''}>
          Volume
        </button>
        <button onClick={() => setActiveChart('bollinger')} className={activeChart === 'bollinger' ? styles.active : ''}>
          Bollinger Bands
        </button>
      </div>
      {activeChart === 'candlestick' && <CandlestickChart interval={interval} />}
      {activeChart === 'volume' && <VolumeChart interval={interval} />}
      {activeChart === 'bollinger' && <BollingerBands interval={interval} />}
    </div>
  );
}
