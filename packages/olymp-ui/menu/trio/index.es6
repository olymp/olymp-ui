import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { createComponent } from 'react-fela';
import { withStyle } from 'olymp-fela';
import { FaChevronLeft, FaEllipsisV } from 'olymp-icons';
import Swipeable from 'react-swipeable';
import Menu from '../menu';

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

export const Icon = enhanceSwiper(
  createComponent(
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
          display: 'block',
        },
    }),
    ({
      className,
      color,
      size,
      icon: Icon
    }) => (
      <Icon className={className} size={size || 18} color={color || 'light'} />
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
  ({ collapsed, absX, width = 240 }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    flex: 0,
    width: collapsed ? 72 : 240,
    position: 'relative',
    ifSmallDown: {
      width: collapsed ? 12 : 240,
      maxWidth: collapsed ? 12 : 240,
      minWidth: collapsed ? 12 : 240,
      overflow: 'hidden',
    },
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
      {collapsed && <Icon icon={FaEllipsisV} collapsed={collapsed} setCollapsed={setCollapsed} />}
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
    },
  }),
  ({ children, className, goBack, hasContent }) => (
    <Swipeable
      onSwipedRight={() => goBack()}
      className={className}
      onTap={hasContent ? () => goBack() : null}
    >
      {hasContent && <Icon setCollapsed={() => goBack()} icon={FaChevronLeft} size={14} color="dark" />}
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
    flex: 1
  })
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
  }) => 
    // const collapsed = width < 1200;
     (
       <div
         className={className}
       >
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

export const SecondarySidebar = ({
  menu,
  children,
  width = 400,
  hasContent = true,
  placeholder = null,
  goBack = () => {},
  className
}) => (
  <ContentContainer>
    <Sidebar width={width} className={className} hasContent={hasContent} goBack={goBack}>
      {menu}
    </Sidebar>
    {hasContent ? (
      <Section>{children}</Section>
    ) : (
      <Section placeholder>{placeholder || children}</Section>
    )}
  </ContentContainer>
);
