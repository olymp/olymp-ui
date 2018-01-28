import React from 'react';
import { createComponent } from 'react-fela';
import tinycolor from 'tinycolor2';
import Field from './field';

export default createComponent(
  ({ theme, disabled, active, today }) => ({
    color: (!!active && theme.light) || (disabled && theme.dark4),
    backgroundColor: (!!active && theme.color) || (!!today && theme.dark4),
    borderRadius: '50%',
    cursor: 'pointer',
    '> .content': {
      '> .points': {
        centerX: true,
        top: 10,
        color:
          (!!active && theme.light2) ||
          (disabled && theme.dark5) ||
          theme.dark2,
        fontSize: '90%'
      }
    },
    onHover: {
      backgroundColor:
        (!!active &&
          tinycolor(theme.color)
            .setAlpha(0.8)
            .toString()) ||
        theme.dark4
    }
  }),
  ({ children, points, ...p }) => (
    <Field {...p}>
      {children}
      {!!points && (
        <div className="points">
          {Array.from(Array(points)).map((x, y) => <span key={y}>&bull;</span>)}
        </div>
      )}
    </Field>
  ),
  ({ active, today, ...p }) => Object.keys(p)
);
