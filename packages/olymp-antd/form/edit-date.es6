import React from 'react';
import { toClass } from 'recompose';
import { Input } from 'antd';
import FormItem from './form-item';

export default {
  form: toClass(({ innerType, ...props }) => (
    <FormItem {...props}>
      <Input
        {...props}
        format={
          innerType.name === 'DateTime' ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY'
        }
        showTime={innerType.name === 'DateTime' ? { format: 'HH:mm' } : null}
      />
    </FormItem>
  ))
};
