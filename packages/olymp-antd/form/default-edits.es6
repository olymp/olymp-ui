import React from 'react';
import moment from 'moment';
import { Input, Switch, DatePicker } from 'antd';
// import slate from '../edits/slate';
import email from '../edits/email';
import color from '../edits/color';
import themecolor from '../edits/themecolor';
import geocode from '../edits/geocode';
import date from '../edits/date';
import daterange from '../edits/daterange';
import time from '../edits/time';
import timerange from '../edits/timerange';
import datetime from '../edits/datetime';
import datetimerange from '../edits/datetimerange';
import duration from '../edits/duration';
import input from '../edits/mask-input';
/* import strings from '../edits/strings';
import tags from '../edits/tags';
import openings from '../edits/openings';
import list from '../edits/list';
import enu from '../edits/enum';
import date from '../edits/date';
import rel from '../edits/rel';
import relList from '../edits/rel-list';
import image from '../edits/image';
import color from '../edits/color';
import textarea from '../edits/textarea';
import geocode from '../edits/geocode';
import slug from '../edits/slug'; */

export default {
  test: e => ({ id, ...p }) => (
    <div style={{ color: 'red' }}>
      {id} vom Typ {e} fehlt!
      <Input id={id} {...p} />
    </div>
  ),
  input, // phone, url
  email,
  text: Input.TextArea,
  // slate,
  geocode,
  color,
  themecolor,
  date,
  daterange,
  time,
  timerange,
  datetime,
  datetimerange,
  duration,
  bool: ({ value, ...p }) => <Switch checked={!!value} {...p} />,
  week: ({ value, onChange, ...p }) => (
    <DatePicker.WeekPicker
      value={value ? moment(value).startOf('week') : undefined}
      format="ww. / YYYY"
      onChange={(v, props) =>
        v ? onChange(v.format(), props) : onChange(undefined, props)
      }
      style={{ width: '100%' }}
      {...p}
    />
  ),
  month: ({ value, onChange, ...p }) => (
    <DatePicker.MonthPicker
      value={value ? moment(value).startOf('month') : undefined}
      format="MM / YYYY"
      onChange={(v, props) =>
        v ? onChange(v.format(), props) : onChange(undefined, props)
      }
      style={{ width: '100%' }}
      {...p}
    />
  )
  // image: p => <EditImage maxHeight={100} maxWidth={250} {...p} />

  /* 
  enum: enu,
  image,
  list,
  openings,
  relList,
  rel,
  slug,
  strings,
  tags,
  textarea, */
};
