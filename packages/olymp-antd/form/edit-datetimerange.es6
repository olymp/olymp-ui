import React from 'react';
import {
  startOfDay,
  endOfDay,
  addMilliseconds,
  differenceInMilliseconds,
  startOfMinute
} from 'date-fns';
import EditDate from './edit-date';
import EditDateTime from './edit-datetime';
import EditTimeRange from './edit-timerange';
import EditDuration from './edit-duration';

const Edit = ({ value = [], onChange, mode, slots, ...props }) => {
  const [start, end] = value;

  if (mode === 'slots') {
    return (
      <div>
        <EditDate
          value={start}
          onChange={v => {
            const s = differenceInMilliseconds(start, startOfDay(start));
            const e = differenceInMilliseconds(end, startOfDay(end));

            return onChange([
              addMilliseconds(startOfDay(v), s),
              addMilliseconds(startOfDay(v), e)
            ]);
          }}
          style={{ paddingBottom: '0.25rem' }}
          {...props}
        />
        <EditTimeRange
          slots={slots}
          value={[
            differenceInMilliseconds(start, startOfDay(start)),
            differenceInMilliseconds(end, startOfDay(end))
          ]}
          onChange={v =>
            onChange(
              Array.isArray(v)
                ? [
                    addMilliseconds(startOfDay(start), v[0]),
                    addMilliseconds(startOfDay(end), v[1])
                  ]
                : v
            )
          }
        />
      </div>
    );
  }

  return (
    <div>
      <EditDateTime
        value={start}
        onChange={v => onChange([v, end])}
        style={{ paddingBottom: '0.25rem' }}
        {...props}
      />
      {mode ? (
        <EditDuration
          mode={mode}
          value={
            start && end ? differenceInMilliseconds(end, start) : undefined
          }
          onChange={v => onChange([start, addMilliseconds(new Date(start), v)])}
        />
      ) : (
        <EditDateTime
          value={end}
          onChange={v => onChange([start, endOfDay(v)])}
          {...props}
        />
      )}
    </div>
  );
};
Edit.displayName = 'EditDatetimerange';
Edit.type = 'array';
export default Edit;
