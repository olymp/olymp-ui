import React from 'react';
import { InputNumber } from 'antd';

const durations = {
  seconds: {
    min: 0,
    max: 300,
    step: 15,
    defaultValue: 60,
    formatter: v => (v || v === 0 ? `${v} Sekunden` : undefined),
    parser: v => v.replace(' Sekunden', ''),
    scalar: 1000
  },
  minutes: {
    min: 0,
    max: 300,
    step: 15,
    defaultValue: 60,
    formatter: v => (v || v === 0 ? `${v} Minuten` : undefined),
    parser: v => v.replace(' Minuten', ''),
    scalar: 60000
  },
  hours: {
    min: 0,
    max: 48,
    step: 1,
    defaultValue: 1,
    formatter: v => (v || v === 0 ? `${v} Stunden` : undefined),
    parser: v => v.replace(' Stunden', ''),
    scalar: 60000 * 60
  },
  days: {
    min: 0,
    max: 31,
    step: 1,
    defaultValue: 1,
    formatter: v => (v || v === 0 ? `${v} Tage` : undefined),
    parser: v => v.replace(' Tage', ''),
    scalar: 60000 * 60 * 24
  },
  weeks: {
    min: 0,
    max: 52,
    step: 1,
    defaultValue: 1,
    formatter: v => (v || v === 0 ? `${v} Wochen` : undefined),
    parser: v => v.replace(' Wochen', ''),
    scalar: 60000 * 60 * 24 * 7
  },
  months: {
    min: 0,
    max: 24,
    step: 1,
    defaultValue: 1,
    formatter: v => (v || v === 0 ? `${v} Monate` : undefined),
    parser: v => v.replace(' Monate', ''),
    scalar: 60000 * 60 * 24 * 31
  },
  years: {
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 1,
    formatter: v => (v || v === 0 ? `${v} Jahre` : undefined),
    parser: v => v.replace(' Jahre', ''),
    scalar: 60000 * 60 * 24 * 365
  }
};

const Edit = ({ value, mode = 'minutes', onChange, ...rest }) => {
  const props = durations[mode] || durations.minutes;

  return (
    <InputNumber
      {...props}
      value={
        value || value === 0
          ? parseInt(value, 10) / props.scalar || 0
          : undefined
      }
      onChange={v => onChange(v || v === 0 ? v * props.scalar : undefined)}
      style={{ width: '100%' }}
      {...rest}
    />
  );
};
Edit.displayName = 'EditDuration';
Edit.type = 'integer';
export default Edit;
