import React from 'react';

const Icon = ({ style = {}, fill = '#000', width = '100%', className = '', height = '100%', viewBox = '0 0 32 32', path}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    {typeof path === 'string' ? 
        <path d={path} fill={fill} /> :
        Array.isArray(path) ?
          path.map((d, index) => {
            return <path d={d} fill={fill} key={index} />
          })
        :
        <>
          <path d={path.path} fill={fill}/>
          {path.rect && path.rect.map((rect, index) => {
            return <rect x={rect.x} y={rect.y} transform={rect.transform} width={rect.width} height={rect.height} key={index} />
          })}
       </>
    }

  </svg>
);

export default Icon;
