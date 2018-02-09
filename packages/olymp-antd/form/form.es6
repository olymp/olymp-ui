import React, { Component } from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import DefaultEdits from './default-edits';
import defaultPattern from './default-pattern';
import FormItem from './form-item';
import FormIcon from './form-icon';

const reduce = (fns = [], value, props) => {
  const [fn, ...rest] = fns;

  if (fn) {
    const newValue = fn(value, props);
    if (newValue) {
      return reduce(rest, newValue);
    }
  }
  return value;
};

const defaultResolver = f => {
  const {
    edit,
    editProps,
    decoratorProps: { initialValue, rules = {}, ...decoratorProps } = {}
  } = f;
  const newEditProps = { ...editProps };
  let e = edit;

  switch (edit) {
    case 'phone':
      e = 'input';
      newEditProps.suffix = <FormIcon type="phone" />;
      rules.pattern = 'phone';
      rules.message = 'Ungültige Nummer';
      rules.min = 4;
      rules.max = 20;
      break;

    case 'url':
      e = 'input';
      newEditProps.suffix = <FormIcon type="link" />;
      rules.pattern = 'url';
      rules.message = 'Ungültige URL';
      rules.min = 4;
      break;

    case 'email':
      e = 'input';
      newEditProps.suffix = <FormIcon type="mail" />;
      rules.pattern = 'email';
      rules.message = 'Ungültige E-Mail';
      rules.min = 4;
      break;

    default:
  }

  return {
    ...f,
    edit: e,
    decoratorProps: {
      initialValue,
      rules: [
        { ...rules, pattern: defaultPattern[rules.pattern] || rules.pattern }
      ],
      ...decoratorProps
    },
    editProps: newEditProps,
    component: DefaultEdits[e] || DefaultEdits.test(e) || DefaultEdits.input
  };
};

const compose = (resolvers = []) => {
  let r = [...resolvers];

  if (!Array.isArray(r)) {
    r = [r];
  }
  r = [...r.filter(x => x), defaultResolver].reverse();

  return (initial, props) => reduce(r, initial, props);
};

@Form.create({
  mapPropsToFields: ({ value }) => {
    const obj = {};
    Object.keys(value || {}).forEach(field => {
      obj[field] = Form.createFormField({
        value: value[field]
      });
    });

    return obj;
  },
  onValuesChange: ({ onChange }, changed, all) => onChange(changed, all)
})
export default class AntForm extends Component {
  renderEdits = resolve => {
    const { fields = [], form, layout = 'vertical' } = this.props;

    return Object.keys(fields).map(fieldName => {
      const {
        edit,
        decoratorProps,
        editProps,
        component: Edit,
        ...field
      } = resolve(get(fields, [fieldName]), this.props);

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
    const { layout = 'vertical', hideRequiredMark, resolve } = this.props;
    const composedResolver = compose(resolve);
    return (
      <Form layout={layout} hideRequiredMark={hideRequiredMark}>
        {this.renderEdits(composedResolver)}
      </Form>
    );
  }
}
