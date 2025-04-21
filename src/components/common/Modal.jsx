import React from 'react';
import './Modal.scss';

const Modal = ({ title, message, type = 'success', onConfirm, className }) => {
  return (
    <div className="modal_overlay">
      <div className={`modal_box ${type} ${className || ''}`}>
        {title && <h3>{title}</h3>}
        <div className="modal_message">
          {typeof message === 'string' ? (
            message.split('\n').map((line, i) => (
              <span key={i} className="line">
                {line}
                <br />
              </span>
            ))
          ) : (
            message
          )}
        </div>
        <button onClick={onConfirm}>확인</button>
      </div>
    </div>
  );
};

export default Modal;
