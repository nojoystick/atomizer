import React from 'react';
import '../stylesheets/ElementTile.scss';

const ElementTile = ({ nodeData }) => {
  if (!nodeData) {
    return <div className='elementTile' />;
  }
  let { title, label, weight, id, color } = nodeData;
  if (label) {
    label = label.match(/<b>(.*?)<\/b>/g).map(function(val) {
      return val.replace(/<\/?b>/g, '');
    });
  }
  return (
    <>
      <div className='elementTile' style={{ backgroundColor: color }}>
        <h4>{title}</h4>
        <h4>{id}</h4>
        <h1>{label}</h1>
        <h4>{weight}</h4>
      </div>
    </>
  );
};

export default ElementTile;
