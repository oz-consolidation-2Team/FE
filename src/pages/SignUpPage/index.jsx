import React, { useState } from 'react';
import './SignUpPage.scss';
import UserSignUpPage from './UserSignUpPage';
import CompanySignPage from './CompanySignPage';
import { FaUser, FaBuilding } from 'react-icons/fa';
import BackHeader from '../../components/BackHeader';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  const isForm = type === 'user' || type === 'company';

  // 뒤로가기 핸들링
  const handleBack = () => {
    if (type === null) {
      navigate(-1); // 브라우저 뒤로가기
    } else {
      setType(null); // 유형 선택 페이지로
    }
  };

  return (
    <>
      <BackHeader onBack={handleBack} />
      <div className="signup_fade_wrap">
        {!isForm && (
          <div className="type_select active">
            <h2 className="title">회원가입</h2>
            <p className="subtitle">가입하실 회원 유형을 선택해주세요.</p>
            <div className="card_grid">
              <button
                type="button"
                className="select_card user"
                onClick={() => setType('user')}
              >
                <FaUser className="icon" />
                <h3>개인 회원</h3>
                <p>일자리를 찾는<br />사람들을 위한 가입</p>
              </button>

              <button
                type="button"
                className="select_card company"
                onClick={() => setType('company')}
              >
                <FaBuilding className="icon" />
                <h3>기업 회원</h3>
                <p>일 할 사람을 찾는<br />회사의 가입</p>
              </button>
            </div>
          </div>
        )}

        {isForm && (
          <div className="form_card active">
            {type === 'user' ? <UserSignUpPage /> : <CompanySignPage />}
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
