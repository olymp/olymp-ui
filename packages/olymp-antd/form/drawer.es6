import React from 'react';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import AntMenu from 'olymp-antd/menu';
import { FaCube, FaCheck, FaTimes, FaTrashAlt } from 'olymp-icons';
import { get } from 'lodash';
import { Icon } from 'antd';
import Form from './form';

export default ({ collection, item, onClose }) => (
  <Drawer open={!!item.id} right onClose={onClose}>
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
      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Form collection={collection} item={item} />
      </div>
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
