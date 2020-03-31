import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import Grayscale from '../constants/grayscale';

const LoadingScreen = ({ show }) => {
  const [fill, setFill] = useState(0);
  const [fillTimer, setFillTimer] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    let t;
    let index = fill;
    let isInc = true; // increment or decrement
    const updateFill = () => {
      if (index < Grayscale.length && index >= 0) {
        index = isInc ? index + 2 : index - 2;
        setFill(index);
      }
      if (index === 0) {
        isInc = true;
      }
      if (index === Grayscale.length - 1) {
        isInc = false;
      }
    };
    if (show) {
      t = setInterval(updateFill, 50);
      setFillTimer(t);
    } else {
      clearInterval(fillTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div className={classes.loadingContainer} style={{ opacity: show ? '1.0' : '0.0' }}>
      <Icon
        path={IconSet.fit}
        className={classes.loading}
        fill={Grayscale[fill]}
        viewBox='0 0 68 68'
        style={{ opacity: show ? '1.0' : '0.0' }}
      />
    </div>
  );
};

const useStyles = makeStyles({
  loadingContainer: {
    zIndex: '9999',
    pointerEvents: 'none',
    interactible: 'false',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    transition: 'opacity 2s'
  },
  loading: {
    width: '400px',
    height: '400px',
    margin: 'auto',
    transition: 'opacity 0.5s'
  }
});

export default LoadingScreen;
