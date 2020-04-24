import React from 'react';
import PlayerStyles from './PlayerStyles';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import { TooltipHelperText } from './player-data';
import { networkActions } from '../../../redux/actions';

const MuteSoloButtons = ({ mute, solo, onMute, onSolo, helpTextEnabled, redux, updateParent }) => {
  const theme = useSelector(state => state.network.theme);
  const classes = PlayerStyles();
  const dispatch = useDispatch();

  const Tooltip = ({ child, childProps, helperText, delay = 1500 }) => (
    <Tippy
      theme={theme && theme.name === 'dark' ? 'light' : null}
      arrow={true}
      placement='right'
      animation='scale'
      delay={[delay, 0]}
      duration={200}
      content={
        <span className={classes.tooltip}>
          <p className={classes.tooltipText}>{helperText}</p>
        </span>
      }
    >
      {child({ ...childProps })}
    </Tippy>
  );

  const Button = ({ label, alertColor, warningColor, alertActive, warningActive, onClick }) => {
    let color = theme && theme.text;
    if (alertActive) {
      color = alertColor;
    } else if (warningActive) {
      color = warningColor;
    }
    return (
      <button
        key={alertActive + warningActive}
        className={classes.ms}
        style={{ color: color, borderColor: color }}
        onClick={() => (redux ? dispatch(onClick()) : _antiPatternOnClick(onClick))}
      >
        {label}
      </button>
    );
  };

  const _antiPatternOnClick = onClick => {
    onClick();
    updateParent();
    dispatch(networkActions.isSomethingMutedOrSoloed());
  };

  return (
    <>
      {helpTextEnabled ? (
        <>
          <Tooltip
            helperText={TooltipHelperText.mute}
            child={Button}
            childProps={{
              label: 'm',
              alertColor: theme && theme.alertText,
              warningColor: theme && theme.warningText,
              alertActive: mute,
              warningActive: solo,
              onClick: onMute
            }}
          />
          <Tooltip
            helperText={TooltipHelperText.solo}
            child={Button}
            childProps={{
              label: 's',
              alertColor: theme && theme.highlightText,
              alertActive: solo,
              onClick: onSolo
            }}
          />
        </>
      ) : (
        <>
          <Button
            label='m'
            alertColor={theme && theme.alertText}
            alertActive={mute}
            warningColor={theme && theme.warningText}
            warningActive={solo === -1}
            onClick={onMute}
          />
          <Button label='s' alertColor={theme && theme.highlightText} alertActive={solo === 1} onClick={onSolo} />
        </>
      )}
    </>
  );
};

export default MuteSoloButtons;
