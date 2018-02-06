import React, { Fragment, cloneElement } from 'react';
import { createComponent, withStyle } from 'olymp-fela';
import { withState, compose } from 'recompose';
import Swipeable from 'react-swipeable';
import { getColor } from './colors-provider';

export const Navigation = createComponent(
  ({ collapsed, width = 240, right }) => ({
    flex: 0,
    flexWidth: 72,
    height: '100%',
    position: 'relative', 
    '> div': !collapsed ? {  
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',   
      height: '100%',
      right: right ? 0 : undefined,
      zIndex: 5,
      flexWidth: width,
      position: 'absolute',
    } : {
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',   
      position: 'absolute',
      flexWidth: 72,
      height: '100%',
    },
  }),
  ({ children, className, setCollapsed, collapsed }) => (
    <div className={className}>
      <Swipeable
        onSwipedRight={() => setCollapsed(false)}
        onSwipedLeft={() => setCollapsed(true)}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        {children}
      </Swipeable>
    </div>
  ),
  ['setCollapsed', 'collapsed']
);


const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withStyle(({
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
    flexWidth: width,
    zIndex: dim ? 15 : 12,
    overflow: !open ? 'hidden' : undefined,
    boxShadow: !collapsed ? theme.boxShadow : undefined,
    transition: 'transform 200ms ease-out, min-width 200ms ease-out',
    backgroundColor:
      getColor(theme, color, palette) || theme.inverted
        ? theme.light
        : theme.dark,
    display: 'flex',
    ifSmallDown: {
      flexWidth: '100%',
    }
  })),
);

const Drawer = enhance(({ className, children, open, onClose, onClick, right, menu, setCollapsed, collapsed, width, ...rest }) => (
  <aside
    className={className}
    {...rest}
    onClick={e => {
      e.stopPropagation();
      if (onClick) onClick(e);
    }}
  >
    {children}
    <Navigation
      right={right}
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      width={width}
    >
      {menu && cloneElement(menu, { collapsed })}
    </Navigation>
  </aside>
));

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
