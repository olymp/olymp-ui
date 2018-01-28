import React from 'react';
import { Switch } from 'antd';
import FormItem from './form-item';

export default ({ type, ...props }) => (
  <FormItem {...props}>
    <Switch {...props} checked={props.value} />
  </FormItem>
);
