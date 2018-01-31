import React from 'react';
import { Input, Switch, TimePicker, DatePicker } from 'antd';
import slate from './edit-slate';
import color from './edit-color';
import geocode from './edit-geocode';
import place from './edit-place';
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
  input: Input,
  bool: ({ value, ...p }) => <Switch checked={!!value} {...p} />,
  slate,
  geocode,
  place,
  color,
  date: DatePicker,
  datetime: DatePicker,
  time: TimePicker
  // image: p => <EditImage maxHeight={100} maxWidth={250} {...p} />

  /* color,
  date,
  enum: enu,
  geocode,
  image, */
  /* list,
  openings,
  relList,
  rel,
  slug,
  strings,
  tags,
  textarea, */
};
