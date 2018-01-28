import React from 'react';
import { Drawer } from 'olymp-ui';
import Menu from 'olymp-ui/menu';
import Uploader from './uploader';
// import Dragzone from '../components/dragzone';

export default ({
  open = true,
  collapsed = false,
  width = 240,
  dim = false,
  setCollapsed = () => {}
}) => (
  <Drawer
    open={open}
    collapsed={collapsed}
    dim={dim}
    right
    width={width}
    onMouseEnter={() => setCollapsed(false)}
    onMouseLeave={() => setCollapsed(true)}
  >
    <Menu
      collapsed={collapsed}
      header={<Menu.Item large>Dateien Hochladen</Menu.Item>}
    >
      <Uploader />
    </Menu>
  </Drawer>
);
