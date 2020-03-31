/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';
import { useModalHotkeys } from '../utils/hotkeys';
import ModalStyles from './ModalStyles';

const Modal = () => {
  const show = useSelector(state => state.network.modalVisible);
  const { header, message, func } = useSelector(state => state.config.modal);
  const { theme, selectedNodes } = useSelector(state => state.network);

  const classes = ModalStyles({ theme: theme, show: show });
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
