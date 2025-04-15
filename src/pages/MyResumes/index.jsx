import { useState } from 'react';
import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';

function MyResumes() {
  const [formData, setForData] = useState({
    name: '',
  });

  return (
    <div className="resumes_container">
      <h2>이력서 등록</h2>
      <UserInfoSection />
      <EducationSection />
      <CareerSection />
      <RegionSection />
      <IntroSection />
      <button> 이력서 등록하기 </button>
    </div>
  );
}

export default MyResumes;
