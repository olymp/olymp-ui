import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M45 1651q-19 19-32 13t-13-32v-1472q0-26 13-32t32 13l710 710q9 9 13 19v-710q0-26 13-32t32 13l710 710q9 9 13 19v-678q0-26 19-45t45-19h128q26 0 45 19t19 45v1408q0 26-19 45t-45 19h-128q-26 0-45-19t-19-45v-678q-4 10-13 19l-710 710q-19 19-32 13t-13-32v-710q-4 10-13 19z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaFastForward';
export default styled(icon);