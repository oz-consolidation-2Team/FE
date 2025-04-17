import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import PropTypes from 'prop-types';
import { resumePropTypes } from '@/utils/MyResumesPropTypes';

UserInfoSection.propTypes = {
  data: resumePropTypes.isRequired,
  setData: PropTypes.func.isRequired,
};

function UserInfoSection({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToEditPage = () => navigate('/mypage/edit');

  return (
    <div className="resumes_user_info">
      <label name="user_img">
        <input
          type="text"
          name="user_img"
          value={data.resume_image}
          onClick={openModal}
          placeholder="이미지를 등록해주세요"
          disabled
        />
      </label>
      <label name="user_name">
        이름
        <input
          type="text"
          name="user_name"
          value={data.user_id.data.name}
          onClick={openModal}
          disabled
        />
      </label>
      <label name="user_gender">
        성별
        <input
          type="text"
          name="user_gender"
          value={data.user_id.data.gender}
          onClick={openModal}
          disabled
        />
      </label>
      <label name="user_phone_number">
        전화번호
        <input
          type="text"
          name="user_phone_number"
          value={data.user_id.data.phone_number}
          onClick={openModal}
          disabled
        />
      </label>
      <label name="user_email">
        이메일
        <input
          type="text"
          name="user_email"
          value={data.user_id.data.email}
          onClick={openModal}
          disabled
        />
      </label>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>회원정보 수정</h3>
        <p>이 항목은 회원정보 수정 페이지에서만 변경할 수 있어요.</p>
        <div className="modal_buttons">
          <button onClick={goToEditPage}>회원정보 수정하기</button>
          <button onClick={closeModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
}

export default UserInfoSection;
