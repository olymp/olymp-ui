import React from 'react';
import { createComponent } from 'react-fela';
import { Radio, Slider } from 'antd';
import { withPropsOnChange } from 'recompose';

const Container = createComponent(
  ({ theme }) => ({
    height: 'auto',
    marginTop: theme.space1,
    paddingX: theme.space4,
    paddingY: theme.space1
  }),
  'div'
);

const RadioGroup = createComponent(
  ({ theme }) => ({
    width: '100%',
    display: 'flex',
    '> .ant-radio-button-wrapper': {
      flexGrow: 1,
      textAlign: 'center',
      height: 'auto',
      lineHeight: 'initial',
      padding: theme.space2
    }
  }),
  p => <Radio.Group {...p} />,
  p => Object.keys(p)
);

const numberToTime = number =>
  number % 1 === 0.5 ? `${number}`.replace('.5', ':30') : `${number}:00`;

const Edit = withPropsOnChange(['marks'], ({ marks = [9, 12, 15, 18] }) => {
  const obj = {};
  marks.forEach(m => {
    obj[m] = numberToTime(m);
  });

  return {
    obj,
    marks
  };
})(
  ({
    value: [start = 0, end = 0] = [],
    step = 0.5,
    marks,
    obj,
    onChange,
    slider = true
  }) => (
    <div>
      <RadioGroup
        onChange={e =>
          onChange(e.target.value.split('|').map(v => parseInt(v, 10)))
        }
        value={[start, end].join('|')}
      >
        {marks.map(
          (mark, i) =>
            marks[i + 1] ? (
              <Radio.Button
                key={[mark * 60000 * 60, marks[i + 1] * 60000 * 60].join('|')}
                value={[mark * 60000 * 60, marks[i + 1] * 60000 * 60].join('|')}
              >
                {numberToTime(mark)}
                <br />
                {numberToTime(marks[i + 1])}
              </Radio.Button>
            ) : (
              <Radio.Button
                value={[
                  Math.min(...marks) * 60000 * 60,
                  Math.max(...marks) * 60000 * 60
                ].join('|')}
              >
                {numberToTime(Math.min(...marks))}
                <br />
                {numberToTime(Math.max(...marks))}
              </Radio.Button>
            )
        )}
      </RadioGroup>

      {!!slider && (
        <Container className="ant-input">
          <Slider
            range
            min={Math.min(...marks)}
            max={Math.max(...marks)}
            marks={obj}
            tipFormatter={v => numberToTime(v)}
            step={step}
            onChange={([s, e]) => onChange([s * 60000 * 60, e * 60000 * 60])}
            value={
              start && end
                ? [start / (60000 * 60), end / (60000 * 60)]
                : undefined
            }
          />
        </Container>
      )}
    </div>
  )
);
Edit.displayName = 'EditTimerange';
Edit.type = 'array';
export default Edit;
