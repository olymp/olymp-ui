import { createComponent } from 'react-fela';
import { border } from '../utils';

export default createComponent(
  ({ theme }) => ({
    width: '100%',
    border: 'none',
    borderTop: border(theme, theme.dark4),
  }),
  'hr',
  []
);
