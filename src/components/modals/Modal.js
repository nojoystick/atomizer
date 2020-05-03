/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../../redux/actions';
import useOutsideAlerter from '../../utils/useOutsideAlerter';
import ModalStyles from './ModalStyles';

const Modal = () => {
  const show = useSelector(state => state.network.modalVisible);
  const modal = useSelector(state => state.config.modal);
  const theme = useSelector(state => state.network.theme);
  const modalRef = React.createRef();

  const classes = ModalStyles({ theme: theme, show: show });
  const dispatch = useDispatch();

  const confirm = () => {
    modal.global ? dispatch(modal.func()) : modal.func && modal.func();
    cancel();
  };

  const cancel = () => {
    dispatch(networkActions.setModalVisible(false));
  };

  useOutsideAlerter(modalRef, cancel, show);

  return (
    <>
      <div className={classes.background} />
      <div className={classes.flexContainer}>
        {modal && modal.component && show && <modal.component cancel={cancel} confirm={confirm} ref={modalRef} />}
      </div>
    </>
  );
};

export default Modal;
