import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M448 0q26 0 45 19t19 45v891l536-429q17-14 40-14 26 0 45 19t19 45v379l536-429q17-14 40-14 26 0 45 19t19 45v1152q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-1664q0-26 19-45t45-19h384z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaIndustry';
export default styled(icon);