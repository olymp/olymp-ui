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
    ({ theme, basic, fluid, compact }) => ({
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      marginTop: theme.space3,
      marginBottom: theme.space3,
      borderBottom: !!basic && `1px solid ${theme.dark4}`,
      justifyContent: fluid && 'space-between',
      extend: [
        {
          condition: compact,
          style: {
            marginTop: theme.space2
          }
        }
      ]
    }),
    ({
      className,
      children,
      activeIndex,
      setActiveInnerIndex,
      activeTab,
      color = true,
      palette,
      basic,
      compact,
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
                    onClick: e => {
                      if (onChange) {
                        onChange(e, child);
                      } else {
                        setActiveInnerIndex(i);
                      }
                      if (get(child, 'props.onClick')) {
                        child.props.onClick(e);
                      }
                    },
                    color,
                    palette,
                    basic,
                    compact
                  })
                : child
          )}
        </div>
        {get(activeTab, 'props.children')}
      </div>
    ),
    ({ activeInnerIndex, fluid, ...p }) => Object.keys(p)
  )
);
Tabs.displayName = 'Tabs';

const Tab = createComponent(
  ({ theme, active, right, color, palette, basic, compact }) => ({
    display: 'flex',
    color: !!active && (!basic ? theme.light : theme.color),
    backgroundColor: !!active && !basic && getColor(theme, color, palette),
    borderBottom:
      !!active && !!basic && `1px solid ${getColor(theme, color, palette)}`,
    paddingY: theme.space2,
    paddingX: theme.space3,
    marginRight: !basic && theme.space2,
    marginLeft: !!right && 'auto',
    marginBottom: -1,
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0
    },
    onHover: {
      backgroundColor:
        active && !basic
          ? getColor(theme, color, (palette || theme.palette) + 1)
          : theme.dark5
    },
    extend: [
      {
        condition: compact,
        style: {
          paddingY: theme.space1,
          paddingX: theme.space2
        }
      }
    ]
  }),
  ({ title, ...p }) => <div {...p}>{title}</div>,
  ({ right, color, active, palette, basic, compact, ...p }) => Object.keys(p)
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
