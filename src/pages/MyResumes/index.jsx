import { useState } from 'react';
import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';
import { initialFormData } from './resumeDummy';
import { getSendableDistricts } from '@/utils/formatRegion';

function MyResumes() {
  //initialFormData 유저 정보 및 이력서 정보
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    const resumeData = {
      user_id: formData.user_id.id,
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

    console.log('📦 전송할 FormData:', resumeData);
  };

  return (
    <div className="resumes_container">
      <h2>이력서 등록</h2>
      <UserInfoSection data={formData} setData={setFormData} />
      <EducationSection data={formData} setData={setFormData} />
      <CareerSection data={formData} setData={setFormData} />
      <RegionSection data={formData} setData={setFormData} />
      <IntroSection data={formData} setData={setFormData} />
      <button onClick={handleSubmit}> 이력서 등록하기 </button>
    </div>
  );
}

export default MyResumes;
