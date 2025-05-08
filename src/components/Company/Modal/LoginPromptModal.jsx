import React from 'react';
import "../styles/modal/LoginPromptModal.scss";

const LoginPromptModal = ({ onClose, navigate }) => {
  return (
    <div className="modal_overlay">
    <div className="modal_box">
      <p><strong>로그인 후 이용해주세요.</strong></p>
       <div className="modal_buttons">
        <button className="modal_confirm" onClick={() => navigate('/login')}>로그인하러 가기</button>
        <button className="modal_cancel" onClick={onClose}>닫기</button>
       </div>
    </div>
    </div>
  );
};

export default LoginPromptModal;