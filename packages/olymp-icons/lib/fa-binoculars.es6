import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M704 320v768q0 26-19 45t-45 19v576q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-512l249-873q7-23 31-23h424zm320 0v704h-256v-704h256zm768 896v512q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-576q-26 0-45-19t-19-45v-768h424q24 0 31 23zm-1056-1184v224h-352v-224q0-14 9-23t23-9h288q14 0 23 9t9 23zm672 0v224h-352v-224q0-14 9-23t23-9h288q14 0 23 9t9 23z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaBinoculars';
export default styled(icon);