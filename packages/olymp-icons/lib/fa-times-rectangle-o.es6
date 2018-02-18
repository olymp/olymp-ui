import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1257 1111l-146 146q-10 10-23 10t-23-10l-169-169-169 169q-10 10-23 10t-23-10l-146-146q-10-10-10-23t10-23l169-169-169-169q-10-10-10-23t10-23l146-146q10-10 23-10t23 10l169 169 169-169q10-10 23-10t23 10l146 146q10 10 10 23t-10 23l-169 169 169 169q10 10 10 23t-10 23zm-1001 297h1280v-1024h-1280v1024zm1536-1120v1216q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaTimesRectangleO';
export default styled(icon);