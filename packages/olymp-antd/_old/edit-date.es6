import React from 'react';
import { Input } from 'antd';

export default ({ innerType, ...props }) => (
  <Input
    {...props}
    format={innerType.name === 'DateTime' ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY'}
    showTime={innerType.name === 'DateTime' ? { format: 'HH:mm' } : null}
  />
);
