import React, { Component } from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import DefaultEdits from './default-edits';
import defaultPattern from './default-pattern';
import FormItem from './form-item';

@Form.create({
  mapPropsToFields: ({ value }) => {
    const obj = {};
    Object.keys(value).forEach(field => {
      obj[field] = Form.createFormField({
        value: value[field]
      });
    });

    return obj;
  },
  onValuesChange: ({ onChange }, changed, all) => onChange(changed, all)
})
export default class AntForm extends Component {
  resolve = (f, resolver) => {
    const {
      edit,
      editProps,
      decoratorProps: { initialValue, rules = {}, ...decoratorProps } = {},
      ...field
    } = f;

    const result = {
      Edit: DefaultEdits[edit] || DefaultEdits.input,
      decoratorProps: {
        initialValue: this.props[initialValue] || initialValue,
        rules: [
          { pattern: defaultPattern[rules.pattern] || rules.pattern },
          ...rules
        ],
        ...decoratorProps
      },
      editProps,
      field
    };

    return resolver(result) || result;
  };

  renderEdits = () => {
    const { schema, form, layout = 'vertical', resolve } = this.props;
    const fields = get(schema, 'fields', []);

    return Object.keys(fields).map(fieldName => {
      const { Edit, decoratorProps, editProps, field } = this.resolve(
        get(schema, ['fields', fieldName]),
        resolve || (() => {})
      );

      return (
        <FormItem key={fieldName} layout={layout} {...field}>
          {form.getFieldDecorator(fieldName, decoratorProps)(
            <Edit {...editProps} />
          )}
        </FormItem>
      );
    });
  };

  render() {
    const { layout = 'vertical', hideRequiredMark } = this.props;

    return (
      <Form layout={layout} hideRequiredMark={hideRequiredMark}>
        {this.renderEdits()}
      </Form>
    );
  }
}
