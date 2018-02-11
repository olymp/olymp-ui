import React from 'react';
import { get } from 'lodash';
import {
  isBefore,
  endOfDay,
  addMilliseconds,
  differenceInMilliseconds
} from 'date-fns';
import EditDateTime from './edit-datetime';
import EditTime from './edit-time';

export default ({ value, onChange, isDuration = true, ...props }) => {
  const start = get(value, 'start');
  const end = get(value, 'end');

  console.log(value);

  return (
    <div>
      <EditDateTime
        value={start}
        onChange={v => onChange({ end, start: v })}
        {...props}
      />
      {isDuration ? (
        <EditTime
          isDuration={isDuration}
          value={start && end ? differenceInMilliseconds(end, start) : 0}
          onChange={v =>
            onChange({
              start,
              end: addMilliseconds(new Date(start), v)
            })
          }
        />
      ) : (
        <EditDateTime
          value={start ? end : undefined}
          onChange={v => onChange({ start, end: endOfDay(v) })}
          {...props}
        />
      )}
    </div>
  );
};
