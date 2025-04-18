import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import LabeledInput from '@/components/common/LabeledInput';
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
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', password: '', passwordCheck: '',
    phone: '', birth: '', gender: '',
    interests: [], purposes: [], channels: [],
    termsAll: false,
    terms1: false, terms2: false, terms3: false,
    terms4: false, terms5: false, terms6: false,
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

    const duplicated = form.email === 'test@naver.com';
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

  const handleSubmit = () => {
    const newErrors = validateStep2();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
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

  const toggleCheck = (key) => {
    const next = { ...form, [key]: !form[key] };
    next.termsAll = next.terms1 && next.terms2 && next.terms3 && next.terms4 && next.terms5 && next.terms6;
    setForm(next);
  };

  const handleAllTermsToggle = () => {
    const all = !form.termsAll;
    setForm((prev) => ({
      ...prev,
      termsAll: all,
      terms1: all,
      terms2: all,
      terms3: all,
      terms4: all,
      terms5: all,
      terms6: all,
    }));
  };

  const validateStep3 = () => {
    if (!form.terms1 || !form.terms2 || !form.terms3) {
      return { agree: '필수 약관에 모두 동의해주세요.' };
    }
    return {};
  };

  const handleFinalSubmit = () => {
    const error = validateStep3();
    setErrors(error);
    if (Object.keys(error).length > 0) return;
    setModal({
      type: 'success',
      title: '회원가입 완료',
      message: '정상적으로 회원가입이 완료되었습니다.',
      onConfirm: () => {
        setModal(null);
        navigate('/login');
      },
    });
  };

  return (
    <div className="user_signup_page">
      <div className="signup_card">
        <div className="step_indicator">
          <div className={`step ${step === 0 ? 'active' : ''}`}>1단계: 기본 정보</div>
          <div className="step_line" />
          <div className={`step ${step === 1 ? 'active' : ''}`}>2단계: 관심 분야</div>
          <div className="step_line" />
          <div className={`step ${step === 2 ? 'active' : ''}`}>3단계: 약관 동의</div>
        </div>

        <div className="signup_title">
          <FaUser className="icon" />
          <h2>개인 회원가입</h2>
        </div>

        {step === 0 && (
          <>
            <LabeledInput
              label="이름"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력해 주세요"
              error={errors.name}
            />

            <div className="form_group">
              <label>이메일</label>
              <div className="input_row">
                <input name="email" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                <button type="button" onClick={handleEmailCheck}>중복확인</button>
              </div>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            <div className="form_group password_row">
              <label>비밀번호</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="영문+숫자+특수문자 8자 이상"
                className={errors.password ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>

            <div className="form_group password_row">
              <label>비밀번호 확인</label>
              <input
                type={showPasswordCheck ? 'text' : 'password'}
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={handleChange}
                className={errors.passwordCheck ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
            </div>

            <LabeledInput
              label="전화번호"
              name="phone"
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="숫자만 입력해 주세요"
              error={errors.phone}
              inputMode="numeric"
            />

            <LabeledInput
              label="생년월일"
              name="birth"
              value={form.birth}
              onChange={handleBirthChange}
              placeholder="숫자만 입력해 주세요"
              error={errors.birth}
              inputMode="numeric"
            />
            

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
                  <button key={item} className={`check_btn ${form.interests.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('interests', item, 3)}>{item}</button>
                ))}
              </div>
              {errors.interests && <ErrorMessage>{errors.interests}</ErrorMessage>}
            </section>

            <section className="section_box">
              <p className="section_title">가입 목적</p>
              <div className="checkbox_grid">
                {PURPOSE_OPTIONS.map((item) => (
                  <button key={item} className={`check_btn ${form.purposes.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('purposes', item)}>{item}</button>
                ))}
              </div>
              {errors.purposes && <ErrorMessage>{errors.purposes}</ErrorMessage>}
            </section>

            <section className="section_box">
              <p className="section_title">유입 경로</p>
              <div className="checkbox_grid">
                {CHANNEL_OPTIONS.map((item) => (
                  <button key={item} className={`check_btn ${form.channels.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('channels', item)}>{item}</button>
                ))}
              </div>
              {errors.channels && <ErrorMessage>{errors.channels}</ErrorMessage>}
            </section>

            <div className="button_group">
              <button className="prev_btn" onClick={() => setStep(0)}>이전</button>
              <button className="next_btn" onClick={handleSubmit}>다음</button>
            </div>
          </>
        )}

{step === 2 && (
        <div className="terms_step">
          <div className="checkbox_row">
            <input type="checkbox" checked={form.termsAll} onChange={handleAllTermsToggle} />
            <label>전체 약관 동의</label>
          </div>
          <hr />

          {[1, 2, 3].map((n) => (
            <div className="checkbox_row" key={`terms${n}`}>
              <input
                type="checkbox"
                checked={form[`terms${n}`]}
                onChange={() => toggleCheck(`terms${n}`)}
              />
              <label>[필수] {
                n === 1 ? '개인정보처리방침' :
                n === 2 ? '개인회원 이용약관' :
                '위치기반 서비스 이용약관'
              } 동의</label>
              <button
                type="button"
                className="view_detail"
                onClick={() => setModal({ type: 'term', key: `terms${n}.html` })}
              >자세히 보기</button>
            </div>
          ))}

          {[4, 5, 6].map((n) => (
            <div className="checkbox_row" key={`terms${n}`}>
              <input
                type="checkbox"
                checked={form[`terms${n}`]}
                onChange={() => toggleCheck(`terms${n}`)}
              />
              <label>[선택] {
                n === 4 ? '마케팅 이메일 수신' :
                n === 5 ? '마케팅 SMS 수신' :
                '마케팅 Push 수신'
              } 동의</label>
            </div>
          ))}

          {errors.agree && <ErrorMessage>{errors.agree}</ErrorMessage>}

          <div className="button_group">
            <button className="prev_btn" onClick={() => setStep(1)}>이전</button>
            <button className="next_btn" onClick={handleFinalSubmit}>회원가입 완료</button>
          </div>
        </div>
      )}
      </div>
    {modal?.type === 'term' && (
      <Modal
        type="green"
        message={
          <iframe
            src={`/terms/${modal.key}`}
            title="약관 보기"
            width="100%"
            height="300px"
            style={{ border: 'none' }}
          />
        }
        onConfirm={() => setModal(null)}
      />
    )}

    {/* 일반 모달 */}
    {modal?.type !== 'term' && modal && <Modal {...modal} />}
  </div>
);
};

export default UserSignUpPage;
