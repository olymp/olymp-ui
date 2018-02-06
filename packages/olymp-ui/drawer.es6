import React, { Fragment } from 'react';
import { createComponent } from 'react-fela';
import { getColor } from './colors-provider';

const Drawer = createComponent(
  ({
    theme,
    color,
    palette,
    top = 0,
    width = 312,
    right,
    left,
    open,
    collapsed = true,
    flex,
    dim
  }) => ({
    pointerEvents: 'initial',
    position: flex ? 'absolute' : 'fixed',
    top: 0,
    paddingTop: top,
    extend:
      right !== undefined
        ? {
            right: (right !== true && right) || 0,
            justifyContent: 'flex-end',
            transform: open ? null : 'translateX(100%)'
          }
        : {
            left: (left !== true && left) || 0,
            transform: open ? null : 'translateX(-101%)'
          },
    height: '100%',
    minWidth: width,
    zIndex: dim ? 15 : 12,
    overflow: !open ? 'hidden' : undefined,
    boxShadow: !collapsed ? theme.boxShadow : undefined,
    transition: 'transform 200ms ease-out, min-width 200ms ease-out',
    backgroundColor:
      getColor(theme, color, palette) || theme.inverted
        ? theme.light
        : theme.dark,
    display: 'flex'
  }),
  ({ className, children, open, onClose, width = 312, onClick, ...rest }) => (
    <aside
      className={className}
      {...rest}
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </aside>
  ),
  ({ inverted, right, top, left, collapsed, dim, ...p }) => Object.keys(p)
);

const Dimmer = createComponent(
  ({ theme, top = 0, open, inverted }) => ({
    height: '100%',
    position: 'fixed',
    top: 0,
    paddingTop: top,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: inverted ? theme.light2 : theme.dark3,
    zIndex: 14,
    opacity: !open ? 0 : 1,
    transition: 'opacity 200ms ease-out',
    pointerEvents: !open ? 'none' : undefined
  }),
  'div',
  ['onClick']
);

export default ({ dim = true, children, onClose, ...props }) => (
  <Fragment>
    {dim && <Dimmer {...props} onClick={onClose} key="dim" />}
    <Drawer {...props} dim={dim} key="draw">
      {children}
    </Drawer>
  </Fragment>
);
