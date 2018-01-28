import React from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import AntMenu from 'olymp-antd/menu';
import { FaCube, FaCheck, FaTimes, FaTrashAlt } from 'olymp-icons';
import { get } from 'lodash';
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

export default ({ collection, item, onClose, layout }) => (
  <Drawer
    open={!!item.id}
    width={layout === 'horizontal' ? 400 : undefined}
    right
    onClose={onClose}
  >
    <Menu
      header={
        !item.id ? (
          <Menu.Item large>{collection.label} anlegen</Menu.Item>
        ) : (
          <Menu.Item large subtitle={`${collection.label} bearbeiten`}>
            {get(item, 'list.title')}
          </Menu.Item>
        )
      }
    >
      <Wrapper>
        <Form collection={collection} item={item} layout={layout} />
      </Wrapper>
    </Menu>

    <Menu
      color
      inverted
      collapsed
      header={
        <Menu.Item
          large
          icon={collection.icon ? <Icon type={collection.icon} /> : <FaCube />}
        />
      }
    >
      <AntMenu.Tooltip icon={<FaCheck />} onClick={() => {}}>
        Speichern
      </AntMenu.Tooltip>
      <AntMenu.Tooltip icon={<FaTimes />} onClick={onClose}>
        Abbrechen
      </AntMenu.Tooltip>
      {!!item.id && (
        <AntMenu.Tooltip icon={<FaTrashAlt />} onClick={() => {}}>
          Löschen
        </AntMenu.Tooltip>
      )}
    </Menu>
  </Drawer>
);
