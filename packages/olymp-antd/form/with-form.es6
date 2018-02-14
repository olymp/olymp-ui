import { Form } from 'antd';

export default (name, transform) => {
  if (typeof name === 'function') {
    transform = name;
    name = undefined;
  }
  if (!name) name = 'value';
  if (!transform) transform = value => value;

  return Form.create({
    mapPropsToFields: props => {
      const value = transform(props[name]);

      const obj = {};
      Object.keys(value || {}).forEach(field => {
        obj[field] = Form.createFormField({
          value: value[field]
        });
      });

      return obj;
    }
  });
};
