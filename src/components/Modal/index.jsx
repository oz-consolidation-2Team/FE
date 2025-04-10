import React from 'react';
import './Modal.scss';

const Modal = ({ title, message, onConfirm, onCancel, confirmText = '확인', cancelText = '취소', type = 'success' }) => {
  return (
    <div className={`modal_overlay ${type}`}>
      <div className="modal_container">
        {title && <h3 className="modal_title">{title}</h3>}
        <p className="modal_message">{message}</p>
        <div className="modal_buttons">
          {onCancel && (
            <button className="modal_button cancel" onClick={onCancel}>{cancelText}</button>
          )}
          <button className={`modal_button confirm ${type}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;