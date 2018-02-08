import React, { Component } from 'react';
import { Form, Icon } from 'antd';
import { createComponent } from 'react-fela';
import { get } from 'lodash';
import DefaultEdits from './default-edits';
import defaultPattern from './default-pattern';
import FormItem from './form-item';

const StyledIcon = createComponent(
  ({ theme }) => ({
    color: theme.dark3
  }),
  p => <Icon {...p} />,
  p => Object.keys(p)
);

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
    const newEditProps = { ...editProps };
    let e = edit;

    switch (edit) {
      case 'phone':
        e = 'input';
        newEditProps.suffix = <StyledIcon type="phone" />;
        rules.pattern = 'phone';
        rules.message = 'Ungültige Nummer';
        rules.min = 4;
        rules.max = 20;
        break;

      case 'url':
        e = 'input';
        newEditProps.suffix = <StyledIcon type="link" />;
        rules.pattern = 'url';
        rules.message = 'Ungültige URL';
        rules.min = 4;
        break;

      case 'email':
        e = 'input';
        newEditProps.suffix = <StyledIcon type="mail" />;
        rules.pattern = 'email';
        rules.message = 'Ungültige E-Mail';
        rules.min = 4;
        break;

      default:
    }

    const result = {
      Edit: DefaultEdits[e] || DefaultEdits.test(e) || DefaultEdits.input,
      decoratorProps: {
        initialValue: this.props[initialValue] || initialValue,
        rules: [
          { ...rules, pattern: defaultPattern[rules.pattern] || rules.pattern }
        ],
        ...decoratorProps
      },
      editProps: newEditProps,
      field
    };

    return resolver(result) || result;
  };

  renderEdits = () => {
    const { fields = [], form, layout = 'vertical', resolve } = this.props;

    return Object.keys(fields).map(fieldName => {
      const { Edit, decoratorProps, editProps, field } = this.resolve(
        get(fields, [fieldName]),
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
