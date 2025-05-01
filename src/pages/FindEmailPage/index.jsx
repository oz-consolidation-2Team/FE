import React, { useState } from 'react';
import FindUserEmailPage from './FindUserEmailPage';
import FindCompanyEmailPage from './FindCompanyEmailPage';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { RiMailSendLine } from 'react-icons/ri';
import './FindEmailPage.scss';

const FindEmailPage = () => {
  const [type, setType] = useState(null);

  const renderSelection = () => (
    <div className="findemail_select_box">
      <div className="findemail_title">
        <RiMailSendLine className="icon" />
        <h2>이메일 찾기</h2>
      </div>
      <p className="findemail_subtitle">가입 유형을 선택해주세요.</p>

      <div className="findemail_card_area">
        <div
          className="findemail_card green"
          onClick={() => setType('user')}
          role="button"
          tabIndex={0}
        >
          <FaUser className="card_icon" />
          <strong>개인 회원</strong>
          <p>가입 시 입력한 정보로<br />이메일을 찾을 수 있어요</p>
        </div>
        <div
          className="findemail_card orange"
          onClick={() => setType('company')}
          role="button"
          tabIndex={0}
        >
          <FaBuilding className="card_icon" />
          <strong>기업 회원</strong>
          <p>사업자 정보를 통해<br />이메일을 찾을 수 있어요</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="findemail_container">
      {type === 'user' && <FindUserEmailPage onBack={() => setType(null)} />}
      {type === 'company' && <FindCompanyEmailPage onBack={() => setType(null)} />}
      {!type && renderSelection()}
    </div>
  );
};

export default FindEmailPage;
