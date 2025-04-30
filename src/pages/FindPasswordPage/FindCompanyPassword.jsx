import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import LabeledInput from '@/components/common/LabeledInput';
import Modal from '@/components/common/Modal';
import {
  validateName,
  isValidDate,
  isValidBizNumber,
  validateEmail,
  validatePassword,
} from '@/utils/validation';
import './FindCompanyPasswordPage.scss';
import { verifyCompanyPasswordInfoApi, resetCompanyPasswordApi } from '@/apis/authApi';

const FindCompanyPassword = ({ onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [companyToken, setCompanyToken] = useState('');
  const [form, setForm] = useState({
    email: '',
    ceoName: '',
    startDate: '',
    businessNumber: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'email' && validateEmail(value)) delete next.email;
      if (name === 'ceoName' && validateName(value)) delete next.ceoName;
      if (name === 'startDate' && isValidDate(value)) delete next.startDate;
      if (name === 'businessNumber' && isValidBizNumber(value)) delete next.businessNumber;
      if (name === 'password' && validatePassword(value)) delete next.password;
      if (name === 'passwordConfirm' && value === form.password) delete next.passwordConfirm;
      return next;
    });
  };

  const handleStartDateChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    if (val.length >= 5) val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    handleChange({ target: { name: 'startDate', value: val } });
  };

  const handleBizNumberChange = (e) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    handleChange({ target: { name: 'businessNumber', value: val } });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!validateEmail(form.email)) newErrors.email = '이메일 형식을 확인해주세요.';
    if (!validateName(form.ceoName)) newErrors.ceoName = '대표자명을 입력해주세요.';
    if (!isValidDate(form.startDate)) newErrors.startDate = '개업년월일 형식이 올바르지 않습니다.';
    if (!isValidBizNumber(form.businessNumber)) newErrors.businessNumber = '사업자등록번호 형식이 올바르지 않습니다.';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!validatePassword(form.password)) newErrors.password = '비밀번호는 8자 이상, 영어/숫자/특수문자를 포함해야 합니다.';
    if (form.password !== form.passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    return newErrors;
  };

  const handleSearch = async () => {
    const newErrors = validateStep1();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await verifyCompanyPasswordInfoApi({
        email: form.email,
        ceo_name: form.ceoName,
        opening_date: form.startDate.replace(/-/g, ''),
        business_reg_number: form.businessNumber,
      });

      if (response.status === 'success') {
        setCompanyToken(response.data.reset_token);
        setStep(2);
      } else {
        throw new Error('정보 불일치');
      }
    } catch (error) {
      setModal({
        type: 'error',
        title: '인증 실패',
        message: '입력하신 정보와 일치하는 계정을 찾을 수 없습니다.',
        onConfirm: () => setModal(null),
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await resetCompanyPasswordApi({
        reset_token: companyToken,
        new_password: form.password,
        confirm_password: form.passwordConfirm,
      });

      setModal({
        type: 'success',
        title: '비밀번호 재설정 완료',
        message: '새로운 비밀번호로 로그인해 주세요.',
        onConfirm: () => {
          setModal(null);
          navigate('/login');
        },
      });
    } catch (err) {
      setModal({
        type: 'error',
        title: '재설정 실패',
        message: '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.',
        onConfirm: () => setModal(null),
      });
    }
  };

  return (
    <div className="find_company_password_page">
      <div className="find_company_password_card">
        <div className="title">
          <FaBuilding className="icon" />
          <h2>{step === 1 ? '비밀번호 찾기' : '비밀번호 재설정'}</h2>
        </div>

        {step === 1 && (
          <>
            <LabeledInput label="이메일" name="email" value={form.email} onChange={handleChange} placeholder="가입한 이메일을 입력해 주세요" error={errors.email} />
            <LabeledInput label="대표자명" name="ceoName" value={form.ceoName} onChange={handleChange} placeholder="대표자명을 입력해 주세요" error={errors.ceoName} />
            <LabeledInput label="개업년월일" name="startDate" value={form.startDate} onChange={handleStartDateChange} placeholder="숫자만 입력해 주세요" error={errors.startDate} inputMode="numeric" />
            <LabeledInput label="사업자등록번호" name="businessNumber" value={form.businessNumber} onChange={handleBizNumberChange} placeholder="숫자만 입력해 주세요" error={errors.businessNumber} inputMode="numeric" />
            <div className="button_group">
              <div className="dual_buttons">
                <button className="back_btn" onClick={onBack}>뒤로가기</button>
                <button className="next_btn" onClick={handleSearch}>비밀번호 찾기</button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={form.email}
              readOnly
              hidden
            />
            <div className="input_group">
              <label htmlFor="password">새 비밀번호</label>
              <div className="input_wrapper">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="새 비밀번호 입력" className={errors.password ? 'error' : ''} autoComplete="new-password" />
                <span className="right_icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </span>
              </div>
              {errors.password && <p className="input_error">{errors.password}</p>}
            </div>

            <div className="input_group">
              <label htmlFor="passwordConfirm">새 비밀번호 확인</label>
              <div className="input_wrapper">
                <input id="passwordConfirm" name="passwordConfirm" type={showConfirm ? 'text' : 'password'} value={form.passwordConfirm} onChange={handleChange} placeholder="새 비밀번호 확인 입력" className={errors.passwordConfirm ? 'error' : ''} autoComplete="new-password" />
                <span className="right_icon" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </span>
              </div>
              {errors.passwordConfirm && <p className="input_error">{errors.passwordConfirm}</p>}
            </div>

            <div className="button_group">
              <div className="dual_buttons">
                <button type="button" className="back_btn" onClick={() => setStep(1)}>이전</button>
                <button type="submit" className="next_btn">비밀번호 재설정</button>
              </div>
            </div>
          </form>
        )}

        {modal && <Modal {...modal} />}
      </div>
    </div>
  );
};

export default FindCompanyPassword;
