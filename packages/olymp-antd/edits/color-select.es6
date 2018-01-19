import React from 'react';
import { createComponent } from 'react-fela';
import { Select } from 'antd';
import { colorsMaterial } from 'olymp-ui';

const colorsName = colorsMaterial.map(color => color.color);

const Color = createComponent(
  ({ color }) => ({
    color
  }),
  'span'
);

// todo: farben aus theme.colors holen!

export default () => (
  <Select style={{ width: '100%' }} placeholder="Farbe wählen" {...this.props}>
    {colorsName.map((name, i) => (
      <Select.Option
        key={name}
        title={name}
        value={i}
        style={{ backgroundColor: colorsMaterial[i].palette[7] }}
      >
        <Color color={colorsMaterial[i].palette[7]}>{name}</Color>
      </Select.Option>
    ))}
  </Select>
);
