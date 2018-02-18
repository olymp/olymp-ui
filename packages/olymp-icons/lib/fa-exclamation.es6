import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 1248v224q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-224q0-26 19-45t45-19h256q26 0 45 19t19 45zm30-1056l-28 768q-1 26-20.5 45t-45.5 19h-256q-26 0-45.5-19t-20.5-45l-28-768q-1-26 17.5-45t44.5-19h320q26 0 44.5 19t17.5 45z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaExclamation';
export default styled(icon);