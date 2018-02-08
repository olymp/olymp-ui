import React from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import { FaCube, FaCheck, FaTimes, FaTrashAlt } from 'olymp-icons';
import { Icon } from 'antd';
import Form from './autoform';

const Wrapper = createComponent(
  ({ theme }) => ({
    paddingX: theme.space3,
    '& .ant-form-item-label': {
      textAlign: 'left'
    }
  }),
  'div'
);

export default ({
  icon,
  label,
  fields,
  value,
  onChange,
  onSave,
  onClose,
  onDelete,
  layout,
  title,
  width,
  resolve
}) => (
  <Drawer
    open={!!value}
    width={width || (layout === 'horizontal' ? 520 : 400)}
    right
    onClose={onClose}
    menu={
      <Menu
        color
        inverted
        collapsed
        header={
          <Menu.Item large icon={icon ? <Icon type={icon} /> : <FaCube />}>
            {label}
          </Menu.Item>
        }
      >
        {!!onSave && (
          <Menu.Item icon={<FaCheck />} onClick={onSave}>
            Speichern
          </Menu.Item>
        )}
        {!!onClose && (
          <Menu.Item icon={<FaTimes />} onClick={onClose}>
            Abbrechen
          </Menu.Item>
        )}
        {!!onDelete && (
          <Menu.Item icon={<FaTrashAlt />} onClick={onDelete}>
            Löschen
          </Menu.Item>
        )}
      </Menu>
    }
  >
    <Menu header={!!title && <Menu.Item large>{title}</Menu.Item>}>
      <Wrapper>
        <Form
          value={value}
          onChange={onChange}
          layout={layout}
          fields={fields}
          resolve={resolve}
        />
      </Wrapper>
    </Menu>
  </Drawer>
);
