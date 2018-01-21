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
    () => ({
      display: 'flex',
      width: '100%'
    }),
    ({
      className,
      children,
      activeIndex,
      setActiveInnerIndex,
      activeTab,
      color,
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

const Tab = createComponent(
  ({ theme, active, right, color, palette }) => ({
    display: 'flex',
    color: !!active && theme.light,
    backgroundColor: !!active && getColor(theme, color, palette),
    paddingY: theme.space2,
    paddingX: theme.space3,
    marginRight: theme.space2,
    marginLeft: !!right && 'auto',
    marginY: theme.space3,
    cursor: 'pointer',
    onHover: {
      backgroundColor: active
        ? getColor(theme, color, (palette || theme.palette) + 1)
        : theme.dark5
    }
  }),
  ({ title, action, onAction, active, ...p }) => (
    <div {...p}>
      {title}
      {!!action && !!active && <Icon onClick={onAction}>{action}</Icon>}
    </div>
  ),
  ({ right, ...p }) => Object.keys(p)
);

const Icon = createComponent(
  ({ theme, onClick }) => ({
    marginLeft: theme.space3,
    onHover: {
      opacity: !!onClick && 0.8
    }
  }),
  ({ className, children, ...p }) => (
    <div className={className}>
      {Children.map(
        children,
        ({ onClick, ...child }) =>
          child
            ? cloneElement(child, {
                size: 12,
                color: 'light',
                onClick: onClick
                  ? e => {
                      e.stopPropagation();
                      onClick(e);
                    }
                  : () => {},
                ...p
              })
            : child
      )}
    </div>
  ),
  p => Object.keys(p)
);

Tabs.Tab = Tab;
export default Tabs;
