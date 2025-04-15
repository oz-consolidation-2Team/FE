import React from 'react';
import './Modal.scss';

const Modal = ({ title, message, type = 'success', onConfirm }) => {
  return (
    <div className="modal_overlay">
      <div className={`modal_box ${type}`}>
        <h3>{title}</h3>
        <p>
          {message.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <button onClick={onConfirm}>확인</button>
      </div>
    </div>
  );
};

export default Modal;
