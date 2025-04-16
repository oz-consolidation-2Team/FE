import React, { useState } from 'react';
import FindUserPassword from './FindUserPassword';
import FindCompanyPassword from './FindCompanyPassword';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import './FindPasswordPage.scss';

const FindPasswordPage = () => {
  const [type, setType] = useState(null);

  const renderSelection = () => (
    <div className="findpassword_select_box">
      <div className="findpassword_title">
        <RiLockPasswordLine className="icon" />
        <h2>비밀번호 찾기</h2>
      </div>
      <p className="findpassword_subtitle">가입 유형을 선택해주세요.</p>

      <div className="findpassword_card_area">
        <div
          className="findpassword_card orange"
          onClick={() => setType('user')}
          role="button"
          tabIndex={0}
        >
          <FaUser className="card_icon" />
          <strong>개인 회원</strong>
          <p>가입 시 입력한 정보로<br />비밀번호를 찾을 수 있어요</p>
        </div>
        <div
          className="findpassword_card green"
          onClick={() => setType('company')}
          role="button"
          tabIndex={0}
        >
          <FaBuilding className="card_icon" />
          <strong>기업 회원</strong>
          <p>사업자 정보를 통해<br />비밀번호를 찾을 수 있어요</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="findpassword_container">
      {type === 'user' && <FindUserPassword onBack={() => setType(null)} />}
      {type === 'company' && <FindCompanyPassword onBack={() => setType(null)} />}
      {!type && renderSelection()}
    </div>
  );
};

export default FindPasswordPage;

