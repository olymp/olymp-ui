import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} width="2304" viewBox="0 0 2304 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1975 990h-138q14-37 66-179l3-9q4-10 10-26t9-26l12 55zm-1444-65l-58-295q-11-54-75-54h-268l-2 13q311 79 403 336zm179-349l-162 438-17-89q-26-70-85-129.5t-131-88.5l135 510h175l261-641h-176zm139 642h166l104-642h-166zm768-626q-69-27-149-27-123 0-201 59t-79 153q-1 102 145 174 48 23 67 41t19 39q0 30-30 46t-69 16q-86 0-156-33l-22-11-23 144q74 34 185 34 130 1 208.5-59t80.5-160q0-106-140-174-49-25-71-42t-22-38q0-22 24.5-38.5t70.5-16.5q70-1 124 24l15 8zm425-16h-128q-65 0-87 54l-246 588h174l35-96h212q5 22 20 96h154zm262-320v1280q0 52-38 90t-90 38h-2048q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h2048q52 0 90 38t38 90z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaCcVisa';
export default styled(icon);