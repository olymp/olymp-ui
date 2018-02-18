import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 512v839q0 48-49 62-174 52-338 52-73 0-215.5-29.5t-227.5-29.5q-164 0-370 48v338h-160v-1368q-63-25-101-81t-38-124q0-91 64-155t155-64 155 64 64 155q0 68-38 124t-101 81v68q190-44 343-44 99 0 198 15 14 2 111.5 22.5t149.5 20.5q77 0 165-18 11-2 80-21t89-19q26 0 45 19t19 45z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaFa';
export default styled(icon);