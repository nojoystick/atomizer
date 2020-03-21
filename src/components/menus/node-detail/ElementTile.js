import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

const ElementTile = ({ nodeData }) => {
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    elementTile: {
      backgroundColor: nodeData ? nodeData.options.color.background : theme.background,
      border: `2px solid ${theme.text}`,
      width: '100px',
      height: '100px',
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
    }
  });
  const classes = useStyles();

  if (!nodeData) {
    return <div className='elementTile' />;
  }

  const { title, dropdownLabel, weight, atomicNumber } = nodeData.options;

  return (
    <>
      <div className={classes.elementTile}>
        <h4>{title}</h4>
        <h4>{atomicNumber}</h4>
        <h1>{dropdownLabel}</h1>
        <h4>{weight}</h4>
      </div>
    </>
  );
};

export default ElementTile;
