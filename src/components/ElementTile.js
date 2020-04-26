import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import elements from '../constants/elements';

const ElementTile = ({ style }) => {
  const theme = useSelector(state => state.network.theme);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const [elementList] = useState(elements(theme));
  const [element, setElement] = useState(elementList[elementIndex - 1]);

  useEffect(() => {
    setElement(elementList[elementIndex - 1]);
  }, [element, elementIndex, elementList]);

  const useStyles = makeStyles({
    elementTile: {
      backgroundColor: element
        ? element.color.background
          ? element.color.background
          : element.color
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

  if (!element) {
    return <div className='elementTile' />;
  }

  const { title, dropdownLabel, weight, atomicNumber } = element;

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
