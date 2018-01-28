import React from 'react';
import { toClass } from 'recompose';
import { get } from 'lodash';
import DetailEdit from './rel-editor';
import FormItem from './form-item';

export default {
  form: toClass(({ specialFields, ...props }) => (
    <FormItem {...props}>
      <DetailEdit
        {...props}
        typeName={get(specialFields, 'idField.type.name')}
      />
    </FormItem>
  ))
};
