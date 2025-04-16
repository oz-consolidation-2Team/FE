import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaLockSolid, LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import Modal from '@/components/common/Modal';
import ErrorMessage from '@/components/common/ErrorMessage';
import { validatePassword } from '@/utils/validation';
import './ResetPasswordPage.scss';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const isUser = type === 'user';
  const theme = isUser ? 'orange' : 'green';

  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'password' && validatePassword(value)) delete next.password;
      if (name === 'passwordCheck' && value === form.password) delete next.passwordCheck;
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validatePassword(form.password)) newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.';
    if (form.password !== form.passwordCheck) newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setModal({
      type: 'success',
      title: '비밀번호 재설정 완료',
      message: '새로운 비밀번호로 로그인해주세요.',
      onConfirm: () => {
        setModal(null);
        navigate('/login');
      },
    });
  };

  return (
    <div className="reset_password_wrap">
      <div className="reset_password_page">
        <div className={`reset_password_card ${theme}`}>
          <div className="title">
            <LiaLockSolid className="icon" />
            <h2>비밀번호 재설정</h2>
          </div>

          {/* 비밀번호 입력 */}
          <div className="form_group password_row">
            <label htmlFor="password">새 비밀번호</label>
            <div className="input_wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="영문/숫자/특수문자 포함 8자 이상"
                className={errors.password ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
            </div>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="form_group password_row">
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <div className="input_wrap">
              <input
                id="passwordCheck"
                type={showPasswordCheck ? 'text' : 'password'}
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={handleChange}
                placeholder="다시 한 번 입력해 주세요"
                className={errors.passwordCheck ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
            </div>
            {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
          </div>

          <div className="button_group">
            <button className="next_btn" onClick={handleSubmit}>비밀번호 재설정</button>
          </div>

          {modal && <Modal {...modal} />}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
