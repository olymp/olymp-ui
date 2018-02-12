import React from 'react';
import { createComponent, withTheme } from 'react-fela';
import { CompactPicker } from 'react-color';
import { getColor } from 'olymp-ui';

const Edit = createComponent(
  () => ({
    '> div > div:first-child': {
      display: 'none'
    },
    '& .ant-input': {
      height: 'auto',
      padding: 'initial',
      width: 'calc(100% - 5px) !important'
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
          color={getColor(theme, value, theme.palette) || value}
          colors={c.length ? c : undefined}
          onChange={({ hex }) => onChange(hex)}
          {...p}
        />
      </div>
    );
  }),
  p => Object.keys(p)
);
Edit.displayName = 'EditColor';
Edit.type = 'hex';
export default Edit;
