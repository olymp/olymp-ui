import React from 'react';
import { toClass } from 'recompose';
import { Input } from 'antd';
import FormItem from './form-item';

export default {
  form: toClass(
    ({
      value,
      onChange,
      'data-__field': dataField,
      'data-__meta': dataMeta,
      ...p
    }) => (
      <FormItem {...p}>
        <Input.TextArea
          value={value}
          autosize
          onChange={onChange}
          type="text"
          data-__field={dataField}
          data-__meta={dataMeta}
        />
      </FormItem>
    )
  )
};
