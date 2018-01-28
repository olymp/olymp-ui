import React from 'react';
import { toClass } from 'recompose';
import GeocodeEditor from './edits/geocode';
import FormItem from './form-item';

export default {
  form: toClass(({ type, ...props }) => (
    <FormItem {...props}>
      <GeocodeEditor {...props} />
    </FormItem>
  ))
};
