import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import LabeledInput from '@/components/common/LabeledInput';
import Modal from '@/components/common/Modal';
import {
  validateName,
  isValidDate,
  isValidBizNumber,
} from '@/utils/validation';
import './FindCompanyEmailPage.scss';

const FindCompanyEmailPage = ({ onBack }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ceoName: '',
    startDate: '',
    businessNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'ceoName' && validateName(value)) delete next.ceoName;
      if (name === 'startDate' && isValidDate(value)) delete next.startDate;
      if (name === 'businessNumber' && isValidBizNumber(value)) delete next.businessNumber;
      return next;
    });
  };

  const handleStartDateChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    if (val.length >= 5) {
      val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    }
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

  const handleSearch = () => {
    const newErrors = {};
    if (!validateName(form.ceoName)) newErrors.ceoName = '대표자명을 입력해주세요.';
    if (!isValidDate(form.startDate)) newErrors.startDate = '개업년월일 형식이 올바르지 않습니다.';
    if (!isValidBizNumber(form.businessNumber)) newErrors.businessNumber = '사업자등록번호 형식이 올바르지 않습니다.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const dummyCompany = {
      ceoName: '기업',
      startDate: '1111-11-11',
      businessNumber: '1234567890',
      email: 'company@qwe.qwe',
    };

    const formattedDate = form.startDate.length === 10
      ? form.startDate
      : form.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

    if (
      form.ceoName === dummyCompany.ceoName &&
      formattedDate === dummyCompany.startDate &&
      form.businessNumber === dummyCompany.businessNumber
    ) {
      setModal({
        type: 'success',
        title: '이메일 찾기 완료',
        message: `기업 이메일은 ${dummyCompany.email} 입니다.`,
        onConfirm: () => {
          setModal(null);
          navigate('/login');
        },
      });
    } else {
      setModal({
        type: 'error',
        title: '일치하는 정보 없음',
        message: '입력하신 정보와\n일치하는 이메일을 찾을 수 없습니다.',
        onConfirm: () => setModal(null),
      });
    }
  };

  return (
    <div className="find_company_email_page">
      <div className="find_company_email_card">
        <div className="title">
          <FaBuilding className="icon" />
          <h2>이메일 찾기</h2>
        </div>

        <LabeledInput
          label="대표자명"
          name="ceoName"
          value={form.ceoName}
          onChange={handleChange}
          placeholder="대표자명을 입력해 주세요"
          error={errors.ceoName}
        />

        <LabeledInput
          label="개업년월일"
          name="startDate"
          value={form.startDate}
          onChange={handleStartDateChange}
          placeholder="숫자만 입력해 주세요"
          error={errors.startDate}
          inputMode="numeric"
        />

        <LabeledInput
          label="사업자등록번호"
          name="businessNumber"
          value={form.businessNumber}
          onChange={handleBizNumberChange}
          placeholder="숫자만 입력해 주세요"
          error={errors.businessNumber}
          inputMode="numeric"
        />

        <div className="button_group">
          <div className="dual_buttons">
            <button className="back_btn" onClick={onBack}>뒤로가기</button>
            <button className="next_btn" onClick={handleSearch}>이메일 찾기</button>
          </div>
        </div>

        {modal && <Modal {...modal} />}
      </div>
    </div>
  );
};

export default FindCompanyEmailPage;
