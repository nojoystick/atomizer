import React from 'react';

const Icon = ({
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  height = '100%',
  viewBox = '0 0 32 32',
  path
}) => 
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
      <path d={path} fill={fill} />
  </svg>;

  export default Icon;