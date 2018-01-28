import React, { Component } from 'react';
import { Form } from 'antd';
import { get, isEqual } from 'lodash';
import DefaultEdits from './default-edits';

@Form.create()
export default class AntForm extends Component {
  shouldComponentUpdate({
    form: {
      getFieldValue,
      getFieldsValue,
      isFieldTouched,
      resetFields,
      setFields
    },
    collection,
    item,
    onChange
  }) {
    // item has changed
    if (!isEqual(item, this.props.item)) {
      const values = {};
      Object.keys(collection.fields).forEach(fieldName => {
        values[fieldName] = { value: get(item, ['raw', fieldName]) };
      });
      setFields(values);

      return false;
    }

    // form/values has changed
    if (!!onChange && !isEqual(item, this.props.item)) {
      const values = {};
      Object.keys(collection.fields).forEach(fieldName => {
        values[fieldName] = item.raw[fieldName];
      });
      onChange(values);

      return false;
    }

    return true;
  }

  render() {
    const { collection, form } = this.props;

    const edits = Object.keys(collection.fields).map(fieldName => {
      const field = get(collection, ['fields', fieldName]);
      const Edit = DefaultEdits[field.edit] || DefaultEdits.input;

      return <Edit key={fieldName} name={fieldName} form={form} {...field} />;
    });

    return edits;
  }
}
