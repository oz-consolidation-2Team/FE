import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import PropTypes from 'prop-types';
import { resumePropTypes } from '@/utils/MyResumesPropTypes';

UserInfoSection.propTypes = {
  data: resumePropTypes.isRequired,
  setData: PropTypes.func.isRequired,
};

function UserInfoSection({ data, setData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToEditPage = () => navigate('/mypage/edit');

  const handleUserAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setData((prev) => ({
        ...prev,
        resume_image: file,
        preview_url: previewUrl, // 👈 이걸 따로 저장!
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (data.preview_url) {
        URL.revokeObjectURL(data.preview_url); // 🔥 정리!
      }
    };
  }, [data.preview_url]);

  return (
    <div className="resumes_user_info">
      <label htmlFor="user_img" className="user_image_box">
        {data.preview_url || data.resume_image ? (
          <img
            src={
              data.preview_url ? data.preview_url : data.resume_image // 문자열인 경우
            }
            alt="프로필 이미지"
          />
        ) : (
          '프로필 업로드 (선택)'
        )}
        <input
          type="file"
          accept="image/*"
          id="user_img"
          name="user_img"
          onChange={handleUserAddImage}
          placeholder="이미지를 등록해주세요"
        />
      </label>

      <div className="user_info_inputs">
        <label name="user_name">
          이름
          <input
            type="text"
            name="user_name"
            value={data.user_id.data.name}
            onClick={openModal}
            readOnly
          />
        </label>
        <label name="user_gender">
          성별
          <input
            type="text"
            name="user_gender"
            value={data.user_id.data.gender}
            onClick={openModal}
            readOnly
          />
        </label>
        <label name="user_phone_number">
          전화번호
          <input
            type="text"
            name="user_phone_number"
            value={data.user_id.data.phone_number}
            onClick={openModal}
            readOnly
          />
        </label>
        <label name="user_email">
          이메일
          <input
            type="text"
            name="user_email"
            value={data.user_id.data.email}
            onClick={openModal}
            readOnly
          />
        </label>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="회원정보 수정"
        description="이 항목은 회원정보 수정 페이지에서만 변경할 수 있어요."
        buttons={[
          { label: '회원정보 수정하기', onClick: goToEditPage, className: 'modal_btn_orange' },
          { label: '닫기', onClick: closeModal, className: 'modal_btn_green' },
        ]}
      ></Modal>
    </div>
  );
}

export default UserInfoSection;
