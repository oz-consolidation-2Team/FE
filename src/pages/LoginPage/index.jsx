import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import { FaUser, FaBuilding } from 'react-icons/fa';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import LabeledInput from '@/components/common/LabeledInput';
import { validateEmail, validatePassword } from '@/utils/validation';
import useUserStore from '@/utils/userStore';
import './LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [userType, setUserType] = useState('user');
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(null);

  const testAccounts = {
    user: { email: 'user@qwe.qwe', password: 'qwe123!@#' },
    company: { email: 'company@qwe.qwe', password: 'qwe123!@#' },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogin = () => {
    const newErrors = {};
    if (!validateEmail(form.email)) newErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!validatePassword(form.password)) newErrors.password = '비밀번호 형식이 올바르지 않습니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const current = testAccounts[userType];
    const isMatch = form.email === current.email && form.password === current.password;

    if (isMatch) {
      setUser({ email: form.email, type: userType });
      setModal({
        type: 'success',
        message: '로그인 완료!',
        onConfirm: () => {
          setModal(null);
          navigate('/');
        },
      });
    } else {
      setModal({
        type: 'error',
        message: '계정 정보가 일치하지 않습니다.',
        onConfirm: () => setModal(null),
      });
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') handleLogin();
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

        <LabeledInput
          label="이메일"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          error={errors.email}
          className="no_margin"
        />

        <div className="input_group">
          <label>비밀번호</label>
          <div className="password_wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleEnterKey}
              placeholder="비밀번호를 입력하세요"
              className={errors.password ? 'error' : ''}
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
          </div>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </div>

        <button
          className={`login_btn ${userType === 'company' ? 'company' : 'user'}`}
          onClick={handleLogin}
        >
          로그인
        </button>

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
          <button className="naver">
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
