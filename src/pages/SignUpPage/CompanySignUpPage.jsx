import { verifyBusinessNumber } from '@/apis/companyApi';
import React, { useState } from 'react';
import { FaBuilding } from 'react-icons/fa';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import Modal from '@/components/common/Modal';
import ErrorMessage from '@/components/common/ErrorMessage';
import LabeledInput from '@/components/common/LabeledInput';
import {
  validateEmail,
  isValidPhone,
  isValidDate,
  isValidBizNumber,
  validateCompanyStep0,
  validateCompanyStep1,
  validateCompanyStep2,
} from '@/utils/validation';
import { useNavigate } from 'react-router-dom';
import './CompanySignUpPage.scss';

const CompanySignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    companyName: '',
    ceoName: '',
    startDate: '',
    businessNumber: '',
    companyDesc: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    termsAll: false,
    terms1: false, terms2: false, terms3: false,
    terms4: false, terms5: false, terms6: false,
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [bizVerified, setBizVerified] = useState(false);
  const [modal, setModal] = useState(null);

  const showModal = (type, title, message, callback) => {
    setModal({
      type,
      title,
      message,
      onConfirm: () => {
        if (callback) callback();
        setModal(null);
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'email' && validateEmail(value)) delete next.email;
      if (name === 'password' && value && validateCompanyStep0({ ...form, password: value }, true).password === undefined) delete next.password;
      if (name === 'passwordCheck' && value === form.password) delete next.passwordCheck;
      if (name === 'companyName' && value) delete next.companyName;
      if (name === 'ceoName' && value) delete next.ceoName;
      if (name === 'companyDesc' && value.length >= 50) delete next.companyDesc;
      if (name === 'managerName' && value) delete next.managerName;
      if (name === 'managerEmail' && validateEmail(value)) delete next.managerEmail;
      return next;
    });
  };

  const handleStartDateChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    if (val.length >= 5) val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    setForm((prev) => ({ ...prev, startDate: val }));
    if (isValidDate(val)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.startDate;
        return next;
      });
    }
  };

  const handleBizNumberChange = (e) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setForm((prev) => ({ ...prev, businessNumber: val }));
    if (isValidBizNumber(val)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.businessNumber;
        return next;
      });
    }
  };

  const handleManagerPhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    if (val.length === 11) val = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (val.length >= 7) val = val.replace(/(\d{3})(\d{3,4})/, '$1-$2');
    setForm((prev) => ({ ...prev, managerPhone: val }));
    if (isValidPhone(val)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.managerPhone;
        return next;
      });
    }
  };

  const handleEmailCheck = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      return;
    }

    const isDuplicate = form.email === 'test@company.com';
    if (isDuplicate) {
      showModal('error', '중복된 이메일', '이미 등록된 이메일입니다.');
    } else {
      showModal('success', '사용 가능', '사용 가능한 이메일입니다.', () => {
        setEmailChecked(true);
      });
    }
  };

  const handleBizCheck = async () => {
    const { businessNumber, startDate, ceoName } = form;

    try {
      const result = await verifyBusinessNumber(
        businessNumber,
        startDate.replace(/-/g, ''),
        ceoName
      );

      const status = result.data?.[0];

      if (!status || status.valid !== "01") {
        showModal('error', '인증 실패', '유효하지 않은 사업자등록번호입니다.');
        return;
      }

      showModal('success', '인증 성공', '유효한 사업자등록번호입니다.', () => {
        setBizVerified(true);
      });
    } catch (err) {
      console.error('사업자 인증 에러:', err);
      showModal('error', '서버 오류', '국세청과의 연결에 실패했습니다.');
    }
  };

  const handleNext = () => {
    let newErrors = {};

    if (step === 0) {
      newErrors = validateCompanyStep0(form, emailChecked);
      if (newErrors.email === '이메일 중복확인을 해주세요.') {
        showModal('error', '중복확인 필요', newErrors.email);
        return;
      }
    }

    if (step === 1) {
      newErrors = validateCompanyStep1(form, bizVerified);
    
      const keys = Object.keys(newErrors);
      if (
        keys.length === 1 &&
        keys[0] === 'businessNumber' &&
        newErrors.businessNumber === '사업자등록번호 인증이 필요합니다.'
      ) {
        showModal('error', '인증 필요', newErrors.businessNumber);
        return;
      }
    }
    

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const newErrors = validateCompanyStep2(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(3);
    }
  };

  const validateTerms = () => {
    if (!form.terms1 || !form.terms2 || !form.terms3) {
      return { agree: '필수 약관에 모두 동의해주세요.' };
    }
    return {};
  };

  const handleFinalSubmit = () => {
    const error = validateTerms();
    setErrors(error);
  
    if (Object.keys(error).length > 0) return;
  
    showModal('success', '회원가입 완료', '정상적으로 회원가입이 완료되었습니다.', () => {
      navigate('/login');
    });
  };

  const toggleCheck = (key) => {
    const next = { ...form, [key]: !form[key] };
    next.termsAll =
      next.terms1 &&
      next.terms2 &&
      next.terms3 &&
      next.terms4 &&
      next.terms5 &&
      next.terms6;
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
    <div className="company_signup_page">
      <div className="step_indicator">
  {[
    { step: 0, main: '1단계', sub: '기본정보' },
    { step: 1, main: '2단계', sub: '기업정보' },
    { step: 2, main: '3단계', sub: '담당자정보' },
    { step: 3, main: '4단계', sub: '약관 동의' }
  ].map((item, idx) => (
    <React.Fragment key={item.step}>
      <div className="step_wrapper">
        <div className={`step ${step === item.step ? 'active' : ''}`}>
          <div className="step_main">{item.main}</div>
          <div className="step_sub">{item.sub}</div>
        </div>
      </div>
      {idx < 3 && <div className="step_line" />}
    </React.Fragment>
  ))}
</div>

      <div className="signup_card">
        <div className="signup_title">
          <FaBuilding className="icon" />
          <h2>기업 회원가입</h2>
        </div>

        {step === 0 && (
          <>
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
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="영문+숫자+특수문자 8자 이상"
                className={errors.password ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPw(!showPw)}>
                {showPw ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>

            <div className="form_group password_row">
              <label>비밀번호 확인</label>
              <input
                type={showPwCheck ? 'text' : 'password'}
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={handleChange}
                className={errors.passwordCheck ? 'error' : ''}
              />
              <span className="eye_icon" onClick={() => setShowPwCheck(!showPwCheck)}>
                {showPwCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button className="next_btn" onClick={handleNext}>다음</button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <LabeledInput label="기업명" name="companyName" value={form.companyName} onChange={handleChange} placeholder="기업명을 입력해주세요" error={errors.companyName} />
            <LabeledInput label="대표자명" name="ceoName" value={form.ceoName} onChange={handleChange} placeholder="대표자 성함을 입력해주세요" error={errors.ceoName} />
            <LabeledInput label="개업년월일" name="startDate" value={form.startDate} onChange={handleStartDateChange} placeholder="YYYYMMDD" error={errors.startDate} inputMode="numeric" />

            <div className="form_group">
              <label>사업자등록번호</label>
              <div className="input_row">
                <input name="businessNumber" value={form.businessNumber} onChange={handleBizNumberChange} disabled={bizVerified} className={errors.businessNumber ? 'error' : ''} />
                <button type="button" onClick={handleBizCheck} disabled={bizVerified} style={{ backgroundColor: bizVerified ? '#ccc' : undefined, cursor: bizVerified ? 'not-allowed' : 'pointer' }}>
                  {bizVerified ? '인증됨' : '인증하기'}
                </button>
              </div>
              {bizVerified && <p style={{ fontSize: '13px', color: '#0f8c3b', marginTop: '4px' }}>사업자등록번호가 인증되었습니다.</p>}
              {errors.businessNumber && <ErrorMessage>{errors.businessNumber}</ErrorMessage>}
            </div>

            <div className="form_group">
              <label>기업 소개</label>
              <textarea
                name="companyDesc"
                value={form.companyDesc}
                onChange={handleChange}
                rows="8"
                placeholder="50자 이상 입력해주세요"
                className={errors.companyDesc ? 'error' : ''}
              />
              <div style={{ fontSize: '13px', textAlign: 'right', marginTop: '4px', color: form.companyDesc.length < 50 ? '#e53935' : '#888' }}>
                {form.companyDesc.length}/50자
              </div>
              {errors.companyDesc && <ErrorMessage>{errors.companyDesc}</ErrorMessage>}
            </div>

            <div className="button_group">
              <button className="prev_btn" onClick={() => setStep(0)}>이전</button>
              <button className="next_btn" onClick={handleNext}>다음</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <LabeledInput label="담당자 이름" name="managerName" value={form.managerName} onChange={handleChange} placeholder="담당자 이름을 입력해주세요" error={errors.managerName} />
            <LabeledInput label="담당자 전화번호" name="managerPhone" value={form.managerPhone} onChange={handleManagerPhoneChange} placeholder="숫자만 입력해 주세요" error={errors.managerPhone} inputMode="numeric" />
            <LabeledInput label="담당자 이메일" name="managerEmail" value={form.managerEmail} onChange={handleChange} placeholder="이메일을 입력해주세요" error={errors.managerEmail} />

            <div className="button_group">
              <button className="prev_btn" onClick={() => setStep(1)}>이전</button>
              <button className="next_btn" onClick={handleSubmit}>다음</button>
            </div>
          </>
        )}

{step === 3 && (
  <div className="terms_step">
    <div className="checkbox_row all_agree">
      <input
        type="checkbox"
        checked={form.termsAll}
        onChange={handleAllTermsToggle}
      />
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
            n === 2 ? '기업회원 이용약관' :
            '위치기반 서비스 이용약관'}
          </label>
          <button
            className="view_detail"
            onClick={() => setModal({
              type: 'term',
              key: n === 1 ? 'privacy_policy.html' :
                  n === 2 ? 'company_terms.html' :
                  'location_terms.html',
            })}
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

    <div className="button_group">
      <button className="prev_btn" onClick={() => setStep(2)}>이전</button>
      <button className="next_btn" onClick={handleFinalSubmit}>회원가입 완료</button>
    </div>
  </div>
)}
</div>

{modal?.type === 'term' && (
  <Modal
    className="term_modal"
    type="green"
    title="약관 보기"
    message={
      <iframe
        src={`/terms/${modal.key}`}
        title="약관 보기"
      />
    }
    onConfirm={() => setModal(null)}
  />
)}

{modal?.type !== 'term' && modal && <Modal {...modal} />}
</div>
);
};

export default CompanySignUpPage;