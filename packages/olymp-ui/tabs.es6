import React, { Children, cloneElement } from 'react';
import { createComponent } from 'react-fela';
import { getColor } from 'olymp-ui';
import { get } from 'lodash';
import { withState, compose, withPropsOnChange } from 'recompose';

const enhance = compose(
  withState('activeInnerIndex', 'setActiveInnerIndex', 0),
  withPropsOnChange(
    ['children', 'activeIndex', 'activeInnerIndex'],
    ({ children, activeIndex, activeInnerIndex }) => {
      const ai = activeIndex !== undefined ? activeIndex : activeInnerIndex;

      return {
        activeIndex: ai,
        activeTab: (
          (
            Children.map(children, (child, index) => ({
              child,
              index
            })) || []
          ).find(c => c.index === ai) || {}
        ).child
      };
    }
  )
);

const Tabs = enhance(
  createComponent(
    ({ theme }) => ({
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      marginY: theme.space3
    }),
    ({
      className,
      children,
      activeIndex,
      setActiveInnerIndex,
      activeTab,
      color = true,
      palette,
      onChange,
      ...p
    }) => (
      <div>
        <div className={className} {...p}>
          {Children.map(
            children,
            (child, i) =>
              child
                ? cloneElement(child, {
                    active: i === activeIndex,
                    onClick: e =>
                      onChange ? onChange(e, child) : setActiveInnerIndex(i),
                    color,
                    palette
                  })
                : child
          )}
        </div>
        {get(activeTab, 'props.children')}
      </div>
    ),
    ({ activeInnerIndex, ...p }) => Object.keys(p)
  )
);
Tabs.displayName = 'Tabs';

const Tab = createComponent(
  ({ theme, active, right, color, palette }) => ({
    display: 'flex',
    color: !!active && theme.light,
    backgroundColor: !!active && getColor(theme, color, palette),
    paddingY: theme.space2,
    paddingX: theme.space3,
    marginRight: theme.space2,
    marginLeft: !!right && 'auto',
    marginY: theme.space1,
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0
    },
    onHover: {
      backgroundColor: active
        ? getColor(theme, color, (palette || theme.palette) + 1)
        : theme.dark5
    }
  }),
  ({ title, ...p }) => <div {...p}>{title}</div>,
  ({ right, color, active, palette, ...p }) => Object.keys(p)
);
Tab.displayName = 'TabsTab';

const Group = createComponent(
  ({ right }) => ({
    display: 'flex',
    marginLeft: !!right && 'auto'
  }),
  ({ className, children, ...p }) => (
    <div className={className}>
      {Children.map(
        children,
        child => (child ? cloneElement(child, { ...p, ...child.props }) : child)
      )}
    </div>
  ),
  ({ right, ...p }) => Object.keys(p)
);
Group.displayName = 'TabsGroup';

Tabs.Tab = Tab;
Tabs.Group = Group;
export default Tabs;
