import { Button } from '@mui/material';

const TimeIntervalSelector = ({ interval, onIntervalChange }) => {
  const intervals = ['1m', '5m', '1h', '24h', '5d', '1M', '3M'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {intervals.map((int) => (
        <Button
          key={int}
          variant={interval === int ? 'contained' : 'outlined'}
          onClick={() => onIntervalChange(int)}
          sx={{ margin: '5px 0', textTransform: 'none' }}
        >
          {int}
        </Button>
      ))}
    </div>
  );
};

export default TimeIntervalSelector;
