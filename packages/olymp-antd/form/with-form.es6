import { Form } from 'antd';

export default (name = 'value') =>
  Form.create({
    mapPropsToFields: props => {
      const obj = {};
      Object.keys(props[name] || {}).forEach(field => {
        obj[field] = Form.createFormField({
          value: props[name][field]
        });
      });

      return obj;
    }
  });
