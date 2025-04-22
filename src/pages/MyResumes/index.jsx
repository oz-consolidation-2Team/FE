import { useState } from 'react';
import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';
import { initialFormData } from './resumeDummy';
import { getSendableDistricts } from '@/utils/formatRegion';
import { useNavigate } from 'react-router-dom';
import './MyResumes.scss';
import axios from 'axios';
import Modal from '../../components/Modal';

function MyResumes() {
  //initialFormData 유저 정보 및 이력서 정보
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToEditPage = () => navigate('/mypage/user');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    console.log('🧩 formData.user_id 확인:', formData.user_id);

    const resumeData = {
      user_id: formData.user_id.data.id,
      resume_image: '',
      desired_area: getSendableDistricts(formData.preferredRegions),
      introduction: formData.introduction,
      educations: formData.educations,
      experiences: formData.experiences,
    };

    formDataToSend.append('resume_data', JSON.stringify(resumeData));

    if (formData.resume_image) {
      formDataToSend.append('file', formData.resume_image);
    }

    console.log('이미지 타입 확인:', formData.resume_image);
    console.log('타입:', typeof formData.resume_image);
    console.log('instanceof File:', formData.resume_image instanceof File);

    console.log('📦 전송할 FormData:', resumeData);

    const token = localStorage.getItem('access_token');

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/resumes`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(`이력서가 등록 되었습니다!`, res.data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.error('이력서 등록 실패', err);
      });
  };

  return (
    <div className="resumes_wrapper">
      <div className="resumes_container">
        <h2 className="resumes_title">이력서 등록</h2>
        <UserInfoSection data={formData} setData={setFormData} />
        <EducationSection data={formData} setData={setFormData} />
        <CareerSection data={formData} setData={setFormData} />
        <RegionSection data={formData} setData={setFormData} />
        <IntroSection data={formData} setData={setFormData} />
        <button type="submit" className="resumes_submit" onClick={handleSubmit}>
          이력서 등록하기
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="이력서 등록 완료!"
        description="이력서가 성공적으로 등록되었습니다 😊"
        buttons={[
          {
            label: '확인',
            onClick: () => goToEditPage,
            className: 'modal_btn_green',
          },
        ]}
      />
    </div>
  );
}

export default MyResumes;
