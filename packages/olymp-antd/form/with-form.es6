import { Form } from 'antd';

export default (name = 'value', transform = value => value) =>
  Form.create({
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
