import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M104 706l792 1015-868-630q-18-13-25-34.5t0-42.5l101-308zm462 0h660l-330 1015zm-198-612l198 612h-462l198-612q8-23 33-23t33 23zm1320 612l101 308q7 21 0 42.5t-25 34.5l-868 630 792-1015zm0 0h-462l198-612q8-23 33-23t33 23z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaGitlab';
export default styled(icon);