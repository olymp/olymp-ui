import React from 'react';
import {
  isBefore,
  endOfDay,
  addMilliseconds,
  differenceInMilliseconds
} from 'date-fns';
import EditDateTime from './edit-datetime';
import EditTimeRange from './edit-timerange';

const Edit = ({ value, onChange, mode, ...props }) => {
  const [start = new Date(), end] = value;
  const endFn = end && isBefore(start, end) ? end : start;

  return (
    <div>
      <EditDateTime
        value={start}
        onChange={v => onChange([v, endFn])}
        {...props}
      />
      {mode ? (
        <EditTimeRange
          mode={mode}
          value={
            start && endFn ? differenceInMilliseconds(endFn, start) : undefined
          }
          onChange={v => onChange([start, addMilliseconds(new Date(start), v)])}
        />
      ) : (
        <EditDateTime
          value={endFn}
          onChange={v => onChange([start, endOfDay(v)])}
          {...props}
        />
      )}
    </div>
  );
};
Edit.displayName = 'EditDatetimerange';
Edit.type = 'object';
export default Edit;
