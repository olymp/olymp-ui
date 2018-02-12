import React from 'react';
import { InputNumber } from 'antd';
// import PropTypes from 'prop-types';

const durations = {
  minutes: {
    min: 5,
    max: 300,
    step: 15,
    defaultValue: 60,
    formatter: v => (v || v === 0 ? `${v} Minuten` : undefined),
    parser: v => v.replace(' Minuten', ''),
    scalar: 60000
  }
};

const EditTimeRange = ({ value, mode = 'minutes', onChange, ...rest }) => {
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
/* EditTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}; */
export default EditTimeRange;
