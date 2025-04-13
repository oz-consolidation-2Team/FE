import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import {
  validateEmail,
  validatePassword,
  validateName,
  isValidPhone,
  isValidBirth,
} from '@/utils/validation';
import './UserSignUpPage.scss';

const INTEREST_OPTIONS = [
  '외식·음료', '유통·판매', '문화·여가·생활', '서비스', '사무·회계',
  '고객상담·영업·리서치', '생산·건설·노무', 'IT·인터넷', '교육·강사',
  '디자인', '미디어', '운전·배달', '병원·간호·연구',
  '전문-상담직', '전문-사무직', '전문-BAR', '전문-생산직', '전문-외식업'
];
const PURPOSE_OPTIONS = ['일자리 관련 정보', '교육 및 재취업 준비', '창업 및 부업 정보', '네트워킹 및 커뮤니티', '기타'];
const CHANNEL_OPTIONS = ['네이버 검색', '구글 검색', '네이버 카페', '인스타그램/유튜브', '오프라인(복지관/센터)', '지인추천', '기타'];

const MAX_PHONE_LENGTH = 11;
const MAX_BIRTH_LENGTH = 8;

const UserSignUpPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', password: '', passwordCheck: '',
    phone: '', birth: '', gender: '', agree: false,
    interests: [], purposes: [], channels: [],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && val) delete next.name;
      if (name === 'email' && validateEmail(val)) delete next.email;
      if (name === 'password' && validatePassword(val)) delete next.password;
      if (name === 'passwordCheck' && val === form.password) delete next.passwordCheck;
      if (name === 'gender' && val) delete next.gender;
      if (name === 'agree' && checked) delete next.agree;
      return next;
    });
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, MAX_PHONE_LENGTH);
    if (val.length === 11) val = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (val.length >= 7) val = val.replace(/(\d{3})(\d{3,4})/, '$1-$2');
    setForm((prev) => ({ ...prev, phone: val }));
    if (isValidPhone(val)) setErrors((prev) => { const next = { ...prev }; delete next.phone; return next; });
  };

  const handleBirthChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, MAX_BIRTH_LENGTH);
    if (val.length >= 5) val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    setForm((prev) => ({ ...prev, birth: val }));
    if (isValidBirth(val)) setErrors((prev) => { const next = { ...prev }; delete next.birth; return next; });
  };

  const handleEmailCheck = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      return;
    }
    setErrors((prev) => { const next = { ...prev }; delete next.email; return next; });

    const duplicated = form.email === 'test@naver.com'; // TODO: 실제 API 연동 필요
    setModal({
      type: duplicated ? 'error' : 'success',
      title: duplicated ? '중복된 이메일' : '사용 가능',
      message: duplicated ? '이미 가입된 이메일입니다.' : '사용 가능한 이메일입니다.',
      onConfirm: () => {
        setModal(null);
        setEmailChecked(!duplicated);
      }
    });
  };

  const handleGenderSelect = (value) => {
    setForm((prev) => ({ ...prev, gender: value }));
    setErrors((prev) => { const next = { ...prev }; delete next.gender; return next; });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!validateName(form.name)) newErrors.name = '이름을 입력해주세요.';
    if (!validateEmail(form.email)) newErrors.email = '이메일 형식이 올바르지 않습니다.';
    else if (!emailChecked) {
      setModal({
        type: 'error',
        title: '중복확인 필요',
        message: '이메일 중복확인을 먼저 진행해주세요.',
        onConfirm: () => setModal(null),
      });
      return null;
    }
    if (!validatePassword(form.password)) newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자 포함';
    if (form.password !== form.passwordCheck) newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    if (!isValidPhone(form.phone)) newErrors.phone = '전화번호 형식이 올바르지 않습니다.';
    if (!isValidBirth(form.birth)) newErrors.birth = '생년월일 형식이 올바르지 않습니다.';
    if (!form.gender) newErrors.gender = '성별을 선택해주세요.';
    if (!form.agree) newErrors.agree = '약관에 동의해주세요.';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep1();
    if (newErrors === null) return;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(1);
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (form.interests.length === 0) newErrors.interests = '관심 분야를 선택해주세요.';
    if (form.purposes.length === 0) newErrors.purposes = '가입 목적을 선택해주세요.';
    if (form.channels.length === 0) newErrors.channels = '유입 경로를 선택해주세요.';
    return newErrors;
  };

  const toggleMultiSelect = (field, item, limit = null) => {
    setForm((prev) => {
      const isSelected = prev[field].includes(item);
      let updated = isSelected ? prev[field].filter((i) => i !== item) : [...prev[field], item];
      if (!isSelected && limit && updated.length > limit) return prev;
      return { ...prev, [field]: updated };
    });
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleSubmit = () => {
    const newErrors = validateStep2();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('회원가입 완료!');
      console.log('📦 폼:', form);
    }
  };

  return (
    <div className="user_signup_page">
      <div className="signup_card">
      <div className="step_indicator">
        <div className={`step ${step === 0 ? 'active' : ''}`}>1단계: 기본 정보</div>
        <div className="step_line" />
        <div className={`step ${step === 1 ? 'active' : ''}`}>2단계: 관심 분야</div>
      </div>
        <div className="signup_title">
          <FaUser className="icon" />
          <h2>개인 회원가입</h2>
        </div>

        {step === 0 && (
          <>
            {/* 이름 */}
            <div className="form_group">
              <label>이름</label>
              <input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </div>

            {/* 이메일 */}
            <div className="form_group">
              <label>이메일</label>
              <div className="input_row">
                <input name="email" value={form.email} onChange={handleChange} />
                <button type="button" onClick={handleEmailCheck}>중복확인</button>
              </div>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            {/* 비밀번호 */}
            <div className="form_group password_row">
              <label>비밀번호</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="영문+숫자+특수문자 8자 이상"
              />
              <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>

            {/* 비밀번호 확인 */}
            <div className="form_group password_row">
              <label>비밀번호 확인</label>
              <input
                type={showPasswordCheck ? 'text' : 'password'}
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={handleChange}
              />
              <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
            </div>

            {/* 전화번호 */}
            <div className="form_group">
              <label>전화번호</label>
              <input name="phone" value={form.phone} onChange={handlePhoneChange} placeholder="숫자만 입력해주세요"/>
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </div>

            {/* 생년월일 */}
            <div className="form_group">
              <label>생년월일</label>
              <input name="birth" value={form.birth} onChange={handleBirthChange} placeholder="숫자만 입력해주세요"/>
              {errors.birth && <ErrorMessage>{errors.birth}</ErrorMessage>}
            </div>

            {/* 성별 */}
            <div className="form_group">
              <label>성별</label>
              <div className="gender_group">
                <button
                  type="button"
                  className={form.gender === 'male' ? 'selected' : ''}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, gender: 'male' }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.gender;
                      return next;
                    });
                  }}
                >
                  남성
                </button>
                <button
                  type="button"
                  className={form.gender === 'female' ? 'selected' : ''}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, gender: 'female' }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.gender;
                      return next;
                    });
                  }}
                >
                  여성
                </button>
              </div>
              {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
            </div>

            {/* 약관 */}
            <div className="form_group">
              <div className="checkbox_group">
                <label>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  이용약관 및 개인정보처리방침에 동의합니다.
                </label>
              </div>
              {errors.agree && <ErrorMessage>{errors.agree}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button className="next_btn" onClick={handleNext}>다음</button>
            </div>

          </>
        )}

{step === 1 && (
          <>
            <section className="section_box">
              <p className="section_title">관심 분야 <span>(최대 3개)</span></p>
              <div className="checkbox_grid">
                {INTEREST_OPTIONS.map((item) => (
                  <button key={item} className={`check_btn ${form.interests.includes(item) ? 'selected' : ''}`} onClick={() => toggleItem('interests', item, 3)}>{item}</button>
                ))}
              </div>
              {errors.interests && <ErrorMessage>{errors.interests}</ErrorMessage>}
            </section>

            <section className="section_box">
              <p className="section_title">가입 목적</p>
              <div className="checkbox_grid">
                {PURPOSE_OPTIONS.map((item) => (
                  <button key={item} className={`check_btn ${form.purposes.includes(item) ? 'selected' : ''}`} onClick={() => toggleItem('purposes', item)}>{item}</button>
                ))}
              </div>
              {errors.purposes && <ErrorMessage>{errors.purposes}</ErrorMessage>}
            </section>

            <section className="section_box">
              <p className="section_title">유입 경로</p>
              <div className="checkbox_grid">
                {CHANNEL_OPTIONS.map((item) => (
                  <button key={item} className={`check_btn ${form.channels.includes(item) ? 'selected' : ''}`} onClick={() => toggleItem('channels', item)}>{item}</button>
                ))}
              </div>
              {errors.channels && <ErrorMessage>{errors.channels}</ErrorMessage>}
            </section>

            <div className="button_group">
              <button className="prev_btn" onClick={() => setStep(0)}>이전</button>
              <button className="next_btn" onClick={handleSubmit}>등록하기</button>
            </div>
          </>
        )}
      </div>
      
      {modal && <Modal {...modal} />}
    </div>
  );
};

export default UserSignUpPage;