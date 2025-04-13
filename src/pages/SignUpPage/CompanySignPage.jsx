import React, { useState } from 'react';
import {
  BasicInput,
  PasswordInput,
  EmailInputWithCheck,
} from '@/components/common/CommonInputs';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import { validateEmail, validatePassword } from '@/utils/validation';
import { formatPhoneNumber, formatNumbersOnly } from '@/utils/format';

const CompanySignPage = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    companyName: '',
    ceoName: '',
    startDate: '',
    regNumber: '',
    companyIntro: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [emailChecked, setEmailChecked] = useState(false);
  const [regChecked, setRegChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (name === 'managerPhone') {
      newValue = formatPhoneNumber(newValue);
    } else if (['startDate', 'regNumber'].includes(name)) {
      newValue = formatNumbersOnly(newValue);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleEmailCheck = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      return;
    }

    const duplicated = form.email === 'company@test.com';
    setModal({
      type: duplicated ? 'error' : 'success',
      title: duplicated ? '중복된 이메일' : '사용 가능',
      message: duplicated
        ? '이미 가입된 이메일입니다.'
        : '사용 가능한 이메일입니다.',
      onConfirm: () => {
        setModal(null);
        setEmailChecked(!duplicated);
        if (!duplicated) {
          setErrors((prev) => ({ ...prev, email: '' }));
        }
      },
    });
  };

  const handleRegCheck = () => {
    if (!form.ceoName || !form.startDate || !form.regNumber) {
      setModal({
        type: 'error',
        title: '입력값 누락',
        message: '대표자 성함, 개업년월일, 사업자등록번호를 모두 입력해주세요.',
        onConfirm: () => setModal(null),
      });
      return;
    }

    if (form.regNumber.length !== 10) {
      setModal({
        type: 'error',
        title: '잘못된 사업자등록번호',
        message: '사업자등록번호는 정확히 10자리여야 합니다.',
        onConfirm: () => setModal(null),
      });
      return;
    }

    const isValid = form.regNumber === '1234567890';

    setModal({
      type: isValid ? 'success' : 'error',
      title: isValid ? '인증 완료' : '인증 실패',
      message: isValid
        ? '사업자등록번호가 인증되었습니다.'
        : '등록되지 않은 사업자등록번호입니다.',
      onConfirm: () => {
        setModal(null);
        if (isValid) setRegChecked(true);
      },
    });
  };

  const handleNext = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.email) newErrors.email = '이메일을 입력해주세요.';
      else if (!validateEmail(form.email)) newErrors.email = '이메일 형식이 올바르지 않습니다.';
      else if (!emailChecked) newErrors.email = '이메일 중복확인을 해주세요.';
      if (!validatePassword(form.password)) newErrors.password = '비밀번호 조건을 확인해주세요.';
      if (form.password !== form.passwordCheck) newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (step === 1) {
      if (!form.companyName) newErrors.companyName = '기업명을 입력해주세요.';
      if (!form.ceoName) newErrors.ceoName = '대표자명을 입력해주세요.';
      if (!form.startDate) newErrors.startDate = '개업년월일을 입력해주세요.';
      if (!form.regNumber) newErrors.regNumber = '사업자등록번호를 입력해주세요.';
      else if (!regChecked) newErrors.regNumber = '사업자등록번호 인증이 필요합니다.';
      if (!form.companyIntro || form.companyIntro.length < 10) newErrors.companyIntro = '기업 소개를 10자 이상 입력해주세요.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (!form.agree) {
      setErrors({ agree: '약관에 동의해주세요.' });
      return;
    }

    alert('기업 회원가입 완료!');
  };

  return (
    <div className="company_signup_page">
      <button onClick={onBack}>← 뒤로가기</button>

      {step === 0 && (
        <>
          <h2>기업 회원가입 - 기본 정보</h2>

          <EmailInputWithCheck
            value={form.email}
            onChange={handleChange}
            onCheck={handleEmailCheck}
            error={errors.email}
          />

          <PasswordInput
            label="비밀번호"
            name="password"
            value={form.password}
            onChange={handleChange}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <PasswordInput
            label="비밀번호 확인"
            name="passwordCheck"
            value={form.passwordCheck}
            onChange={handleChange}
            show={showPasswordCheck}
            onToggle={() => setShowPasswordCheck(!showPasswordCheck)}
            error={errors.passwordCheck}
          />

          <div className="button_group">
            <button className="next_btn" onClick={handleNext}>다음</button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2>기업 정보</h2>

          <BasicInput label="기업명" name="companyName" value={form.companyName} onChange={handleChange} error={errors.companyName} />
          <BasicInput label="대표자 성함" name="ceoName" value={form.ceoName} onChange={handleChange} error={errors.ceoName} />
          <BasicInput label="개업년월일 (예: 20200101)" name="startDate" value={form.startDate} onChange={handleChange} error={errors.startDate} />

          <div className="form_group">
            <label>사업자등록번호</label>
            <div className="input_row">
              <input
                name="regNumber"
                value={form.regNumber}
                onChange={handleChange}
                placeholder="숫자만 입력해주세요"
                className={errors.regNumber ? 'error' : ''}
                maxLength={10}
              />
              <button type="button" onClick={handleRegCheck}>인증하기</button>
            </div>
            {errors.regNumber && <ErrorMessage>{errors.regNumber}</ErrorMessage>}
          </div>

          <BasicInput label="기업 소개" name="companyIntro" value={form.companyIntro} onChange={handleChange} error={errors.companyIntro} />

          <div className="button_group">
            <button className="prev_btn" onClick={handlePrev}>이전</button>
            <button className="next_btn" onClick={handleNext}>다음</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>담당자 정보</h2>

          <BasicInput label="담당자 성함" name="managerName" value={form.managerName} onChange={handleChange} error={errors.managerName} />
          <BasicInput label="담당자 전화번호" name="managerPhone" value={form.managerPhone} onChange={handleChange} error={errors.managerPhone} />
          <BasicInput label="담당자 이메일" name="managerEmail" value={form.managerEmail} onChange={handleChange} error={errors.managerEmail} />

          <div className="form_group checkbox_group">
            <label>
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
              이용약관 및 개인정보 처리방침에 동의합니다.
            </label>
            {errors.agree && <ErrorMessage>{errors.agree}</ErrorMessage>}
          </div>

          <div className="button_group">
            <button className="prev_btn" onClick={handlePrev}>이전</button>
            <button className="next_btn" onClick={handleSubmit}>가입하기</button>
          </div>
        </>
      )}

      {modal && <Modal {...modal} />}
    </div>
  );
};

export default CompanySignPage;

