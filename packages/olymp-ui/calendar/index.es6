import React from 'react';
import { compose, withState } from 'recompose';
import { addMonths } from 'date-fns';
import Calendar from './calendar';

const enhance = compose(
  withState('date', 'setDate', ({ start }) => start || new Date())
);

export default enhance(({ months, date, ...props }) =>
  Array.from(Array(months || 1)).map((x, y) => (
    <Calendar
      key={y}
      arrows={months <= 1}
      date={addMonths(date, y)}
      {...props}
    />
  ))
);
