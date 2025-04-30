import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import { FaUser, FaBuilding } from 'react-icons/fa';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import LabeledInput from '@/components/common/LabeledInput';
import './LoginPage.scss';
import { handleUserLogin } from '@/utils/userLogin';
import { handleCompanyLogin } from '@/utils/companyLogin';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
const STATE = 'naver_login_test';
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${STATE}`;

const LoginPage = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('user');
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(null);

  const handleLoginClick = () => {
    if (userType === 'user') {
      handleUserLogin({
        form,
        userType,
        setErrors,
        setModal,
        navigate,
      });
    } else {
      handleCompanyLogin({
        form,
        setErrors,
        setModal,
        navigate,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="login_page">
      <div className="login_card">
        <h2 className="login_title">로그인</h2>

        <div className="user_type_toggle">
          <button
            className={`user ${userType === 'user' ? 'active' : ''}`}
            onClick={() => setUserType('user')}
          >
            <FaUser /> 개인 회원
          </button>
          <button
            className={`company ${userType === 'company' ? 'active' : ''}`}
            onClick={() => setUserType('company')}
          >
            <FaBuilding /> 기업 회원
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
          <LabeledInput
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            error={errors.email}
            className={`no_margin ${userType === 'company' ? 'company_focus' : ''}`}
            autoComplete="email"
          />

          <div className="input_group">
            <label>비밀번호</label>
            <div className="password_wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className={`${errors.password ? 'error' : ''} ${userType === 'company' ? 'company_focus' : ''}`}
                autoComplete="current-password"
              />
              <span className={userType} onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
            </div>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          <button
            className={`login_btn ${userType === 'company' ? 'company' : 'user'}`}
            type="submit"
          >
            로그인
          </button>
        </form>

        <div className={`bottom_links ${userType}`}>
          <span onClick={() => navigate('/find-email')}>이메일찾기</span>
          <span>|</span>
          <span onClick={() => navigate('/forgot-password')}>비밀번호찾기</span>
        </div>

        <div className="sns_login">
          <button className="kakao">
            <img className="icon_kakao" src="/kakao-logo.png" alt="카카오" />
            카카오 로그인
          </button>
          <button
            className="naver"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          >
            <img className="icon_naver" src="/naver-logo.png" alt="네이버" />
            네이버 로그인
          </button>
        </div>
      </div>

      {modal && <Modal {...modal} />}
    </div>
  );
};

export default LoginPage;