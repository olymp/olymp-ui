import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withState,
  getContext,
  withProps,
  withPropsOnChange
} from 'recompose';
import { withStyle, withTheme, createComponent } from 'olymp-fela';
import { connect } from 'react-redux';
import { FaChevronLeft, FaEllipsisV } from 'olymp-icons';
import Swipeable from 'react-swipeable';
import Menu from '../menu';

export const Icon = createComponent(
  () => ({
    // display: 'none',
    display: 'none',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    padding: 1,
    transform: 'translate(-2px, -50%)',
    borderRadius: '100%',
    ifSmallDown: {
      display: 'block'
    }
  }),
  ({ className, color, size, icon: Icon }) => (
    <Icon className={className} size={size || 18} color={color || 'light'} />
  ),
  p => Object.keys(p)
);

export const ContentContainer = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden'
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  []
);

export const Navigation = createComponent(
  ({ collapsed, width = 240 }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    flex: 0,
    width: collapsed ? 72 : width,
    maxWidth: collapsed ? 72 : width,
    minWidth: collapsed ? 72 : width,
    position: 'relative',
    ifSmallDown: {
      width: collapsed ? 12 : width,
      maxWidth: collapsed ? 12 : width,
      minWidth: collapsed ? 12 : width,
      overflow: 'hidden'
    }
  }),
  ({ children, className, setCollapsed, collapsed }) => (
    <Swipeable
      onSwipedRight={() => setCollapsed(false)}
      onSwipedLeft={() => setCollapsed(true)}
      className={className}
      onMouseLeave={() => setCollapsed(true)}
      onMouseEnter={() => setCollapsed(false)}
      onTap={collapsed ? () => setCollapsed(false) : null}
    >
      {collapsed && (
        <Icon
          icon={FaEllipsisV}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}
      {children}
    </Swipeable>
  ),
  ['setCollapsed', 'collapsed']
);

export const Sidebar = createComponent(
  ({ hasContent, width = 240 }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    width,
    position: 'relative',
    ifSmallDown: {
      width: hasContent ? 12 : '100%',
      maxWidth: hasContent ? 12 : '100%',
      minWidth: hasContent ? 12 : '100%',
      overflow: 'hidden'
    }
  }),
  ({ children, className, goBack, hasContent }) => (
    <Swipeable
      onSwipedRight={() => goBack()}
      className={className}
      onTap={hasContent ? () => goBack() : null}
    >
      {hasContent && (
        <Icon
          setCollapsed={() => goBack()}
          icon={FaChevronLeft}
          size={14}
          color="dark"
        />
      )}
      {children}
    </Swipeable>
  ),
  ['goBack', 'hasContent']
);

export const Section = createComponent(
  ({ placeholder }) => ({
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    ifSmallDown: placeholder && {
      display: 'none'
    }
  }),
  props => <div {...props} />,
  ({ placeholder, ...rest }) => Object.keys(rest)
);

const enhance = compose(
  withState('absX', 'setAbsX', 0),
  // withState('collapsed', 'setCollapsed', true),
  withStyle({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden'
  }),
  getContext({
    renderer: PropTypes.object
  }),
  withTheme,
  withProps(({ renderer, theme }) => {
    renderer.renderStatic(
      {
        overflow: 'hidden',
        height: '100%'
      },
      '#app,body,html'
    );
    renderer.renderStatic(
      {
        padding: 'env(safe-area-inset-top) 0 0 0',
        backgroundColor: theme.color
      },
      'body'
    );
    renderer.renderStatic(
      {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white'
      },
      '#app'
    );
  }),
  withState('collapsed', 'setCollapsed', true),
  connect(({ location }) => ({
    url: location.url
  })),
  withPropsOnChange(['url'], ({ url, collapsed, setCollapsed }) => ({
    xy: !collapsed ? setCollapsed(true) : null
  }))
);
export default enhance(
  ({
    className,
    setCollapsed,
    collapsed,
    menu,
    children,
    width = 240,
    header
  }) => (
    // const collapsed = width < 1200;
    <div className={className}>
      <Navigation
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        width={width}
      >
        <Menu color inverted collapsed={collapsed} header={header}>
          {menu}
        </Menu>
      </Navigation>
      {children}
    </div>
  )
);

export const Area = ({
  menu,
  children,
  width = 400,
  hasContent = true,
  placeholder = null,
  goBack = () => {},
  className
}) => (
  <ContentContainer>
    <Sidebar
      width={width}
      className={className}
      hasContent={hasContent}
      goBack={goBack}
    >
      {menu}
    </Sidebar>
    {hasContent ? (
      <Section>{children}</Section>
    ) : (
      <Section placeholder>{placeholder || children}</Section>
    )}
  </ContentContainer>
);
