import React from 'react';

const Icon = ({
  style = {},
  fill = '#000',
  stroke = 'none',
  width = '100%',
  strokeWidth = '0',
  className = '',
  height = '100%',
  viewBox = '0 0 32 32',
  path
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    {typeof path === 'string' && <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />}
    {path &&
      Array.isArray(path) &&
      path.map((d, index) => {
        return <path d={d} fill={fill} stroke={stroke} key={index} strokeWidth={strokeWidth} />;
      })}
    {typeof path === 'object' && typeof path.path === 'string' ? (
      <path d={path.path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    ) : (
      path.path &&
      Array.isArray(path.path) &&
      path.map((d, index) => {
        return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} key={index} />;
      })
    )}
    {path.rect &&
      path.rect.map((rect, index) => {
        return (
          <rect
            fill={fill}
            x={rect.x}
            y={rect.y}
            transform={rect.transform}
            width={rect.width}
            height={rect.height}
            key={index}
          />
        );
      })}
    {path.circle &&
      path.circle.map((circle, index) => {
        return <circle fill={fill} cx={circle.cx} cy={circle.cy} r={circle.r} key={index} />;
      })}
  </svg>
);

export default Icon;
