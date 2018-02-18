import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 0q185 0 316.5 93.5t131.5 226.5v896q0 130-125.5 222t-305.5 97l213 202q16 15 8 35t-30 20h-1056q-22 0-30-20t8-35l213-202q-180-5-305.5-97t-125.5-222v-896q0-133 131.5-226.5t316.5-93.5h640zm-800 1312q66 0 113-47t47-113-47-113-113-47-113 47-47 113 47 113 113 47zm416-544v-512h-544v512h544zm544 544q66 0 113-47t47-113-47-113-113-47-113 47-47 113 47 113 113 47zm160-544v-512h-576v512h576z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaSubway';
export default styled(icon);