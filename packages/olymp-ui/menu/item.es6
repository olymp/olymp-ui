import React from 'react';
import { createComponent } from 'react-fela';
import { Icon } from 'antd';
import tinycolor from 'tinycolor2';
import Image from './image';

const LoaderContainer = createComponent(
  ({ theme }) => ({
    width: 14,
    '> i.anticon': {
      color: theme.color
    }
  }),
  'div'
);

const Content = createComponent(
  ({ theme, ellipsis = true, inverted }) => ({
    ellipsis,
    flexGrow: 1,
    opacity: theme.collapsed ? 0 : 1,
    transition: 'opacity 200ms ease-out',
    overflowY: 'hidden',
    '> small': {
      display: 'block',
      marginTop: `-${theme.space1}`,
      color: (inverted !== undefined ? inverted : theme.inverted)
        ? theme.light2
        : theme.dark2
    }
  }),
  'div',
  ({ ellipsis, inverted, ...props }) => Object.keys(props)
);

export default createComponent(
  ({
    theme,
    large,
    small,
    active,
    icon,
    onClick,
    color,
    disabled,
    ellipsis,
    inverted = !!color
  }) => {
    const bgColor = (color === true && theme.color) || theme[color] || color;
    const alpha = tinycolor(bgColor).getAlpha();
    const hoverColor = !bgColor
      ? theme.dark4
      : (alpha === 1 &&
          tinycolor(bgColor)
            .darken()
            .toString()) ||
        tinycolor(bgColor)
          .setAlpha(alpha * 1.5)
          .toString();

    return {
      height: ellipsis === false ? undefined : large ? 54 : small ? 32 : 40,
      flexShrink: 0,
      width: !theme.collapsed ? '100%' : large ? 54 : small ? 32 : 40,
      marginLeft: theme.collapsed && !large && 7,
      paddingLeft: !icon && theme.space3,
      paddingRight: !icon && theme.space2,
      display: 'flex',
      alignItems: 'center',
      cursor: !!onClick && !disabled && 'pointer',
      borderRadius: theme.collapsed ? '50%' : theme.borderRadius,
      opacity: disabled ? 0.67 : 1,
      backgroundColor:
        (bgColor && active && hoverColor) || bgColor || (active && theme.dark5),
      color: !!inverted && theme.light,
      marginY: theme.space1,
      userSelect: 'none',
      onHover: {
        backgroundColor: !!onClick && !disabled && hoverColor
      }
    };
  },
  ({
    large,
    children,
    subtitle,
    icon,
    extra,
    _ref,
    innerRef,
    ref,
    color,
    loading,
    onClick,
    disabled,
    ellipsis,
    inverted = !!color,
    className,
    ...rest
  }) => (
    <div
      {...rest}
      onClick={disabled ? () => {} : onClick}
      ref={_ref || innerRef || ref}
      className={className}
    >
      {!!icon && <Image large={large}>{icon}</Image>}
      <Content ellipsis={ellipsis} inverted={inverted}>
        {children}
        {!!subtitle && <small>{subtitle}</small>}
      </Content>
      {!!extra &&
        !loading && (
          <Image extra inverted={inverted}>
            {extra}
          </Image>
        )}
      {loading && (
        <Image extra inverted={inverted}>
          <LoaderContainer>
            <Icon type="loading" />
          </LoaderContainer>
        </Image>
      )}
    </div>
  ),
  ({ active, small, ...p }) => Object.keys(p)
);
