import React from 'react';
import { createComponent } from 'react-fela';
import { Select } from 'antd';
import { MaterialColors } from 'olymp-ui';

const colorsName = MaterialColors.map(color => color.color);

const Color = createComponent(
  ({ color }) => ({
    color
  }),
  'span'
);

export default () => (
  <Select style={{ width: '100%' }} placeholder="Farbe wählen" {...this.props}>
    {colorsName.map((name, i) => (
      <Select.Option
        key={name}
        title={name}
        value={MaterialColors[i].palette[7]}
        style={{ backgroundColor: MaterialColors[i].palette[7] }}
      >
        <Color color={MaterialColors[i].palette[7]}>{name}</Color>
      </Select.Option>
    ))}
  </Select>
);
