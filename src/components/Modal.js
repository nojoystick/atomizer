/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';
import { useModalHotkeys } from '../utils/hotkeys';
import { makeStyles } from '@material-ui/styles';

const Modal = () => {
  const show = useSelector(state => state.network.modalVisible);
  const { header, message, func } = useSelector(state => state.config.modal);
  const { theme, selectedNodes } = useSelector(state => state.network);
  const useStyles = makeStyles({
    background: {
      transition: 'opacity 1s, visibility 0s',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      backgroundColor: theme.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9998',
      visibility: show ? 'visible' : 'hidden',
      opacity: show ? '0.6' : '0'
    },
    flexContainer: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9998',
      visibility: show ? 'visible' : 'hidden',
      opacity: show ? '1.0' : '0.0'
    },
    content: {
      width: '350px',
      height: '200px',
      backgroundColor: 'transparent',
      opacity: '1',
      zIndex: '9999',
      margin: 'auto',
      fontSize: '1.2em'
    },
    text: {
      height: '50px',
      backgroundColor: 'transparent'
    },
    buttonContainer: {
      width: '140px',
      float: 'right'
    },
    button: {
      width: '60px',
      height: '30px',
      border: `1.5px solid ${theme.text}`,
      color: theme.text,
      fontFamily: 'inconsolata',
      outline: 'none',
      '&:hover': {
        opacity: '0.4'
      }
    },
    confirmButton: {
      marginLeft: '20px',
      fontWeight: '700',
      backgroundColor: theme.background
    },
    cancelButton: {
      fontWeight: '400',
      backgroundColor: theme.secondary
    }
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(func());
    cancel();
  };

  const cancel = () => {
    dispatch(networkActions.setModalVisible(false));
  };

  useModalHotkeys(confirm, cancel);

  return (
    <>
      <div className={classes.background} />
      <div className={classes.flexContainer} onClick={cancel}>
        <div className={classes.content}>
          <h3>{header}</h3>
          {message && message[0] && (
            <p className={classes.text}>
              {message[0]}
              {selectedNodes && selectedNodes.length}
              {message[1]}
            </p>
          )}
          <div className={classes.buttonContainer}>
            <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
              cancel
            </button>
            <button className={`${classes.button} ${classes.confirmButton}`} onClick={confirm}>
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
