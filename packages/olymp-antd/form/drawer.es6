import React from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import { FaCube, FaCheck, FaTimes, FaTrashAlt } from 'olymp-icons';
import { Icon } from 'antd';
import Form from './form';

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
  onClose,
  layout,
  title,
  width
}) => (
  <Drawer
    open={!!value.id}
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
        <Menu.Item icon={<FaCheck />} onClick={() => {}}>
          Speichern
        </Menu.Item>
        <Menu.Item icon={<FaTimes />} onClick={onClose}>
          Abbrechen
        </Menu.Item>
        {!!value.id && (
          <Menu.Item icon={<FaTrashAlt />} onClick={() => {}}>
            Löschen
          </Menu.Item>
        )}
      </Menu>
    }
  >
    <Menu
      header={
        !value.id ? (
          <Menu.Item large>{label} anlegen</Menu.Item>
        ) : (
          <Menu.Item large subtitle={`${label} bearbeiten`}>
            {title}
          </Menu.Item>
        )
      }
    >
      <Wrapper>
        <Form
          value={value}
          onChange={onChange}
          layout={layout}
          fields={fields}
        />
      </Wrapper>
    </Menu>
  </Drawer>
);
