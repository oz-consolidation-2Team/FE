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
import './UserInfoEditPage.scss';
import { signUpUserApi, checkUserEmailApi } from '@/apis/authApi';
import { INTEREST_OPTIONS, PURPOSE_OPTIONS, CHANNEL_OPTIONS } from '@/utils/signUpInfoOptions.js';

const MAX_PHONE_LENGTH = 11;
const MAX_BIRTH_LENGTH = 8;

const UserInfoEditPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    phone: '',
    birth: '',
    gender: '',
    interests: [],
    purposes: [],
    channels: [],
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
    if (isValidPhone(val))
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
  };

  const handleBirthChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, MAX_BIRTH_LENGTH);
    if (val.length >= 5) val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    setForm((prev) => ({ ...prev, birth: val }));
    if (isValidBirth(val))
      setErrors((prev) => {
        const next = { ...prev };
        delete next.birth;
        return next;
      });
  };

  const handleEmailCheck = async () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.email;
      return next;
    });

    try {
      const result = await checkUserEmailApi(form.email);

      if (result.is_duplicate) {
        setModal({
          type: 'error',
          title: '중복된 이메일',
          message: '이미 가입된 이메일입니다.',
          onConfirm: () => {
            setModal(null);
            setEmailChecked(false);
          },
        });
      } else {
        setModal({
          type: 'success',
          title: '사용 가능',
          message: '사용 가능한 이메일입니다.',
          onConfirm: () => {
            setModal(null);
            setEmailChecked(true);
          },
        });
      }
    } catch (err) {
      console.error('이메일 중복확인 실패', err);
      setModal({
        type: 'error',
        title: '오류 발생',
        message: err.response?.data?.message || '이메일 중복확인 중 오류가 발생했습니다.',
        onConfirm: () => setModal(null),
      });
    }
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
    if (!validatePassword(form.password))
      newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자 포함';
    if (form.password !== form.passwordCheck)
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
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
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep3 = () => {
    if (!form.terms1 || !form.terms2 || !form.terms3) {
      return { agree: '필수 약관에 모두 동의해주세요.' };
    }
    return {};
  };

  const handleFinalSubmit = async () => {
    console.log('[회원가입] handleFinalSubmit 실행됨 ✅');

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
      setModal({
        type: 'error',
        title: '회원가입 실패',
        message: err.response?.data?.message || '회원가입 중 오류가 발생했습니다.',
        onConfirm: () => setModal(null),
      });
    }
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
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                <button type="button" onClick={handleEmailCheck}>
                  중복확인
                </button>
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
                  className={form.gender === '남성' ? 'selected' : ''}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, gender: '남성' }));
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
                  className={form.gender === '여성' ? 'selected' : ''}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, gender: '여성' }));
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
              <button className="next_btn" onClick={handleNext}>
                다음
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <section className="section_box">
              <p className="section_title">
                관심 분야 <span>(최대 3개)</span>
              </p>
              <div className="checkbox_grid">
                {INTEREST_OPTIONS.map((item) => (
                  <button
                    key={item}
                    className={`check_btn ${form.interests.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleMultiSelect('interests', item, 3)}
                  >
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
                  <button
                    key={item}
                    className={`check_btn ${form.purposes.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleMultiSelect('purposes', item)}
                  >
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
                  <button
                    key={item}
                    className={`check_btn ${form.channels.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleMultiSelect('channels', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {errors.channels && <ErrorMessage>{errors.channels}</ErrorMessage>}
            </section>

            <div className="button_group">
              <button className="prev_btn" onClick={() => setStep(0)}>
                이전
              </button>
              <button className="next_btn" onClick={handleSubmit}>
                다음
              </button>
            </div>
          </>
        )}

        <div className="button_group">
          <button className="prev_btn" onClick={() => setStep(1)}>
            이전
          </button>
          <button className="next_btn" onClick={handleFinalSubmit}>
            회원가입 완료
          </button>
        </div>
      </div>
      {modal?.type === 'term' && (
        <Modal
          className="term_modal"
          type="green"
          title="약관 보기"
          message={<iframe src={`/terms/${modal.key}`} title="약관 보기" />}
          onConfirm={() => setModal(null)}
        />
      )}

      {modal?.type !== 'term' && modal && <Modal {...modal} />}
    </div>
  );
};

export default UserInfoEditPage;
