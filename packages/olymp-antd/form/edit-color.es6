import React from 'react';
import { toClass } from 'recompose';
import { Input } from 'antd';
import FormItem from './form-item';

export default {
  form: toClass(({ type, ...props }) => (
    <FormItem {...props}>
      <Input {...props} />
    </FormItem>
  ))
};
