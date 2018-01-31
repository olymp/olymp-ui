import React from 'react';
import { createComponent, withTheme } from 'react-fela';
import { CompactPicker } from 'react-color';

export default createComponent(
  () => ({
    '> div > div:first-child': {
      display: 'none'
    },
    '& .ant-input': {
      height: 'auto',
      padding: 'initial'
    }
  }),
  withTheme(({ theme, value, colors = [], onChange, className, ...p }) => {
    const c = [
      ...(theme.colors || []).map(color => color[theme.palette]),
      ...(colors || [])
    ];

    return (
      <div className={className}>
        <CompactPicker
          className="ant-input"
          color={value}
          colors={c.length ? c : undefined}
          onChange={({ hex }) => onChange(hex)}
          {...p}
        />
      </div>
    );
  }),
  p => Object.keys(p)
);
