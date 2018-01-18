import React from 'react';
import { ThemeProvider } from 'react-fela';
import colors from './material-colors';

const getTheme = (theme = {}) => ({
  colorMaterial: colors.map(color => color.palette),
  ...theme
});

export default ({ theme, children }) => (
  <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
);
