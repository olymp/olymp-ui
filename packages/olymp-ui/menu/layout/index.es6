import React, { cloneElement } from 'react';
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
import Tappable from 'react-tappable';
import Swipeable from 'react-swipeable';

export const Icon = createComponent(
  ({ theme }) => ({
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    width: '100%',
    '> svg': {
        // display: 'none',
      display: 'none',
      position: 'absolute',
      top: '50%',
      right: 0,
      left: 0,
      padding: 1,
      transform: 'translate(4px, -50%)',
      borderRadius: '100%',
      ifSmallDown: {
        display: 'block'
      }
    }
  }),
  ({ className, color, size, icon: Icon, onClick }) => (
    <Tappable className={className} onTap={onClick}>
      <Icon size={size || 18} color={color || 'light'} />
    </Tappable>
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
  ({ collapsed, width = 240, theme }) => ({
    flex: 0,
    width: 72,
    maxWidth: 72,
    minWidth: 72,
    height: '100%',
    position: 'relative',
    '> div': !collapsed ? {
      height: '100%',
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      zIndex: 5,
      width,
      position: 'absolute',
    } : {
      height: '100%',
    },
    ifSmallDown: {
      width: 24,
      maxWidth: 24,
      minWidth: 24,
      overflow: collapsed ? 'hidden' : undefined,
      '> div > div > *': collapsed && {
        display: 'none',
      }
    }
  }),
  ({ children, className, setCollapsed, collapsed }) => (
    <div className={className}>
      <Swipeable
        onSwipedRight={() => setCollapsed(false)}
        onSwipedLeft={() => setCollapsed(true)}
        onMouseMove={() => collapsed && setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        {children}
        {collapsed && <Icon onClick={() => setCollapsed(false)} icon={FaEllipsisV} />}
      </Swipeable>
    </div>
  ),
  ['setCollapsed', 'collapsed']
);

export const Sidebar = createComponent(
  ({ hasContent, width = 240 }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    width,
    position: 'relative',
    ifSmallDown: {
      width: hasContent ? 24 : '100%',
      maxWidth: hasContent ? 24 : '100%',
      minWidth: hasContent ? 24 : '100%',
      overflow: 'hidden',
      '> div > *': {
        display: hasContent ? 'none' : undefined
      }
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
  }) => (
    // const collapsed = width < 1200;
    <div className={className}>
      <Navigation
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        width={width}
      >
        {cloneElement(menu, { collapsed })}
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
