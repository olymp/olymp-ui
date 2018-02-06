import { compose, withPropsOnChange } from 'recompose';
import { withTheme } from 'react-fela';
import { getColor } from '../colors-provider';

const enhance = compose(
  withTheme,
  withPropsOnChange(
    ['theme', 'inverted', 'color', 'collapsed'],
    ({
      theme,
      inverted,
      color = '#F4F5F7',
      palette,
      collapsed,
    }) => ({
      theme: {
        // inverted: inverted === undefined ? color === true : inverted,
        inverted: inverted !== undefined ? inverted : theme.inverted,
        collapsed: (collapsed !== undefined ? collapsed : theme.collapsed) || false,
      },
      color: getColor(theme, color, palette)
    })
  )
);
export default enhance;
