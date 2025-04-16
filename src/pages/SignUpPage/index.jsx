import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSignUpPage from './UserSignUpPage';
import CompanySignUpPage from './CompanySignUpPage';
import { FaUser, FaBuilding } from 'react-icons/fa';
import BackHeader from '@/components/BackHeader';
import './SignUpPage.scss';

const SignUpPage = () => {
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    if (type === null) {
      navigate(-1); // 👉 유형 선택 중이면 뒤로가기
    } else {
      setType(null); // 👉 개인/기업 폼 중이면 유형 선택으로 돌아가기
    }
  };

  return (
    <>
      <BackHeader showBack onBack={handleBack} />
      <div className="signup_container">
        {!type && (
          <div className="type_select_box">
            <h2 className="title">회원가입</h2>
            <p className="subtitle">가입하실 회원 유형을 선택해주세요.</p>

            <div className="card_select_area">
              <div className="type_card orange" onClick={() => setType('user')}>
                <FaUser className="card_icon" />
                <strong>개인 회원</strong>
                <p>일자리를 찾는<br />사람들을 위한 가입</p>
              </div>

              <div className="type_card green" onClick={() => setType('company')}>
                <FaBuilding className="card_icon" />
                <strong>기업 회원</strong>
                <p>일 할 사람을 찾는<br />회사의 가입</p>
              </div>
            </div>
          </div>
        )}

        {type === 'user' && <UserSignUpPage onBack={handleBack} />}
        {type === 'company' && <CompanySignUpPage onBack={handleBack} />}
      </div>
    </>
  );
};

export default SignUpPage;
