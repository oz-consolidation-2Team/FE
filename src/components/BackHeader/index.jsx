import React from 'react';
import './BackHeader.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="back_header">
      <div className="inner">
        <button className="back_button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span className="back_text">뒤로가기</span>
        </button>
        <img
          src="/logo.png"
          alt="시니어내일 로고"
          className="logo_img"
          onClick={() => navigate('/')}
        />
      </div>
    </header>
  );
};

export default BackHeader;
