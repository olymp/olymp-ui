import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M403 218h691l-26 72h-665q-110 0-188.5 79t-78.5 189v771q0 95 60.5 169.5t153.5 93.5q23 5 98 5v72h-45q-140 0-239.5-100t-99.5-240v-771q0-140 99.5-240t239.5-100zm851-218h247l-482 1294q-23 61-40.5 103.5t-45 98-54 93.5-64.5 78.5-79.5 65-95.5 41-116 18.5v-195q163-26 220-182 20-52 20-105 0-54-20-106l-285-733h228l187 585zm474 558v1111h-795q37-55 45-73h678v-1038q0-85-49.5-155t-129.5-99l25-67q101 34 163.5 123.5t62.5 197.5z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaYoast';
export default styled(icon);