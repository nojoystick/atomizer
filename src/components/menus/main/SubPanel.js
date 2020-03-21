import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const SubPanel = ({ data }) => {
  const theme = useSelector(state => state.network.theme);
  const vertical = data.sliderFields.length === 1;
  const sliderClassName = vertical ? 'slider vertical' : 'slider';
  const toggleClassName = vertical ? 'toggleParent vertical' : 'toggleParent';

  const useStyles = makeStyles({
    subPanel: {
      boxSizing: 'border-box',
      display: 'inline-block',
      border: `2px solid ${theme.text}`,
      width: '285px',
      minWidth: '285px',
      height: '470px',
      margin: '15px',
      backgroundColor: theme.background
    },
    titleHeader: {
      fontSize: '20px',
      padding: '10px 20px 0px 20px',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      color: theme.text,
      zIndex: '2',
      position: 'relative',
      verticalAlign: 'bottom'
    },
    subtitle: {
      display: 'block',
      fontStyle: 'italic',
      fontWeight: '200',
      fontSize: '0.8em',
      marginLeft: '20px'
    },
    sliderLabel: {
      display: 'block',
      fontFamily: 'Roboto Condensed',
      color: theme.text
    },
    vertical: {
      textAlign: 'center',
      width: '80%',
      marginBottom: '5px'
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.subPanel}>
      <div className={classes.titleHeader}>
        <h3>{data.title}</h3>
        <h4 className={classes.subtitle}>{data.subtitle}</h4>
      </div>
      <div className='sliderParent'>
        {data.sliderFields.map((slider, index) => {
          return (
            <div className='sliderContainer' key={index}>
              <label className={`${classes.sliderLabel} ${vertical ? classes.vertical : null}`}>{slider.label}</label>
              <input
                className={sliderClassName}
                type='range'
                min={slider.min ? slider.min : 0}
                max={slider.max ? slider.max : 128}
              />
            </div>
          );
        })}
      </div>
      <div className={toggleClassName}>
        {data.toggleFields.map((button, index) => {
          return (
            <div className='toggleContainer' key={index}>
              <label className={classes.sliderLabel}>{button.label}</label>
              <label className='switch'>
                <input type='checkbox' />
                <span className='toggleSlider'></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubPanel;
