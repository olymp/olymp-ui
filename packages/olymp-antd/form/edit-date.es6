import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { format, isValid, startOfDay, compareAsc } from 'date-fns';
import { withState } from 'recompose';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Calendar from 'olymp-ui/calendar';
import MaskedTextInput from './edit-mask-input';
import FormIcon from './form-icon';

const enhance = withState('input', 'setInput');

@enhance
class EditDate extends Component {
  componentWillReceiveProps(nextProps) {
    const { value, setInput } = this.props;

    if (compareAsc(new Date(value), new Date(nextProps.value)) === 0) {
      setInput();
    }
  }

  render() {
    const {
      value,
      onChange,
      input,
      setInput,
      calendar: CalendarComponent,
      ...rest
    } = this.props;
    const Cal = CalendarComponent || Calendar;

    return (
      <MaskedTextInput
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        keepCharPositions
        placeholder="Datum"
        suffix={
          <Popover
            placement="bottomRight"
            trigger="click"
            content={
              <Cal
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
        value={
          input !== undefined ? input : format(new Date(value), 'DD.MM.YYYY')
        }
        onChange={e => {
          const date = e.target.value;

          if (!date) {
            onChange();
          } else if (isValid(date.split('.').reverse())) {
            onChange(startOfDay(new Date(date.split('.').reverse())));
          }
          setInput(date);
        }}
        pipe={createAutoCorrectedDatePipe('dd.mm.yyyy')}
        {...rest}
      />
    );
  }
}
EditDate.propTypes = {
  value: PropTypes.instanceOf(Date)
};
export default EditDate;
