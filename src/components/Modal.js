/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import '../stylesheets/Modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';

const Modal = () => {
  const show = useSelector(state => state.network.modalVisible);
  const { header, message, func } = useSelector(state => state.config.modal);
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(func());
    dispatch(networkActions.setModalVisible(false));
  };

  return (
    <>
      <div
        className='background'
        style={show ? { visibility: 'visible', opacity: '0.6', transition: '1s' } : { opacity: '0.0' }}
      />
      <div
        className='flexContainer'
        style={show ? { visibility: 'visible', opacity: '1.0' } : { opacity: '0.0' }}
        onClick={() => dispatch(networkActions.setModalVisible(false))}
      >
        <div className='content'>
          <h3 className='header'>{header}</h3>
          {message && message[0] && (
            <p className='text'>
              {message[0]}
              {selectedNodes && selectedNodes.length}
              {message[1]}
            </p>
          )}
          <div className='buttonContainer'>
            <button className='cancelButton' onClick={() => dispatch(networkActions.setModalVisible(false))}>
              cancel
            </button>
            <button className='confirmButton' onClick={() => confirm()}>
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
