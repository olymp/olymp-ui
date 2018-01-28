import React from 'react';
import { createComponent } from 'react-fela';
import { Form } from 'antd';

export default createComponent(
  ({ theme }) => ({
    marginBottom: theme.space3
  }),
  p => <Form.Item {...p} />,
  p => Object.keys(p)
);
