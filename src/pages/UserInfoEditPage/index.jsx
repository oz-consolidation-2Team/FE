import { validateEmail, validatePassword, isValidPhone } from '@/utils/validation';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUserApi } from '@/apis/authApi';
import { INTEREST_OPTIONS } from '@/utils/signUpInfoOptions';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import LabeledInput from '@/components/common/LabeledInput';
import axiosInstance from '@/apis/axiosInstance';
import Modal from '@/components/Modal';
import './UserInfoEditPage.scss';

const MAX_PHONE_LENGTH = 11;

const UserInfoEditPage = () => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    current_password: '',
    phone: '',
    birth: '',
    gender: '',
    interests: [],
  });
  const [modalInfo, setModalInfo] = useState({
    title: '',
    description: '',
    buttons: [],
  });

  const openModal = (info) => {
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const location = useLocation();
  const { userId } = location.state;

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
        if (error.response) {
          const status = error.response.status;

          if (status === 422) {
            console.error('요청 데이터가 잘못되었습니다. (422)');
          } else {
            console.error(`서버 오류 발생 (${status})`);
          }
        }
      }
    };
    fetchUserPersonalInfo();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));

    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && val) delete next.name;
      if (name === 'email' && validateEmail(val)) delete next.email;
      if (name === 'password' && validatePassword(val)) delete next.password;
      if (name === 'current_password' && val === form.password) delete next.current_password;
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
      const payload = {
        phone_number: form.phone,
        interests: form.interests,
      };

      // 비밀번호 입력했을 때만 포함
      if (form.current_password && form.password) {
        payload.current_password = form.current_password;
        payload.password = form.password;
      }

      await axiosInstance.patch(`/user/${userId}`, payload);

      openModal({
        title: '수정 완료',
        description: '회원 정보가 정상적으로 수정되었습니다!',
        buttons: [
          {
            label: '확인',
            className: 'modal_btn_green',
            onClick: () => {
              closeModal();
              navigate('/mypage/user');
            },
          },
        ],
      });
    } catch (err) {
      openModal({
        title: '수정 실패',
        description: `문제가 발생했습니다. 다시 시도해주세요!, ${err}`,
        buttons: [
          {
            label: '닫기',
            className: 'modal_btn_green',
            onClick: closeModal,
          },
        ],
      });
    }
  };

  const handleUserDelete = () => {
    openModal({
      title: '회원 탈퇴',
      description: '정말 탈퇴하시겠습니까? 지금 탈퇴하시면 모든 정보가 사라집니다.',
      buttons: [
        {
          label: '탈퇴하기',
          className: 'modal_btn_green',
          onClick: async () => {
            try {
              await axiosInstance.delete(`/user/${userId}`);
              await logoutUserApi();
              localStorage.removeItem('userType');
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');

              openModal({
                title: '탈퇴 완료',
                description: '정상적으로 탈퇴 처리되었습니다.',
                buttons: [
                  {
                    label: '확인',
                    className: 'modal_btn_green',
                    onClick: () => {
                      closeModal();
                      navigate('/'); // 메인페이지로 이동
                    },
                  },
                ],
              });
            } catch (err) {
              openModal({
                title: '탈퇴 실패',
                description: `문제가 발생했습니다. 다시 시도해주세요., ${err}`,
                buttons: [{ label: '닫기', className: 'modal_btn_green', onClick: closeModal }],
              });
            }
          },
        },
        {
          label: '취소',
          className: 'modal_btn_orange',
          onClick: closeModal,
        },
      ],
    });
  };

  return (
    <div className="userinfo_edit_page">
      <form
        className="userinfo_edit_card"
        onSubmit={(e) => {
          e.preventDefault();
          handleFinalSubmit();
        }}
      >
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
            <label htmlFor="current_password">이전 비밀번호</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="current_password"
              value={form.current_password}
              onChange={handleChange}
              placeholder="이전 비밀번호를 입력해주세요"
              className={errors.current_password ? 'error' : ''}
            />
            <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
          </div>

          <div className="form_group password_row">
            <label htmlFor="password">새로운 비밀번호</label>
            <input
              type={showPasswordCheck ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="새로운 비밀번호를 입력해주세요"
              className={errors.password ? 'error' : ''}
            />
            <span className="eye_icon" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
              {showPasswordCheck ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
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
                  type="button"
                  key={item}
                  className={`check_btn ${form.interests.includes(item) ? 'selected' : ''}`}
                  onClick={() => toggleMultiSelect('interests', item, 3)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="button_group">
          <button className="info_edit_btn" type="submit">
            회원 정보 수정 하기
          </button>
          <button className="account_deletion" onClick={handleUserDelete}>
            회원 탈퇴
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalInfo.title}
        description={modalInfo.description}
        buttons={modalInfo.buttons}
      />
    </div>
  );
};

export default UserInfoEditPage;
