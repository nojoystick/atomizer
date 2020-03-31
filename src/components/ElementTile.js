import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

const ElementTile = ({ nodeData, style }) => {
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    elementTile: {
      backgroundColor: nodeData
        ? nodeData.color.background
          ? nodeData.color.background
          : nodeData.color
        : theme && theme.background,
      border: `2px solid ${theme && theme.text}`,
      width: '100px',
      height: '100px',
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      '& h1:hover, h4:hover': {
        opacity: '1.0'
      }
    }
  });
  const classes = useStyles();

  if (!nodeData) {
    return <div className='elementTile' />;
  }

  const { title, dropdownLabel, weight, atomicNumber } = nodeData;

  return (
    <>
      <div className={classes.elementTile} style={style}>
        <h4>{title}</h4>
        <h4>{atomicNumber}</h4>
        <h1>{dropdownLabel}</h1>
        <h4>{weight}</h4>
      </div>
    </>
  );
};

export default ElementTile;
