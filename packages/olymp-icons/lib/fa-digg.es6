import React from 'react';
import styled from '../styled';

const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest}  viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M328 282h204v983h-532v-697h328v-286zm0 819v-369h-123v369h123zm286-533v697h205v-697h-205zm0-286v204h205v-204h-205zm287 286h533v942h-533v-163h328v-82h-328v-697zm328 533v-369h-123v369h123zm287-533h532v942h-532v-163h327v-82h-327v-697zm327 533v-369h-123v369h123z" /></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaDigg';
export default styled(icon);