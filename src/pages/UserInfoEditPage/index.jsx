import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import LabeledInput from '@/components/common/LabeledInput';
import { validateEmail, validatePassword, isValidPhone } from '@/utils/validation';
import { INTEREST_OPTIONS } from '@/utils/signUpInfoOptions';
import './UserInfoEditPage.scss';
import axiosInstance from '@/apis/axiosInstance';
import Modal from '@/components/Modal';

const MAX_PHONE_LENGTH = 11;

const UserInfoEditPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    phone: '',
    birth: '',
    gender: '',
    interests: [],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
    buttons: [],
  });
  const location = useLocation();
  const { userId } = location.state;

  console.log('userEdit의 유저ID', userId);

  useEffect(() => {
    const fetchUserPersonalInfo = async () => {
      try {
        const response = await axiosInstance.get(`/user/${userId}`);

        const resUserInfoEdit = response.data.data;

        setForm((prev) => ({
          ...prev,
          name: resUserInfoEdit.name,
          email: resUserInfoEdit.email,
          birth: resUserInfoEdit.birthday,
          gender: resUserInfoEdit.gender,
          phone: resUserInfoEdit.phone_number,
          interests: resUserInfoEdit.interests || [],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPersonalInfo();
  }, []);

  console.log('📌난 개인정보 잘 들어가있지', form);

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

  const handleFinalSubmit = async () => {
    console.log('[회원 정보 수정 됨] handleFinalSubmit 실행됨 ✅');

    try {
      await axiosInstance.patch(`/user/${userId}`, {
        phone_number: form.phone,
        password: form.password,
        password_check: form.passwordCheck,
        interests: form.interests,
      });

      setModalContent({
        title: '수정 완료',
        description: '회원 정보가 정상적으로 수정되었습니다!',
        buttons: [
          {
            label: '확인',
            className: 'confirm',
            onClick: () => {
              setIsModalOpen(false);
              navigate('/mypage/user'); // ← 수정 후 이동할 페이지
            },
          },
        ],
      });
      setIsModalOpen(true);
    } catch (err) {
      setModalContent({
        title: '수정 실패',
        description: `문제가 발생했습니다. 다시 시도해주세요! ${err}`,
        buttons: [
          {
            label: '닫기',
            className: 'cancel',
            onClick: () => setIsModalOpen(false),
          },
        ],
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="userinfo_edit_page">
      <div className="userinfo_edit_card">
        <div className="userinfo_warpper">
          <div className="signup_title">
            <h2>회원 정보 수정</h2>
          </div>

          <LabeledInput label="이름" name="name" value={form.name} disabled />

          <div className="form_group">
            <label>이메일</label>
            <div className="input_row">
              <input name="email" value={form.email} disabled />
            </div>
          </div>

          <div className="form_group password_row">
            <label>이전 비밀번호</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="이전 비밀번호를 입력해주세요"
              className={errors.password ? 'error' : ''}
            />
            <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          <div className="form_group password_row">
            <label>새로운 비밀번호</label>
            <input
              type={showPasswordCheck ? 'text' : 'password'}
              name="passwordCheck"
              value={form.passwordCheck}
              onChange={handleChange}
              placeholder="새로운 비밀번호를 입력해주세요"
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

          <LabeledInput label="생년월일" name="birth" value={form.birth} disabled />

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
                disabled
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
                disabled
              >
                여성
              </button>
            </div>
          </div>
        </div>
        <div className="options_wrapper">
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
        </div>

        <div className="button_group">
          <button className="info_edit_btn" onClick={handleFinalSubmit}>
            회원 정보 수정 하기
          </button>
          <p className="account_deletion">회원 탈퇴</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        buttons={modalContent.buttons}
      />
    </div>
  );
};

export default UserInfoEditPage;
