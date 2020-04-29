import React from 'react';
import PlayerStyles from './PlayerStyles';
import { useDispatch, useSelector } from 'react-redux';
import { networkActions } from '../../../redux/actions';

const MuteSoloButtons = ({ mute, solo, onMute, onSolo, redux, updateParent }) => {
  const theme = useSelector(state => state.network.theme);
  const classes = PlayerStyles();
  const dispatch = useDispatch();

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
      <>
        <Button
          label='m'
          alertColor={theme && theme.alertText}
          alertActive={mute}
          warningColor={theme && theme.warningText}
          warningActive={solo === -1}
          onClick={onMute}
        />
        <Button label='s' alertColor={theme && theme.highlightText} alertActive={solo} onClick={onSolo} />
      </>
    </>
  );
};

export default MuteSoloButtons;
