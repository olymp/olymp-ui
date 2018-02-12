import React from 'react';
import { InputNumber } from 'antd';
// import PropTypes from 'prop-types';

const durations = {
  minutes: {
    min: 5,
    max: 300,
    defaultValue: 60,
    formatter: v => `${v} Minuten`,
    parser: v => v.replace(' Minuten', ''),
    scalar: 60000
  }
};

const EditTimeRange = ({ mode = 'minutes', value, onChange, ...rest }) => {
  const props = durations[mode] || durations.minutes;

  return (
    <InputNumber
      {...props}
      value={parseInt(value, 10) / props.scalar}
      onChange={v => onChange(v * props.scalar)}
      style={{ width: '100%' }}
      {...rest}
    />
  );
};
/* EditTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}; */
export default EditTimeRange;
