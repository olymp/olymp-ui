import React from 'react';
import { Input } from 'antd';

export default ({
  'data-__field': dataField,
  'data-__meta': dataMeta,
  ...p
}) => (
  <Input type="text" data-__field={dataField} data-__meta={dataMeta} {...p} />
);
