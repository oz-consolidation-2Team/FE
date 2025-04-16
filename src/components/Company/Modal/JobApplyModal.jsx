import React from 'react';
import './JobApplyModal.scss';

const JobApplyModal = ({ onClose, onApply, onEditResume }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p><strong>지원 시 기업 담당자 이메일로</strong></p>
        <p><strong>이력서가 발송됩니다.</strong></p>
        <div className="modal-buttons">
          <button className="confirm" onClick={onApply}>지원하기</button>
          <button className="cancel" onClick={onEditResume}>이력서 수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default JobApplyModal;