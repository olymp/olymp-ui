import React from 'react';
import { get } from 'lodash';
import {
  isBefore,
  endOfDay,
  addMilliseconds,
  differenceInMilliseconds
} from 'date-fns';
import EditDateTime from './edit-datetime';
import EditTimeRange from './edit-timerange';

const Edit = ({ value, onChange, mode, ...props }) => {
  const start = get(value, 'start', new Date());
  const end =
    get(value, 'end') && isBefore(start, get(value, 'end'))
      ? get(value, 'end')
      : start;

  return (
    <div>
      <EditDateTime
        value={start}
        onChange={v => onChange({ start: v, end })}
        {...props}
      />
      {mode ? (
        <EditTimeRange
          mode={mode}
          value={
            start && end ? differenceInMilliseconds(end, start) : undefined
          }
          onChange={v =>
            onChange({
              start,
              end: addMilliseconds(new Date(start), v)
            })
          }
        />
      ) : (
        <EditDateTime
          value={end}
          onChange={v => onChange({ start, end: endOfDay(v) })}
          {...props}
        />
      )}
    </div>
  );
};
Edit.displayName = 'EditDatetimerange';
Edit.type = 'object';
export default Edit;
