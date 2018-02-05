import React, { Fragment } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { createComponent } from 'react-fela';
import { withStyle } from 'olymp-fela';
import Menu from '../menu';
import {
  FaClose,
  FaChevronDoubleRight,
  FaChevronDoubleLeft
} from 'olymp-icons';
import AutoSizer from './autosizer';
import Tappable from 'react-tappable/lib/Tappable';
import Swipeable from 'react-swipeable';

const raf = func => {
  const options = {
    ticking: false,
    x: 0
  };
  const update = () => {
    func(options.x, () => {
      options.ticking = false;
    });
  };
  const requestTick = x => {
    options.x = x;
    if (!options.ticking) {
      requestAnimationFrame(update);
    }
    options.ticking = true;
  };
  return requestTick;
};

const enhanceSwiper = compose(
  withHandlers({
    setAbsX: ({ setAbsX }) => raf(setAbsX)
  })
);
export const Swiper = enhanceSwiper(
  createComponent(
    ({ theme, collapsed, zIndex }) => ({
      display: 'none',
      position: 'absolute',
      top: '50%',
      right: 0,
      padding: 2,
      transform: 'translate(50%, -50%)',
      backgroundColor: theme.color,
      borderRadius: '100%',
      '@media (pointer:coarse)': {
        display: 'block'
      }
    }),
    ({
      className,
      collapsed,
      width,
      setCollapsed,
      large = true,
      setAbsX,
      absX
    }) => (
      <Tappable
        className={className}
        onTap={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed && <FaChevronDoubleRight size={14} color="light" />}
        {!collapsed && <FaChevronDoubleLeft size={14} color="light" />}
      </Tappable>
    ),
    p => Object.keys(p)
  )
);

export const ContentContainer = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  []
);

export const Navigation = createComponent(
  ({ collapsed, absX, width = 240, hasContent }) => ({
    width: collapsed ? 72 : 240,
    position: 'relative',
    ifSmallDown: {
      width: hasContent ? 0 : collapsed ? '1rem' : undefined
    },
    '@media (pointer:coarse, max-width: 1199px)': {
      width: collapsed ? '1rem' : undefined
    }
  }),
  ({ children, className, setCollapsed, collapsed }) => (
    <div
      className={className}
      // onMouseLeave={() => setCollapsed(true)}
      // onMouseEnter={() => setCollapsed(false)}
    >
      {children}
    </div>
  ),
  ['setCollapsed', 'collapsed']
);

export const Sidebar = createComponent(
  ({ theme, left, hasContent, width = 240 }) => ({
    width,
    ifSmallDown: {
      width: hasContent ? 0 : undefined
    }
  }),
  'div',
  []
);

export const Section = createComponent(
  ({ left, placeholder, zIndex }) => ({
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    ifSmallDown: placeholder && {
      display: 'none'
    }
  }),
  props => <div {...props} />,
  ({ placeholder, ...rest }) => Object.keys(rest)
);

const enhance = compose(
  withState('absX', 'setAbsX', 0),
  withStyle({
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  })
);
export default enhance(
  ({
    className,
    setCollapsed,
    menu,
    children,
    width = 240,
    absX,
    setAbsX,
    header
  }) => {
    const inner = ({ width, height }) => {
      const collapsed = width < 1200;
      const innerMenu = (
        <Menu color inverted collapsed={collapsed} header={header}>
          {menu}
        </Menu>
      );
      return (
        <Fragment>
          <Navigation
            absX={absX}
            // setCollapsed={setCollapsed}
            collapsed={collapsed}
            width={width}
          >
            {innerMenu}
          </Navigation>
          {children}
        </Fragment>
      );
    };
    return <AutoSizer className={className}>{inner}</AutoSizer>;
  }
);

export const SecondarySidebar = ({
  menu,
  children,
  width = 400,
  hasContent = true,
  placeholder = null,
  className
}) => (
  <ContentContainer>
    <Sidebar width={width} className={className} hasContent={hasContent}>
      {menu}
    </Sidebar>
    {hasContent ? (
      <Section>{children}</Section>
    ) : (
      <Section placeholder>{placeholder || children}</Section>
    )}
  </ContentContainer>
);
