import React from 'react';
import '../../../stylesheets/ElementTile.scss';

const ElementTile = ({ nodeData }) => {
  if (!nodeData) {
    return <div className='elementTile' />;
  }
  let { title, dropdownLabel, weight, id, color } = nodeData;

  return (
    <>
      <div className='elementTile' style={{ backgroundColor: color }}>
        <h4>{title}</h4>
        <h4>{id}</h4>
        <h1>{dropdownLabel}</h1>
        <h4>{weight}</h4>
      </div>
    </>
  );
};

export default ElementTile;
