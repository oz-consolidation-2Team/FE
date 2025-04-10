import React from 'react';
import './BackHeader.scss';
import { FaArrowLeft } from 'react-icons/fa';

const BackHeader = ({ onBack }) => {
  return (
    <header className="back_header">
      <div className="inner">
        <button className="back_button" onClick={onBack}>
          <FaArrowLeft />
          <span className="back_text">뒤로가기</span>
        </button>
        <img
          src="/logo.png"
          alt="시니어내일 로고"
          className="logo_img"
          onClick={() => (window.location.href = '/')}
        />
      </div>
    </header>
  );
};

export default BackHeader;
