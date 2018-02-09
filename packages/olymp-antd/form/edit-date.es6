import React from 'react';
import { Popover } from 'antd';
import { format, isValid } from 'date-fns';
import { withState } from 'recompose';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Calendar from 'olymp-ui/calendar';
import MaskedTextInput from './edit-mask-input';
import FormIcon from './form-icon';

const enhance = withState('input', 'setInput');

export default enhance(({ value, onChange, input, setInput, ...rest }) => (
  <MaskedTextInput
    mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
    placeholder="Datum"
    suffix={
      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <Calendar
            value={value}
            arrows
            onChange={v => {
              onChange(v);
              setInput();
            }}
          />
        }
      >
        <FormIcon type="calendar" onClick={() => {}} />
      </Popover>
    }
    value={input || format(new Date(value), 'DD.MM.YYYY')}
    onChange={e => {
      const date = e.target.value;

      if (isValid(date.split('.').reverse())) {
        onChange(new Date(date.split('.').reverse()));
      }
      setInput(date);
    }}
    pipe={createAutoCorrectedDatePipe('dd.mm.yyyy')}
    {...rest}
  />
));
