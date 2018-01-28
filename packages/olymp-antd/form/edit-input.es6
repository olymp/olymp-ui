import React from 'react';
import { Input } from 'antd';
import { get } from 'lodash';
import FormItem from './form-item';

export default ({
  name,
  form: { getFieldDecorator },
  'data-__field': dataField,
  'data-__meta': dataMeta,
  editProps: { options, ...editProps },
  ...p
}) => {
  const init = get(options, 'initialValue');

  return (
    <FormItem {...p}>
      {getFieldDecorator(name, {
        initialValue: p[init] || init,
        ...options
      })(
        <Input
          type="text"
          data-__field={dataField}
          data-__meta={dataMeta}
          {...editProps}
        />
      )}
    </FormItem>
  );
};
