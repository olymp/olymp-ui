import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { format, isValid, startOfDay, compareAsc } from 'date-fns';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Calendar from 'olymp-ui/calendar';
import MaskedTextInput from './edit-mask-input';
import FormIcon from './form-icon';

export default class EditDate extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
      PropTypes.string
    ])
  };
  state = { input: undefined };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (compareAsc(new Date(value), new Date(nextProps.value)) === 0) {
      this.setState({ input: undefined });
    }
  }

  render() {
    const {
      value,
      onChange,
      calendar: CalendarComponent,
      ...rest
    } = this.props;
    const { input } = this.state;
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
            content={<Cal value={value} arrows onChange={onChange} />}
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
          } else {
            this.setState({ input: date });
          }
        }}
        pipe={createAutoCorrectedDatePipe('dd.mm.yyyy')}
        {...rest}
      />
    );
  }
}
