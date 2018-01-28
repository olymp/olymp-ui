import React, { Component } from 'react';
import { Form } from 'antd';
import { get, isEqual } from 'lodash';
import DefaultEdits from './default-edits';
import FormItem from './form-item';

@Form.create()
export default class AntForm extends Component {
  shouldComponentUpdate({ form: { setFields }, collection, item, onChange }) {
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
    const {
      collection,
      form,
      layout = 'vertical',
      onSubmit,
      hideRequiredMark
    } = this.props;

    const edits = Object.keys(collection.fields).map(fieldName => {
      const {
        edit,
        editProps: { initialValue, ...editProps } = {},
        ...field
      } = get(collection, ['fields', fieldName]);
      const Edit = DefaultEdits[edit] || DefaultEdits.input;

      return (
        <FormItem key={fieldName} layout={layout} {...field}>
          {form.getFieldDecorator(fieldName, {
            ...editProps,
            initialValue: this.props[initialValue] || initialValue
          })(<Edit {...editProps} />)}
        </FormItem>
      );
    });

    return (
      <Form
        layout={layout}
        onSubmit={onSubmit}
        hideRequiredMark={hideRequiredMark}
      >
        {edits}
      </Form>
    );
  }
}
