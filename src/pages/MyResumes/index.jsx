import { useState } from 'react';
import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';
import { initialFormData } from './resumeDummy';

function MyResumes() {
  //initialFormData 유저 정보 및 이력서 정보
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="resumes_container">
      <h2>이력서 등록</h2>
      <UserInfoSection data={formData} />
      <EducationSection data={formData} setData={setFormData} />
      <CareerSection data={formData} setData={setFormData} />
      <RegionSection data={formData} setData={setFormData} />
      <IntroSection data={formData} setData={setFormData} />
      <button> 이력서 등록하기 </button>
    </div>
  );
}

export default MyResumes;
