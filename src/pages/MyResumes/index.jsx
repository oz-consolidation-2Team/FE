import { useState } from 'react';
import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';

import { getSendableDistricts } from '@/utils/formatRegion';
import { useNavigate } from 'react-router-dom';
import './MyResumes.scss';

import Modal from '../../components/Modal';
import { useResume } from '@/hooks/useResume';
import axiosFormInstance from '@/apis/axiosFormInstance';

function MyResumes() {
  //initialFormData 유저 정보 및 이력서 정보
  const { formData, setFormData, isLoading, isError } = useResume();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditMode = Boolean(formData?.resume_id);
  const navigate = useNavigate();

  const goToMyPage = () => navigate('/mypage/user');

  if (isLoading) {
    return (
      <div className="skeleton_wrapper">
        <div className="skeleton_title" />
        <div className="skeleton_input" />
        <div className="skeleton_input" />
        <div className="skeleton_input" />
        <div className="skeleton_button" />
      </div>
    );
  }
  if (isError) {
    return <p className="error_text">이력서를 불러오는 데 실패했어요 😢</p>;
  }

  const makeFormData = (formData) => {
    const formDataToSend = new FormData();

    const resumeData = {
      user_id: formData.user_id.data.id,
      resume_image: '',
      desired_area: getSendableDistricts(formData.preferredRegions).join(', '),
      introduction: formData.introduction,
      educations: formData.educations.map((edu) => ({
        ...edu,
        end_date: !edu.end_date || edu.end_date.length === 0 ? null : edu.end_date,
      })),
      experiences: formData.experiences,
    };

    if (formData.resume_image instanceof File) {
      formDataToSend.append('file', formData.resume_image);
    } else if (typeof formData.resume_image === 'string' && formData.resume_image !== '') {
      // 기존 서버 URL을 resume_data 안에 포함시킴
      resumeData.resume_image = formData.resume_image;
    }

    formDataToSend.append('resume_data', JSON.stringify(resumeData));

    return formDataToSend;
  };

  const handleCreateResumes = async (e) => {
    e.preventDefault();

    if (
      formData.educations.length === 0 &&
      (formData.education_type ||
        formData.school_name ||
        formData.education_status ||
        formData.start_date ||
        formData.end_date)
    ) {
      alert('학력 정보를 추가하려면 "추가" 버튼을 눌러주세요!');
      return;
    }

    if (
      formData.experiences.length === 0 &&
      (formData.company_name ||
        formData.position ||
        formData.start_date ||
        formData.end_date ||
        formData.description)
    ) {
      alert('경력 정보를 추가하려면 "추가" 버튼을 눌러주세요!');
      return;
    }
    const formDataToSend = makeFormData(formData);
    try {
      await axiosFormInstance.post(`/resumes`, formDataToSend);

      setIsModalOpen(true);
    } catch (err) {
      console.error('이력서 등록 실패', err);
    }
  };

  const handleEditResumes = async (e) => {
    e.preventDefault();

    const formDataToSend = makeFormData(formData);

    try {
      await axiosFormInstance.patch(`/resumes/${formData.resume_id}`, formDataToSend);
      setFormData((prev) => ({
        ...prev,
        resume_image: prev.resume_image, // 그대로 유지
        preview_url: prev.preview_url, // 미리보기도 유지
      }));
      setIsModalOpen(true);
    } catch (err) {
      console.error('이력서 수정 실패:', err);
    }
  };

  return (
    <div className="resumes_wrapper">
      <div className="resumes_container">
        <h2 className="resumes_title">{isEditMode ? '이력서 수정' : '이력서 등록'}</h2>
        <UserInfoSection data={formData} setData={setFormData} />
        <EducationSection data={formData} setData={setFormData} />
        <CareerSection data={formData} setData={setFormData} />
        <RegionSection data={formData} setData={setFormData} />
        <IntroSection data={formData} setData={setFormData} />
        {isEditMode ? (
          <button type="submit" className="resumes_submit" onClick={handleEditResumes}>
            이력서 수정하기
          </button>
        ) : (
          <button type="button" className="resumes_submit" onClick={handleCreateResumes}>
            이력서 등록하기
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`이력서 ${isEditMode ? '수정' : '등록'} 완료!`}
        description={`이력서가 성공적으로 ${isEditMode ? '수정' : '등록'}되었습니다 😊`}
        buttons={[
          {
            label: '확인',
            onClick: () => {
              goToMyPage();
            },
            className: 'modal_btn_green',
          },
        ]}
      />
    </div>
  );
}

export default MyResumes;
