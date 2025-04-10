import React, { useState } from 'react';
import './UserSignUpPage.scss';
import { FaUserCircle } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';

const UserSignUpPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    phone: '',
    birth: '',
    gender: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [emailChecked, setEmailChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const validatePassword = (pw) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/.test(pw);
  const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);
  const isValidBirth = (birth) => /^\d{4}-\d{2}-\d{2}$/.test(birth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name === 'password') {
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) return;

      setForm({ ...form, [name]: val });
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value) ? '' : '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.',
      }));
      return;
    }

    if (name === 'passwordCheck') {
      setForm({ ...form, [name]: val });
      setErrors((prev) => ({
        ...prev,
        passwordCheck: form.password !== val ? '비밀번호가 일치하지 않습니다.' : '',
      }));
      return;
    }

    setForm({ ...form, [name]: val });
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '');
    if (val.length <= 3) val = val;
    else if (val.length <= 7) val = `${val.slice(0, 3)}-${val.slice(3)}`;
    else val = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
    setForm({ ...form, phone: val });
  };

  const handleBirthChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '');
    if (val.length <= 4) val = val;
    else if (val.length <= 6) val = `${val.slice(0, 4)}-${val.slice(4)}`;
    else val = `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`;
    setForm({ ...form, birth: val });
  };

  const handleEmailCheck = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      return;
    }

    setEmailChecked(true);
    setErrors((prev) => ({ ...prev, email: '' }));

    // 추후 모달 열기 로직 연결 예정
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!form.email.trim()) newErrors.email = '이메일을 입력해주세요.';
    if (!validatePassword(form.password))
      newErrors.password = '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.';
    if (form.password !== form.passwordCheck)
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';

    if (!form.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = '형식: 010-1234-5678';
    }

    if (!form.birth.trim()) {
      newErrors.birth = '생년월일을 입력해주세요.';
    } else if (!isValidBirth(form.birth)) {
      newErrors.birth = '형식: YYYY-MM-DD';
    }

    if (!form.gender) newErrors.gender = '성별을 선택해주세요.';
    if (!form.agree) newErrors.agree = '약관에 동의해주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('회원가입 완료!');
  };

  return (
    <div className="user_signup_container">
      <form className="user_signup_form" onSubmit={handleSubmit}>
        <div className="signup_title">
          <FaUserCircle className="icon" />
          <h2>개인 회원가입</h2>
        </div>

        <div className="form_group">
          <label>이름</label>
          <input className="form_input" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error_msg">{errors.name}</p>}
        </div>

        <div className="form_group">
          <label>이메일</label>
          <div className="email_row">
            <input className="form_input" name="email" value={form.email} onChange={handleChange} />
            <button type="button" onClick={handleEmailCheck}>중복확인</button>
          </div>
          {errors.email && <p className="error_msg">{errors.email}</p>}
        </div>

        <div className="form_group password_group">
          <label>비밀번호</label>
          <div className="password_row">
            <input
              className="form_input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="영문+숫자+특수문자 8자 이상"
            />
            <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
          </div>
          {errors.password && <p className="error_msg">{errors.password}</p>}
        </div>

        <div className="form_group password_group">
          <label>비밀번호 확인</label>
          <div className="password_row">
            <input
              className="form_input"
              type={showPasswordCheck ? 'text' : 'password'}
              name="passwordCheck"
              value={form.passwordCheck}
              onChange={handleChange}
            />
            <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
              {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
          </div>
          {errors.passwordCheck && <p className="error_msg">{errors.passwordCheck}</p>}
        </div>

        <div className="form_group">
          <label>전화번호</label>
          <input
            className="form_input"
            name="phone"
            value={form.phone}
            onChange={handlePhoneChange}
            maxLength={13}
            placeholder="숫자만 입력해주세요 (예: 01012345678)"
          />
          {errors.phone && <p className="error_msg">{errors.phone}</p>}
        </div>

        <div className="form_group">
          <label>생년월일</label>
          <input
            className="form_input"
            name="birth"
            value={form.birth}
            onChange={handleBirthChange}
            maxLength={10}
            placeholder="숫자만 입력해주세요 (예: 19991231)"
          />
          {errors.birth && <p className="error_msg">{errors.birth}</p>}
        </div>

        <div className="form_group gender_group">
          <label>성별</label>
          <div className="gender_buttons">
            <button
              type="button"
              className={form.gender === 'male' ? 'active' : ''}
              onClick={() => setForm({ ...form, gender: 'male' })}
            >
              남성
            </button>
            <button
              type="button"
              className={form.gender === 'female' ? 'active' : ''}
              onClick={() => setForm({ ...form, gender: 'female' })}
            >
              여성
            </button>
          </div>
          {errors.gender && <p className="error_msg">{errors.gender}</p>}
        </div>

        <div className="form_group checkbox_group">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            이용약관 및 개인정보처리방침에 동의합니다.
          </label>
          {errors.agree && <p className="error_msg">{errors.agree}</p>}
        </div>

        <button className="submit_btn" type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default UserSignUpPage;
