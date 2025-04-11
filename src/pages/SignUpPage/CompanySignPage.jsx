import React, { useState, useEffect } from 'react';
import './CompanySignPage.scss';
import { FaBuilding } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import {
  validateEmail,
  validatePassword,
  isValidPhone,
  isValidStartDate,
} from '../../utils/validation';

const CompanySignPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [emailChecked, setEmailChecked] = useState(false);
  const [regChecked, setRegChecked] = useState(false);

  const [form, setForm] = useState({
    email: '', password: '', passwordCheck: '',
    companyName: '', ceoName: '', startDate: '',
    regNumber: '', companyIntro: '',
    managerName: '', managerPhone: '', managerEmail: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});

  useEffect(() => setEmailChecked(false), [form.email]);
  useEffect(() => setRegChecked(false), [form.regNumber]);

  const showModalMessage = ({ type, title, message, onConfirm }) => {
    setModalProps({ type, title, message, onConfirm });
    setShowModal(true);
  };

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      const check = {
        companyName: () => value && delete newErrors.companyName,
        ceoName: () => value && delete newErrors.ceoName,
        startDate: () => isValidStartDate(value) && delete newErrors.startDate,
        regNumber: () => value.length === 10 && delete newErrors.regNumber,
        companyIntro: () => value.length >= 50 && delete newErrors.companyIntro,
        managerName: () => value && delete newErrors.managerName,
        managerPhone: () => isValidPhone(value) && delete newErrors.managerPhone,
        managerEmail: () => validateEmail(value) && delete newErrors.managerEmail,
        agree: () => value && delete newErrors.agree,
      };
      check[name]?.();
      return newErrors;
    });
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (['startDate', 'regNumber', 'managerPhone'].includes(name)) {
      val = val.replace(/[^\d]/g, '');
    }
    updateField(name, val);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) return;
    updateField('password', value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value) ? '' : '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.',
    }));
  };

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    updateField('passwordCheck', value);
    setErrors((prev) => ({
      ...prev,
      passwordCheck: form.password !== value ? '비밀번호가 일치하지 않습니다.' : '',
    }));
  };

  const handleManagerPhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '');
    if (val.length <= 3) val = val;
    else if (val.length <= 7) val = `${val.slice(0, 3)}-${val.slice(3)}`;
    else val = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
    updateField('managerPhone', val);
  };

  const handleEmailCheck = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      setEmailChecked(false);
      return;
    }
    const isDuplicated = form.email === 'test@company.com'; // mock
    showModalMessage({
      type: isDuplicated ? 'error' : 'success',
      title: isDuplicated ? '중복된 이메일' : '사용 가능',
      message: isDuplicated
        ? '이미 가입되어 있는 이메일입니다.'
        : '사용할 수 있는 이메일입니다.',
      onConfirm: () => {
        setShowModal(false);
        setEmailChecked(!isDuplicated);
        if (!isDuplicated) setErrors((prev) => ({ ...prev, email: '' }));
      },
    });
  };

  const handleRegCheck = () => {
    if (!form.ceoName || !form.startDate || !form.regNumber) {
      return showModalMessage({
        type: 'error',
        title: '입력값 누락',
        message: '대표자 성함, 개업년월일, 사업자등록번호를 모두 입력해주세요.',
        onConfirm: () => setShowModal(false),
      });
    }
    if (form.regNumber.length !== 10) {
      return showModalMessage({
        type: 'error',
        title: '잘못된 사업자등록번호',
        message: '사업자등록번호는 정확히 10자리여야 합니다.',
        onConfirm: () => setShowModal(false),
      });
    }

    const isValid = form.regNumber === '1234567890'; // mock
    showModalMessage({
      type: isValid ? 'success' : 'error',
      title: isValid ? '인증 완료' : '등록되지 않은 사업자등록번호입니다.',
      message: isValid
        ? '사업자등록번호가 인증되었습니다.'
        : '사업자등록번호가 인증되지 않았습니다.',
      onConfirm: () => {
        setShowModal(false);
        if (isValid) setRegChecked(true);
      },
    });
  };

  const validators = [
    () => {
      const e = {};
      if (!form.email.trim()) e.email = '이메일을 입력해주세요.';
      else if (!validateEmail(form.email)) e.email = '이메일 형식이 올바르지 않습니다.';
      else if (!emailChecked) e.email = '이메일 중복확인을 해주세요.';
      if (!validatePassword(form.password)) e.password = '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.';
      if (form.password !== form.passwordCheck) e.passwordCheck = '비밀번호가 일치하지 않습니다.';
      return e;
    },
    () => {
      const e = {};
      if (!form.companyName) e.companyName = '기업명을 입력해주세요.';
      if (!form.ceoName) e.ceoName = '대표자 성함을 입력해주세요.';
      if (!form.startDate || !isValidStartDate(form.startDate)) e.startDate = '개업년월일을 입력해주세요';
      if (!form.regNumber) e.regNumber = '사업자등록번호를 입력해주세요.';
      else if (form.regNumber.length !== 10) e.regNumber = '사업자등록번호는 정확히 10자리여야 합니다.';
      else if (!regChecked) e.regNumber = '사업자등록번호 인증을 해주세요.';
      if (!form.companyIntro || form.companyIntro.length < 50) e.companyIntro = '기업 소개는 50자 이상 작성해주세요.';
      return e;
    },
    () => {
      const e = {};
      if (!form.managerName) e.managerName = '담당자 성함을 입력해주세요.';
      if (!form.managerPhone || !isValidPhone(form.managerPhone)) e.managerPhone = '전화번호 형식이 유효하지 않습니다.';
      if (!form.managerEmail || !validateEmail(form.managerEmail)) e.managerEmail = '담당자 이메일 형식이 유효하지 않습니다.';
      if (!form.agree) e.agree = '약관에 동의해주세요.';
      return e;
    },
  ];

  const validateStep = () => {
    const newErrors = validators[step]();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    showModalMessage({
      title: '회원가입 완료!',
      message: '기업 회원가입이 완료되었습니다.',
      type: 'success',
      onConfirm: () => navigate('/login'),
    });
  };

  return (
    <div className="company_signup_container">
      <form className="company_signup_form" onSubmit={handleSubmit}>
        <div className="signup_title">
          <FaBuilding className="icon" />
          <h2>기업 회원가입</h2>
        </div>

        {step === 0 && (
          <>
            <h3 className="form_section_title">기본 정보</h3>
            <div className="form_group">
              <label>이메일</label>
              <div className="email_row">
                <input name="email" value={form.email} onChange={handleInputChange} />
                <button type="button" onClick={handleEmailCheck}>중복확인</button>
              </div>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            <div className="form_group password_group">
              <label>비밀번호</label>
              <div className="password_row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handlePasswordChange}
                  placeholder="영문+숫자+특수문자 8자 이상"
                />
                <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </span>
              </div>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>

            <div className="form_group password_group">
              <label>비밀번호 확인</label>
              <div className="password_row">
                <input
                  type={showPasswordCheck ? 'text' : 'password'}
                  name="passwordCheck"
                  value={form.passwordCheck}
                  onChange={handlePasswordCheckChange}
                />
                <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                  {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </span>
              </div>
              {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button type="button" onClick={handleNext} className="next_btn">다음</button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="form_section_title">기업 정보</h3>
            <div className="form_group">
              <label>기업명</label>
              <input name="companyName" value={form.companyName} onChange={handleInputChange} />
              {errors.companyName && <ErrorMessage>{errors.companyName}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>대표자 성함</label>
              <input name="ceoName" value={form.ceoName} onChange={handleInputChange} />
              {errors.ceoName && <ErrorMessage>{errors.ceoName}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>개업년월일</label>
              <input
                name="startDate"
                value={form.startDate}
                onChange={handleInputChange}
                placeholder="숫자만 입력해주세요 (예: 20010101)"
                maxLength={8}
              />
              {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
            </div>

            <div className="form_group biznum_group">
              <div className="label_row">
                <label>사업자등록번호</label>
                <button
                  type="button"
                  className="no_reg_btn"
                  onClick={() =>
                    showModalMessage({
                      type: 'error',
                      title: '가입 불가',
                      message: '사업자등록번호가 없는 경우 가입이 불가능합니다.',
                      onConfirm: () => setShowModal(false),
                    })
                  }
                >
                  사업자등록번호가 없는 경우
                </button>
              </div>
              <div className="biznum_row">
                <input
                  name="regNumber"
                  value={form.regNumber}
                  onChange={handleInputChange}
                  placeholder="숫자만 입력해주세요 (예: 1234567890)"
                  maxLength={10}
                />
                <button type="button" onClick={handleRegCheck}>인증하기</button>
              </div>
              {errors.regNumber && <ErrorMessage>{errors.regNumber}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>기업 소개</label>
              <textarea
                name="companyIntro"
                value={form.companyIntro}
                onChange={handleInputChange}
                rows={4}
                placeholder="50자 이상 입력해주세요."
              />
              {errors.companyIntro && <ErrorMessage>{errors.companyIntro}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button type="button" onClick={handlePrev} className="prev_btn">이전</button>
              <button type="button" onClick={handleNext} className="next_btn">다음</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="form_section_title">담당자 정보</h3>
            <div className="form_group">
              <label>담당자 성함</label>
              <input name="managerName" value={form.managerName} onChange={handleInputChange} />
              {errors.managerName && <ErrorMessage>{errors.managerName}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>담당자 전화번호</label>
              <input
                name="managerPhone"
                value={form.managerPhone}
                onChange={handleManagerPhoneChange}  // 수정된 전화번호 핸들러
                placeholder="숫자만 입력해주세요 (예: 010-1234-5678)"
              />
              {errors.managerPhone && <ErrorMessage>{errors.managerPhone}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>담당자 이메일</label>
              <input name="managerEmail" value={form.managerEmail} onChange={handleInputChange} />
              {errors.managerEmail && <ErrorMessage>{errors.managerEmail}</ErrorMessage>}
            </div>

            <div className="form_group checkbox_group">
              <label>
                <input type="checkbox" name="agree" checked={form.agree} onChange={handleInputChange} />
                이용약관 및 개인정보처리방침에 동의합니다.
              </label>
              {errors.agree && <ErrorMessage>{errors.agree}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button type="button" onClick={handlePrev} className="prev_btn">이전</button>
              <button type="submit" className="next_btn">가입하기</button>
            </div>
          </>
        )}
      </form>
      {showModal && <Modal {...modalProps} />}
    </div>
  );
};

export default CompanySignPage;
