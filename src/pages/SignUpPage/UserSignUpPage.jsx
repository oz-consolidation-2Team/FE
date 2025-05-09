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
import { signUpUserApi, verifyEmailApi, checkEmailVerifiedApi } from '@/apis/authApi';
import { useLocation } from 'react-router-dom';
import {
  INTEREST_OPTIONS,
  PURPOSE_OPTIONS,
  CHANNEL_OPTIONS,
  MAX_PHONE_LENGTH,
  MAX_BIRTH_LENGTH,
} from '@/utils/signUpInfoOptions';

const UserSignUpPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const fromSocial = location.state?.fromSocial || false;
  const socialUser = location.state?.user || {};

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
  name: '',
  email: socialUser.email || '',
  password: '',
  passwordCheck: '',
  phone: '',
  birth: '',
  gender: '',
  interests: [],
  purposes: [],
  channels: [],
  termsAll: false,
  terms1: false, terms2: false, terms3: false,
  terms4: false, terms5: false, terms6: false,
});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && val) delete next.name;
      if (name === 'email') {
        if (validateEmail(val)) delete next.email;
        setEmailVerified(false);
      }
      if (name === 'password' && validatePassword(val)) delete next.password;
      if (name === 'passwordCheck' && val === form.password) delete next.passwordCheck;
      if (name === 'gender' && val) delete next.gender;
      return next;
    });
  };

  const handleOpenTermsModal = (key, title) => {
    setModal({
      type: 'term',
      key,
      title,
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

  const handleEmailVerification = async () => {
    if (fromSocial) return;

    const email = form.email.trim();
    
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      setEmailVerified(false);
      return;
    }
  
    try {
      const result = await verifyEmailApi(email);
  
      if (result?.status === 'success') {
        setModal({
          type: 'success',
          title: '인증 요청 완료',
          message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
          onConfirm: () => setModal(null),
        });
        setEmailVerified(true);
      } else {
        setEmailVerified(false);
      }
  
    } catch (error) {
      const status = error.response?.status;
  
      if (status === 400) {
        setModal({
          type: 'error',
          title: '중복된 이메일',
          message: '이미 가입된 이메일입니다.',
          onConfirm: () => setModal(null),
        });
        setEmailVerified(false);
  
      } else if (status === 422) {
        setModal({
          type: 'error',
          title: '입력 오류',
          message: '입력한 이메일이 올바르지 않습니다.',
          onConfirm: () => setModal(null),
        });
        setEmailVerified(false);
  
      } else {
        setModal({
          type: 'error',
          title: '오류 발생',
          message: '이메일 인증 요청 중 오류가 발생했습니다.',
          onConfirm: () => setModal(null),
        });
        setEmailVerified(false);
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!validateName(form.name)) newErrors.name = '이름을 입력해주세요.';
    
    if (!fromSocial && !emailVerified) {
      newErrors.email = '이메일 인증을 완료해주세요.';
    }
  
    if (!validatePassword(form.password)) {
      newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자 포함';
    }
  
    if (form.password !== form.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }
  
    if (!isValidPhone(form.phone)) newErrors.phone = '전화번호 형식이 올바르지 않습니다.';
    if (!isValidBirth(form.birth)) newErrors.birth = '생년월일 형식이 올바르지 않습니다.';
    if (!form.gender) newErrors.gender = '성별을 선택해주세요.';
  
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (form.interests.length === 0) newErrors.interests = '관심 분야를 선택해주세요.';
    if (form.purposes.length === 0) newErrors.purposes = '가입 목적을 선택해주세요.';
    if (form.channels.length === 0) newErrors.channels = '유입 경로를 선택해주세요.';
    return newErrors;
  };

  const validateStep3 = () => {
    if (!form.terms1 || !form.terms2 || !form.terms3) {
      return { agree: '필수 약관에 모두 동의해주세요.' };
    }
    return {};
  };

  const handleNext = async () => {
    try {
      if (!fromSocial) {
        const isVerified = await checkEmailVerifiedApi(form.email, 'user');
  
        if (!isVerified) {
          setEmailVerified(false);
          setModal({
            type: 'error',
            title: '이메일 인증 필요',
            message: '이메일 인증을 먼저 완료해주세요.',
            onConfirm: () => setModal(null),
          });
          return;
        }
  
        setEmailVerified(true);
      }
  
      const newErrors = validateStep1();
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
        setStep(1);
      }
    } catch (error) {
      const status = error.response?.status;
  
      if (status === 404) {
        setModal({
          type: 'error',
          title: '이메일 인증 확인 오류',
          message: '해당 이메일은 인증되지 않았습니다.',
          onConfirm: () => setModal(null),
        });
      } else {
        setModal({
          type: 'error',
          title: '이메일 인증 확인 오류',
          message: '이메일 인증 확인 중 오류가 발생했습니다.',
          onConfirm: () => setModal(null),
        });
      }
  
      setEmailVerified(false);
    }
  };

  const handleSubmit = () => {
    const newErrors = validateStep2();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(2);
  };
  
  const handleFinalSubmit = async () => {
    const error = validateStep3();
    setErrors(error);
    if (Object.keys(error).length > 0) return;
  
    try {
      await signUpUserApi(form);
      setModal({
        type: 'success',
        title: '회원가입 완료',
        message: '정상적으로 회원가입이 완료되었습니다.',
        onConfirm: () => {
          setModal(null);
          navigate('/login');
        },
      });
    } catch (err) {
      const status = err.response?.status;
  
      if (status === 400) {
        setModal({
          type: 'error',
          title: '이메일 인증 미완료',
          message: err.response?.data?.message || '이메일 인증이 완료되지 않았습니다.',
          onConfirm: () => setModal(null),
        });
      } else {
        setModal({
          type: 'error',
          title: '회원가입 실패',
          message: err.response?.data?.message || '회원가입 중 오류가 발생했습니다.',
          onConfirm: () => setModal(null),
        });
      }
    }
  };

  const handleSubmitByStep = (e) => {
    e.preventDefault();
    if (step === 0) handleNext();
    else if (step === 1) handleSubmit();
    else if (step === 2) handleFinalSubmit();
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

  return (
    <div className="user_signup_page">
      <div className="signup_card">
        <form onSubmit={handleSubmitByStep}>
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
              <LabeledInput label="이름" name="name" value={form.name} onChange={handleChange} placeholder="이름을 입력해 주세요" error={errors.name} />
              
              <div className="form_group">
                <label>이메일</label>
                <div className="input_row">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`${errors.email ? 'error' : ''} ${fromSocial ? 'readonly_input' : ''}`}
                  autoComplete="username"
                  readOnly={fromSocial}
                />
                {!fromSocial && (
                  <button type="button" onClick={handleEmailVerification}>인증하기</button>
                )}
                </div>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </div>

                <>
                  <div className="form_group password_row">
                    <label>비밀번호</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="영문+숫자+특수문자 8자 이상"
                      className={errors.password ? 'error' : ''}
                      autoComplete="new-password"
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
                      autoComplete="new-password"
                    />
                    <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                      {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                    </span>
                    {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
                  </div>
                </>

              <LabeledInput label="전화번호" name="phone" value={form.phone} onChange={handlePhoneChange} placeholder="숫자만 입력해 주세요" error={errors.phone} inputMode="numeric" />
              <LabeledInput label="생년월일" name="birth" value={form.birth} onChange={handleBirthChange} placeholder="YYYYMMDD" error={errors.birth} inputMode="numeric" />

              <div className="form_group">
                <label>성별</label>
                <div className="gender_group">
                  <button
                    type="button"
                    className={form.gender === '남성' ? 'selected' : ''}
                    onClick={() => { setForm((prev) => ({ ...prev, gender: '남성' })); setErrors((prev) => { const next = { ...prev }; delete next.gender; return next; }); }}
                  >
                    남성
                  </button>
                  <button
                    type="button"
                    className={form.gender === '여성' ? 'selected' : ''}
                    onClick={() => { setForm((prev) => ({ ...prev, gender: '여성' })); setErrors((prev) => { const next = { ...prev }; delete next.gender; return next; }); }}
                  >
                    여성
                  </button>
                </div>
                {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <section className="section_box">
                <p className="section_title">관심 분야 <span>(최대 3개)</span></p>
                <div className="checkbox_grid">
                  {INTEREST_OPTIONS.map((item) => (
                    <button key={item} type="button" className={`check_btn ${form.interests.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('interests', item, 3)}>
                      {item}
                    </button>
                  ))}
                </div>
                {errors.interests && <ErrorMessage>{errors.interests}</ErrorMessage>}
              </section>

              <section className="section_box">
                <p className="section_title">가입 목적</p>
                <div className="checkbox_grid">
                  {PURPOSE_OPTIONS.map((item) => (
                    <button key={item} type="button" className={`check_btn ${form.purposes.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('purposes', item)}>
                      {item}
                    </button>
                  ))}
                </div>
                {errors.purposes && <ErrorMessage>{errors.purposes}</ErrorMessage>}
              </section>

              <section className="section_box">
                <p className="section_title">유입 경로</p>
                <div className="checkbox_grid">
                  {CHANNEL_OPTIONS.map((item) => (
                    <button key={item} type="button" className={`check_btn ${form.channels.includes(item) ? 'selected' : ''}`} onClick={() => toggleMultiSelect('channels', item)}>
                      {item}
                    </button>
                  ))}
                </div>
                {errors.channels && <ErrorMessage>{errors.channels}</ErrorMessage>}
              </section>
            </>
          )}

          {step === 2 && (
            <>
              <div className="terms_step">
                <div className="checkbox_row all_agree">
                  <input type="checkbox" checked={form.termsAll} onChange={handleAllTermsToggle} />
                  <label><strong>전체 약관 동의</strong></label>
                </div>
                <hr />
                <div className="terms_section">
                  <div className="terms_label">[필수] 약관 동의</div>
                  {[1, 2, 3].map((n) => (
                    <div className="checkbox_row" key={`terms${n}`}>
                      <input 
                        type="checkbox" 
                        checked={form[`terms${n}`]} 
                        onChange={() => toggleCheck(`terms${n}`)} 
                      />
                      <label>
                        {n === 1 ? '개인정보처리방침' :
                        n === 2 ? '개인회원 이용약관' :
                        '위치기반 서비스 이용약관'}
                      </label>
                      <button
                        type="button"
                        className="view_terms_btn"
                        onClick={() => handleOpenTermsModal(
                          n === 1 ? 'privacy_policy.html' :
                          n === 2 ? 'user_terms.html' :
                          'location_terms.html',
                          n === 1 ? '개인정보처리방침' :
                          n === 2 ? '개인회원 이용약관' :
                          '위치기반 서비스 이용약관'
                        )}
                      >
                        자세히 보기
                      </button>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="terms_section">
                  <div className="terms_label">[선택] 약관 동의</div>
                  {[4, 5, 6].map((n) => (
                    <div className="checkbox_row" key={`terms${n}`}>
                      <input 
                        type="checkbox" 
                        checked={form[`terms${n}`]} 
                        onChange={() => toggleCheck(`terms${n}`)} 
                      />
                      <label>
                        {n === 4 ? '마케팅 이메일 수신 동의' :
                        n === 5 ? '마케팅 SMS 수신 동의' :
                        '마케팅 Push 수신 동의'}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.agree && <ErrorMessage>{errors.agree}</ErrorMessage>}
              </div>
            </>
          )}

          <div className="button_group">
            {step > 0 && (
              <button type="button" className="prev_btn" onClick={() => setStep(step - 1)}>이전</button>
            )}
            <button type="submit" className="next_btn">
              {step === 2 ? '회원가입 완료' : '다음'}
            </button>
          </div>
        </form>
      </div>
      {modal?.type === 'term' && (
        <Modal
          type="term"
          title={modal.title}
          message={
            <iframe
              src={`/terms/${modal.key}`}
              title={modal.title}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          }
          onConfirm={() => setModal(null)}
        />
      )}

      {modal?.type !== 'term' && modal && <Modal {...modal} />}
    </div>
  );
};

export default UserSignUpPage;