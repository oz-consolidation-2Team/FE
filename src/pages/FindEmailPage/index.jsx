import React, { useState } from 'react';
import FindUserEmailPage from './FindUserEmailPage';
import FindCompanyEmailPage from './FindCompanyEmailPage';
import { FaUser, FaBuilding } from 'react-icons/fa';
import './FindEmailPage.scss';

const FindEmailPage = () => {
  const [type, setType] = useState(null);

  return (
    <div className="findemail_container">
      {!type ? (
        <div className="findemail_select_box">
          <h2 className="findemail_title">이메일 찾기</h2>
          <p className="findemail_subtitle">가입 유형을 선택해주세요.</p>

          <div className="findemail_card_area">
            <div className="findemail_card orange" onClick={() => setType('user')}>
              <FaUser className="card_icon" />
              <strong>개인 회원</strong>
              <p>가입 시 입력한 정보로<br />이메일을 찾을 수 있어요</p>
            </div>
            <div className="findemail_card green" onClick={() => setType('company')}>
              <FaBuilding className="card_icon" />
              <strong>기업 회원</strong>
              <p>사업자 정보를 통해<br />이메일을 찾을 수 있어요</p>
            </div>
          </div>
        </div>
      ) : type === 'user' ? (
        <FindUserEmailPage onBack={() => setType(null)} />
      ) : (
        <FindCompanyEmailPage onBack={() => setType(null)} />
      )}
    </div>
  );
};

export default FindEmailPage;
