import React from 'react';
import '../stylesheets/Modal.scss'

const Modal = ({modalInfo, header, message, setShow}) => {
  const {show, numItems, props, func} = modalInfo;

  const confirm = () => {
    func(props);
    setShow(false);
  }

  return(
    <>
    <div className="background" style={show ? {visibility: 'visible', opacity: '0.6', transition: '1s'}: {opacity: '0.0'}} />
    <div className="flexContainer" style={show ? {visibility: 'visible', opacity: '1.0'}: {opacity: '0.0'}} onClick={() => setShow(false)}>
      <div className="content">
          <h3 className="header">{header}</h3>
          {message && message[0] && <p className="text">{message[0]}{numItems}{message[1]}</p>}
          <div className="buttonContainer">
            <button className="cancelButton" onClick={() => setShow(false)}>cancel</button>
            <button className="confirmButton" onClick={() => confirm()}>confirm</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Modal;