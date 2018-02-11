import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { format, addMilliseconds, startOfDay } from 'date-fns';
import MaskedTextInput from './edit-mask-input';
import FormIcon from './form-icon';

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

const EditTime = ({ isDuration, value, onChange, ...rest }) => {
  const props = durations[isDuration] || durations.minutes;

  return isDuration ? (
    <InputNumber
      {...props}
      value={parseInt(value, 10) / props.scalar}
      onChange={v => onChange(v * props.scalar)}
      style={{ width: '100%' }}
      {...rest}
    />
  ) : (
    <MaskedTextInput
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', 'U', 'h', 'r']}
      placeholder="Zeit"
      suffix={<FormIcon type="clock-circle-o" />}
      value={
        value === undefined
          ? undefined
          : format(
              addMilliseconds(startOfDay(new Date()), parseInt(value, 10)),
              'HH:mm'
            )
      }
      onChange={e => {
        const time = e.target.value;
        let [hours = 0, minutes = 0] = time.split(' Uhr')[0].split(':');
        hours = !!hours && parseInt(hours.replace('_', '0'), 10);
        minutes = !!minutes && parseInt(minutes.replace('_', '0'), 10);

        onChange(
          !hours && !minutes ? undefined : hours * 3.6e6 + minutes * 60000
        );
      }}
      pipe={createAutoCorrectedDatePipe('HH:MM')}
      {...rest}
    />
  );
};
EditTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default EditTime;
