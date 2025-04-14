import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ErrorMessage from '@/components/common/ErrorMessage';
import Modal from '@/components/common/Modal';
import { validateName, isValidPhone, isValidBirth } from '@/utils/validation';
import './FindUserEmailPage.scss';

const FindUserEmailPage = ({ onBack }) => {
  const [form, setForm] = useState({ name: '', phone: '', birth: '' });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 11);
      newValue = newValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    if (name === 'birth') {
      newValue = value.replace(/[^0-9]/g, '').slice(0, 8);
      newValue = newValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    const updatedForm = { ...form, [name]: newValue };

    const updatedErrors = { ...errors };
    if (name === 'name' && validateName(newValue)) delete updatedErrors.name;
    if (name === 'phone' && isValidPhone(newValue)) delete updatedErrors.phone;
    if (name === 'birth' && isValidBirth(newValue)) delete updatedErrors.birth;

    setForm(updatedForm);
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(form.name)) newErrors.name = '이름을 입력해 주세요.';
    if (!isValidPhone(form.phone)) newErrors.phone = '전화번호 형식이 올바르지 않습니다.';
    if (!isValidBirth(form.birth)) newErrors.birth = '생년월일 형식이 올바르지 않습니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 💡 실제 API 연동은 나중에 연결
    if (
      form.name === '홍길동' &&
      form.phone === '010-1234-5678' &&
      form.birth === '1990-01-01'
    ) {
      setModal({
        type: 'success',
        message: '가입된 이메일은 "gildong@email.com" 입니다.',
        onClose: () => setModal(null),
      });
    } else {
      setModal({
        type: 'error',
        message: '일치하는 회원 정보를 찾을 수 없습니다.',
        onClose: () => setModal(null),
      });
    }
  };

  return (
    <div className="finduser_page">
      <div className="finduser_card">
        <div className="finduser_title">
          <FaUser className="icon" />
          <h2>개인 회원 이메일 찾기</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해 주세요"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </div>

          <div className="form_group">
            <label>전화번호</label>
            <input
              type="text"
              name="phone"
              placeholder="숫자만 입력해 주세요"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </div>

          <div className="form_group">
            <label>생년월일</label>
            <input
              type="text"
              name="birth"
              placeholder="숫자만 입력해 주세요"
              value={form.birth}
              onChange={handleChange}
              className={errors.birth ? 'error' : ''}
            />
            {errors.birth && <ErrorMessage>{errors.birth}</ErrorMessage>}
          </div>

          <div className="button_row">
            <button type="button" className="back_btn" onClick={onBack}>
              뒤로가기
            </button>
            <button type="submit" className="submit_btn">
              이메일 찾기
            </button>
          </div>
        </form>
      </div>

      {modal && <Modal {...modal} />}
    </div>
  );
};

export default FindUserEmailPage;
