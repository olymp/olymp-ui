import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1086 316q145 72 233.5 210.5t88.5 305.5q0 221-147.5 384.5t-364.5 187.5v132h96q14 0 23 9t9 23v64q0 14-9 23t-23 9h-96v96q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-96h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h96v-132q-217-24-364.5-187.5t-147.5-384.5q0-167 88.5-305.5t233.5-210.5q-165-96-228-273-6-16 3.5-29.5t26.5-13.5h69q21 0 29 20 44 106 140 171t214 65 214-65 140-171q8-20 37-20h61q17 0 26.5 13.5t3.5 29.5q-63 177-228 273zm-254 964q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaMercury';
export default styled(icon);