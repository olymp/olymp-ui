import React from 'react';
import moment from 'moment';
import { Input, InputNumber, Switch, DatePicker } from 'antd';
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
import select from '../edits/select';
import currency from '../edits/currency';
import form from './autoform';

const text = p => <Input.TextArea style={{ width: '100%' }} {...p} />;
text.type = 'string';

const number = p => <InputNumber style={{ width: '100%' }} {...p} />;
number.type = 'number';

const bool = ({ value, ...p }) => <Switch checked={!!value} {...p} />;
bool.type = 'boolean';

const week = ({ value, onChange, ...p }) => (
  <DatePicker.WeekPicker
    value={value ? moment(value).startOf('week') : undefined}
    format="ww. / YYYY"
    onChange={(v, props) =>
      v ? onChange(v.format(), props) : onChange(undefined, props)
    }
    style={{ width: '100%' }}
    {...p}
  />
);
week.type = 'date';

const month = ({ value, onChange, ...p }) => (
  <DatePicker.MonthPicker
    value={value ? moment(value).startOf('month') : undefined}
    format="MM / YYYY"
    onChange={(v, props) =>
      v ? onChange(v.format(), props) : onChange(undefined, props)
    }
    style={{ width: '100%' }}
    {...p}
  />
);
month.type = 'date';

export default {
  test: e => ({ id, ...p }) => (
    <div style={{ color: 'red' }}>
      Editor {e} fehlt für Wert {id}!
      <Input id={id} {...p} />
    </div>
  ),
  input, // phone, url
  email,
  text,
  number,
  currency,
  select,
  form,
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
  bool,
  week,
  month
};
