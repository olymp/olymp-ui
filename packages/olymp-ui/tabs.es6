import React, { Children, cloneElement } from 'react';
import { createComponent } from 'react-fela';
import { getColor } from 'olymp-ui';
import { get } from 'lodash';
import { withState, compose, withPropsOnChange } from 'recompose';

const enhance = compose(
  withState('activeInnerIndex', 'setActiveInnerIndex', 0),
  withPropsOnChange(
    ['activeIndex', 'activeInnerIndex'],
    ({ activeIndex, activeInnerIndex }) => ({
      activeIndex:
        activeIndex !== undefined ? parseInt(activeIndex, 10) : activeInnerIndex
    })
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
      borderBottom: !!basic && `2px solid ${theme.dark4}`,
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
      innerStyle,
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
        {Children.map(
          children,
          (child, i) =>
            child ? (
              <Content visible={i === activeIndex} innerStyle={innerStyle}>
                {get(child, 'props.children', null)}
              </Content>
            ) : (
              child
            )
        )}
      </div>
    ),
    ({ activeInnerIndex, fluid, ...p }) => Object.keys(p)
  )
);
Tabs.displayName = 'Tabs';

const Tab = createComponent(
  ({ theme, active, right, color, palette, basic, compact }) => ({
    display: 'flex',
    color: !!active && (!basic ? theme.light : getColor(theme, color, palette)),
    backgroundColor: !!active && !basic && getColor(theme, color, palette),
    borderBottom:
      !!active && !!basic && `2px solid ${getColor(theme, color, palette)}`,
    paddingY: theme.space2,
    paddingX: theme.space3,
    marginRight: !basic && theme.space2,
    marginLeft: !!right && 'auto',
    marginBottom: !!basic && -2,
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

const Content = createComponent(
  ({ theme, visible, innerStyle = {} }) => ({
    display: !visible && 'none',
    ...innerStyle(theme)
  }),
  'div',
  ({ visible, innerStyle, ...p }) => Object.keys(p)
);
Group.displayName = 'TabsContent';

Tabs.Tab = Tab;
Tabs.Group = Group;
export default Tabs;
