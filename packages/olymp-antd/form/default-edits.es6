import React from 'react';
import moment from 'moment';
import { Input, Switch, DatePicker } from 'antd';
// import slate from './edit-slate';
import color from './edit-color';
import geocode from './edit-geocode';
import date from './edit-date';
import time from './edit-time';
import input from './edit-mask-input';
/* import strings from './edit-strings';
import tags from './edit-tags';
import openings from './edit-openings';
import list from './edit-list';
import enu from './edit-enum';
import date from './edit-date';
import rel from './edit-rel';
import relList from './edit-rel-list';
import image from './edit-image';
import color from './edit-color';
import textarea from './edit-textarea';
import geocode from './edit-geocode';
import slug from './edit-slug'; */

export default {
  test: e => ({ id, ...p }) => (
    <div style={{ color: 'red' }}>
      {id} vom Typ {e} fehlt!
      <Input id={id} {...p} />
    </div>
  ),
  input, // phone, url, email
  text: Input.TextArea,
  // slate,
  geocode,
  color,
  date,
  time,
  bool: ({ value, ...p }) => <Switch checked={!!value} {...p} />,
  datetime: ({ value, onChange, ...p }) => (
    <DatePicker
      value={value ? moment(value) : undefined}
      showTime
      format="DD.MM.YYYY"
      onChange={(v, props) =>
        v ? onChange(v.format(), props) : onChange(undefined, props)
      }
      style={{ width: '100%' }}
      {...p}
    />
  ),
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
