import { compose, withPropsOnChange } from 'recompose';
import { withTheme } from 'react-fela';
import { getColor } from '../colors-provider';

const enhance = compose(
  withTheme,
  withPropsOnChange(
    ['theme', 'inverted', 'color', 'collapsed', 'width'],
    ({
      theme,
      inverted,
      color = '#F4F5F7',
      palette,
      collapsed = false,
      width = 240
    }) => ({
      theme: {
        // inverted: inverted === undefined ? color === true : inverted,
        inverted,
        collapsed,
        width
      },
      color: getColor(theme, color, palette)
    })
  )
);
export default enhance;
