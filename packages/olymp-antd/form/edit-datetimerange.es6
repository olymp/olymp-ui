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

const Edit = ({ value = [], onChange, mode, ...props }) => {
  const [start = startOfMinute(new Date()), end = start] = value;

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
          mode={mode}
          value={
            start && end
              ? [
                  differenceInMilliseconds(start, startOfDay(start)),
                  differenceInMilliseconds(end, startOfDay(end))
                ]
              : undefined
          }
          onChange={([s, e]) =>
            onChange([
              addMilliseconds(startOfDay(start), s),
              addMilliseconds(startOfDay(end), e)
            ])
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
