import React from 'react';
// import PropTypes from 'prop-types';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { format, addMilliseconds, startOfDay } from 'date-fns';
import MaskedTextInput from './edit-mask-input';
import FormIcon from './form-icon';

export const getMilliseconds = time => {
  let [hours = 0, minutes = 0] = time.split(' Uhr')[0].split(':');
  hours = !!hours && parseInt(hours.replace('_', '0'), 10);
  minutes = !!minutes && parseInt(minutes.replace('_', '0'), 10);

  return hours === false && minutes === false
    ? undefined
    : hours * 3.6e6 + minutes * 60000;
};

const EditTime = ({ value, onChange, ...rest }) => (
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
    onChange={e => onChange(getMilliseconds(e.target.value))}
    pipe={createAutoCorrectedDatePipe('HH:MM')}
    {...rest}
  />
);
/* EditTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}; */
export default EditTime;
