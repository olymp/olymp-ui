import React from 'react';
import { Row, Col } from 'antd';
import { get } from 'lodash';
import { isBefore, endOfDay } from 'date-fns';
import EditDate from './edit-date';

const Edit = ({ value, onChange, ...props }) => {
  const end = isBefore(get(value, 'end'), get(value, 'start'))
    ? get(value, 'end', new Date())
    : get(value, 'start', new Date());

  return (
    <Row gutter={16}>
      <Col span={12}>
        <EditDate
          value={get(value, 'start')}
          onChange={v => onChange({ end: get(value, 'end'), start: v })}
          {...props}
        />
      </Col>
      <Col span={12}>
        <EditDate
          value={get(value, 'start') ? end : undefined}
          onChange={v =>
            onChange({ start: get(value, 'start'), end: endOfDay(v) })
          }
          {...props}
        />
      </Col>
    </Row>
  );
};
Edit.displayName = 'EditDaterange';
Edit.type = 'object';
export default Edit;
