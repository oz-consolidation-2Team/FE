import React from 'react';
import "../styles/modal/JobApplyModal.scss";

const LoginPromptModal = ({ onClose, navigate }) => {
  return (
    <div className="modal_overlay">
      <div className="div_box">
        <button className="close_button" onClick={onClose}>×</button>
        <p><strong>로그인 후 이용해주세요.</strong></p>
        <div className="buttons">
          <button className="confirm" onClick={() => navigate('/login')}>로그인하러 가기</button>
          <button className="cancel" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;