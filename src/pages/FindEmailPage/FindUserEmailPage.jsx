import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import LabeledInput from '@/components/common/LabeledInput';
import Modal from '@/components/common/Modal';
import {
  validateName,
  isValidPhone,
  isValidBirth,
} from '@/utils/validation';
import './FindUserEmailPage.scss';

const FindUserEmailPage = ({ onBack }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    birth: '',
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);

  const dummyUser = {
    name: '개인',
    phone: '010-0000-0000',
    birth: '1111-11-11',
    email: 'user@qwe.qwe',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && validateName(value)) delete next.name;
      if (name === 'phone' && isValidPhone(value)) delete next.phone;
      if (name === 'birth' && isValidBirth(value)) delete next.birth;
      return next;
    });
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    if (val.length === 11) val = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (val.length >= 7) val = val.replace(/(\d{3})(\d{3,4})/, '$1-$2');
    handleChange({ target: { name: 'phone', value: val } });
  };

  const handleBirthChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    if (val.length >= 5) val = val.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3').replace(/-$/, '');
    handleChange({ target: { name: 'birth', value: val } });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(form.name)) newErrors.name = '이름을 입력해주세요.';
    if (!isValidPhone(form.phone)) newErrors.phone = '전화번호 형식이 올바르지 않습니다.';
    if (!isValidBirth(form.birth)) newErrors.birth = '생년월일 형식이 올바르지 않습니다.';
    return newErrors;
  };

  const handleSearch = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formattedBirth = form.birth.length === 10
      ? form.birth
      : form.birth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

    const isMatch =
      form.name === dummyUser.name &&
      form.phone === dummyUser.phone &&
      formattedBirth === dummyUser.birth;

    setModal({
      type: isMatch ? 'success' : 'error',
      title: isMatch ? '이메일 찾기 완료' : '일치하는 정보 없음',
      message: isMatch
        ? `회원님의 이메일은 ${dummyUser.email} 입니다.`
        : '입력하신 정보와\n일치하는 이메일을 찾을 수 없습니다.',
      onConfirm: () => {
        setModal(null);
        if (isMatch) navigate('/login');
      },
    });
  };

  return (
    <div className="find_email_page">
      <div className="find_email_card">
        <div className="title">
          <FaUser className="icon" />
          <h2>이메일 찾기</h2>
        </div>

        <LabeledInput
          label="이름"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름을 입력해 주세요"
          error={errors.name}
        />
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

export default FindUserEmailPage;
