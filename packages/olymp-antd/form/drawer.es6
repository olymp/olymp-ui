import React from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import AntMenu from 'olymp-antd/menu';
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

export default ({ schema, value, onChange, onClose, layout, title, width }) => (
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
          <Menu.Item
            large
            icon={schema.icon ? <Icon type={schema.icon} /> : <FaCube />}
          />
        }
      >
        <AntMenu.Tooltip icon={<FaCheck />} onClick={() => {}}>
          Speichern
        </AntMenu.Tooltip>
        <AntMenu.Tooltip icon={<FaTimes />} onClick={onClose}>
          Abbrechen
        </AntMenu.Tooltip>
        {!!value.id && (
          <AntMenu.Tooltip icon={<FaTrashAlt />} onClick={() => {}}>
            Löschen
          </AntMenu.Tooltip>
        )}
      </Menu>
    }
  >
    <Menu
      header={
        !value.id ? (
          <Menu.Item large>{schema.label} anlegen</Menu.Item>
        ) : (
          <Menu.Item large subtitle={`${schema.label} bearbeiten`}>
            {title}
          </Menu.Item>
        )
      }
    >
      <Wrapper>
        <Form
          schema={schema}
          value={value}
          onChange={onChange}
          layout={layout}
        />
      </Wrapper>
    </Menu>
  </Drawer>
);
